import { Button } from "antd";
import React from "react";
import TeamMemberForm from "./team-member-form";

interface ProjectTeamMembersProps{
  teamMembers: any[];
  setTeamMembers: (value: any[]) => void;
  roles?: string[];
}


function ProjectTeamMembers({teamMembers,setTeamMembers ,roles =[]}: ProjectTeamMembersProps) {
  const [showTeamMemberForm, setShowTeamMemberForm] = React.useState(false);
  const [teamMembersFormType, setTeamMemberFormType] =
    React.useState<string>("add");
 
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowTeamMemberForm(true);
            setTeamMemberFormType("add");
          }}
          type="primary"
        > Add Team Member
        </Button>
      </div>
      {showTeamMemberForm &&(
        <TeamMemberForm
        showTeamMemberForm={showTeamMemberForm}
        setShowTeamMemberForm={setShowTeamMemberForm}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        teamMemberFormType={teamMembersFormType}
        roles={roles}
        />
      )}
    </div>
  );
}

export default ProjectTeamMembers;