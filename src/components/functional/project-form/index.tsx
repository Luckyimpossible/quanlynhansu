"use client";
import React, { useEffect } from "react";
import { Button, Form, Input, message, Tabs } from "antd";
import ProjectBasicInfo from "./basic";
import ProjectRolesTaskStatuses from "./roles-task-statuses";
import ProjectTeamMembers from "./team-members";
import { uploadFileAndGetUrl } from "@/helpers/file-uploads";
import { IUsersStore, usersStore } from "@/store/users-store";
import { createNewProject, updateProjectById } from "@/server-actions/projects";
import { useRouter } from "next/navigation";

const { TabPane } = Tabs;

interface ProjectFormProps {
  formType: "create" | "edit";
  initialValues?: any;
}

function ProjectForm({ formType, initialValues }: ProjectFormProps) {
  const [activeTab, setActiveTab] = React.useState("basic");
  const [projectLogo, setProjectLogo] = React.useState<string | File | null>(
    initialValues?.logo || null
  );
  const [taskStatuses, setTaskStatuses] = React.useState<string[]>(
    initialValues?.taskStatuses || []
  );
  const [teamMembers = [], setTeamMembers] = React.useState<any[]>([]);
  const [roles, setRoles] = React.useState<string[]>(
    initialValues?.roles || []
  );
  const { loggedInUserData }: IUsersStore = usersStore() as any;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [form] = Form.useForm(); // Sử dụng form instance

  // Debug API values
  useEffect(() => {
    console.log("Initial values from API:", initialValues);
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        description:
          initialValues.description || initialValues.descriptions || "", // Chắc chắn lấy đúng giá trị
      });
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("Form values:", values); // Debug xem có descriptions không

      const payload = {
        ...values,
        description: values.description || "", // Đảm bảo không bị thiếu
        roles,
        taskStatuses,
        owner: loggedInUserData?._id || "",
        teamMembers: [],
      };

      if (projectLogo && typeof projectLogo === "object") {
        const logoUrl = await uploadFileAndGetUrl(projectLogo);
        payload.logo = logoUrl;
      }

      let response: any = null;
      if (formType === "edit") {
        response = await updateProjectById({
          projectId: initialValues._id,
          payload: payload,
        });
      } else {
        response = await createNewProject(payload);
      }

      if (response.success) {
        message.success(response.message);
        router.push("/account/projects");
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <Form
        layout="vertical"
        form={form} // Gán instance của form
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          <TabPane tab="Basic Info" key="basic">
            <ProjectBasicInfo
              projectLogo={projectLogo}
              setProjectLogo={setProjectLogo}
            />
            {/* Sửa tên từ 'descriptions' thành 'description' */}
            <Form.Item
              label="Project Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a project description!",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter project description" />
            </Form.Item>
          </TabPane>

          <TabPane tab="Roles & Task statuses" key="roles-task-statuses">
            <ProjectRolesTaskStatuses
              taskStatuses={taskStatuses}
              setTaskStatuses={setTaskStatuses}
              roles={roles}
              setRoles={setRoles}
            />
          </TabPane>
          {formType === "edit" && (
            <TabPane tab="Team Members" key="team-members">
              <ProjectTeamMembers
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers}
                roles={roles}
              />
            </TabPane>
          )}
        </Tabs>

        {activeTab !== "team-members" && <div className="flex justify-end gap-5">
            <Button
              onClick={() => {
                router.push("/account/projects");
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {formType === "create" ? "Create Project" : "Update Project"}
            </Button>
          </div>}
      </Form>
    </div>
  );
}

export default ProjectForm;
