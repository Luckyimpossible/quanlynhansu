import { Checkbox, Modal, Select, Input, Button } from "antd";
import React from "react";

interface TeamMemberFormProps {
  showTeamMemberForm: boolean;
  setShowTeamMemberForm: (value: boolean) => void;
  teamMembers: any[];
  setTeamMembers: (value: any[]) => void;
  teamMemberFormType: string;
  roles?: string[];
}

export const permissionList = [
  { label: "Edit Project", value: "edit-project" },
  { label: "Delete Project", value: "delete-project" },
  { label: "Create Task", value: "create-task" },
  { label: "Edit Task", value: "edit-task" },
  { label: "Delete Task", value: "delete-task" },
];

function TeamMembersForm({
  showTeamMemberForm,
  setShowTeamMemberForm,
  teamMembers,
  setTeamMembers,
  teamMemberFormType,
  roles = [],
}: TeamMemberFormProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [permissions, setPermissions] = React.useState<string[]>([]);

  const rolesOptions = roles.map((role) => ({
    label: role.toUpperCase(),
    value: role,
  }));

  const onPermissionChange = (permissionValue: string, checked: boolean) => {
    if (checked) {
      setPermissions([...permissions, permissionValue]);
    } else {
      setPermissions(permissions.filter((p) => p !== permissionValue));
    }
  };

  const handleSubmit = () => {
    if (!email || !role) {
      alert("Please fill in all required fields!");
      return;
    }

    const newMember = { email, role, permissions };
    
    if (teamMemberFormType === "add") {
      setTeamMembers([...teamMembers, newMember]);
    } else {
      // Cập nhật thành viên trong danh sách
      const updatedMembers = teamMembers.map((member) =>
        member.email === email ? { ...member, role, permissions } : member
      );
      setTeamMembers(updatedMembers);
    }

    setShowTeamMemberForm(false);
  };

  return (
    <Modal
      open={showTeamMemberForm}
      onCancel={() => setShowTeamMemberForm(false)}
      centered
      title={teamMemberFormType === "add" ? "Add Team Member" : "Edit Team Member"}
      footer={null}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="Email">Email</label>
          <Input
            placeholder="Enter your team member's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Role">Role</label>
          <Select
            placeholder="Select a role"
            value={role}
            onChange={(value) => setRole(value)}
            options={rolesOptions}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Permissions">Permissions</label>
          {permissionList.map((permission) => (
            <div key={permission.value} className="flex items-center gap-2">
              <Checkbox
                checked={permissions.includes(permission.value)}
                onChange={(e) => onPermissionChange(permission.value, e.target.checked)}
              >
                {permission.label}
              </Checkbox>
            </div>
          ))}
        </div>

        {/* Fix lỗi thiếu dấu `>` */}
        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowTeamMemberForm(false)}>Cancel</Button>
          <Button type="primary" disabled={!email ||!role||permissions.length === 0}>
            {teamMemberFormType === "add" ? "Validate & Add" : "Validate & Update"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TeamMembersForm;
