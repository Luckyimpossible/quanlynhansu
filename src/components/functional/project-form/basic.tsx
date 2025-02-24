import { Form, Input, Select, Upload } from "antd";
import { url } from "inspector";
import React from "react";

const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

function ProjectBasicInfo({
  projectLogo,
  setProjectLogo,
}: {
  projectLogo: string | File | null;
  setProjectLogo: React.Dispatch<React.SetStateAction<string | File | null>>;
}) {
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  let selectedLogoFile: any[] = [];

  if (projectLogo && typeof projectLogo === "object") {
    selectedLogoFile = [{
      ...projectLogo,
      url : URL.createObjectURL(projectLogo)
    }];
  }

  if (projectLogo && typeof projectLogo === "string") {
    selectedLogoFile = [
      {
        uid: "-1",
        name: "logo",
        status: "done",
        url: projectLogo,
      },
    ];
  }
  return (
    <div className="flex flex-col gap-5">
      <Form.Item
        label="Project Name"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên dự án!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả dự án!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <Form.Item
          label="Status"
          name="status"
          rules={[
            { required: true, message: "Vui lòng chọn trạng thái dự án!" },
          ]}
        >
          <Select options={statusOptions} />
        </Form.Item>
      </div>

      <Form.Item label="logo" name="logo">
        <Upload
          beforeUpload={(file) => {
            setProjectLogo(file);
            return false;
          }}
          listType="picture-card"
          fileList={selectedLogoFile}
          multiple={false}
        >
          <div className="span text-xs text-gray-500">
            {selectedLogoFile.length > 0 ?"Change" : "Upload"} Logo</div>
        </Upload>
      </Form.Item>
    </div>
  );
}

export default ProjectBasicInfo;
