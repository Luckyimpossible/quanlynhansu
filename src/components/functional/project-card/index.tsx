"use client";
import { IProject } from "@/interfaces";
import React from "react";
import { Trash2, Edit2, Eye } from "lucide-react";
import { Alert, Button, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { deleteProjectById } from "@/server-actions/projects";

function ProjectCard({ project }: { project: IProject }) {
  const [loading, setLoading] = React.useState(false);
  const [showDeleteAlert, setshowDeleteAlert] = React.useState(false);
  const router = useRouter();

  const deleteProjectHandler = async () => {
    try {
      setLoading(true);
      const response = await deleteProjectById(project._id);
      if (response.success) {
        message.success(response.message);
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
    <div className="border border-gray-300 p-5 rounded-sm hover:border-primary flex flex-col gap-2 cursor-pointer">
      <img className="w-16 h-16 object-cover rounded-lg" src={project.logo} />
      <div>
        <h1 className="text -sm font-bold text-primary">{project.name}</h1>
        <p className="text-xs text-gray-700">{project.description}</p>
      </div>
      <div className="flex justify-end gap-5 mt-2">
        <Button size="small">
          <Eye size={16} />
        </Button>

        <Button
          size="small"
          onClick={() => router.push(`/account/projects/edit/${project._id}`)}
        >
          <Edit2 size={16} />
        </Button>

        <Button
          size="small"
          onClick={() => {
            setshowDeleteAlert(true);
          }}
          loading={loading}
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {showDeleteAlert && (
        <Modal
          title="Delete Project"
          open={showDeleteAlert}
          onClose={() => setshowDeleteAlert(false)}
          okText="Yes,Delete"
          centered
          onOk={deleteProjectHandler}
        >
          <Alert message="Are you sure you want to delete this project? This action cannot be undone. " />
        </Modal>
      )}
    </div>
  );
}

export default ProjectCard;
