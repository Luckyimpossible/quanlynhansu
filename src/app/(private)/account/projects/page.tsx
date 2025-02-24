import PageTitle from "@/components/ui/page-title";
import { Alert, Button } from "antd";
import React from "react";
import Link from "next/link";
import { getProjectsOfLoggedInUser } from "@/server-actions/projects";
import ProjectBasicInfo from "@/components/functional/project-form/basic";
import ProjectCard from "@/components/functional/project-card";
import { IProject } from "@/interfaces";
async function UserAccountProojectsPage() {
  const response = await getProjectsOfLoggedInUser();
  if (!response.success) {
    return <Alert message="Failed to fetch projects " type="error" />;
  }

  const projects: IProject[] = response.data;
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Dự Án" />
        <Button type="primary">
          <Link href="/account/projects/create">Tạo Dự Án</Link>
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default UserAccountProojectsPage;
