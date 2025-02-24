import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    permission: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { // 🔥 Đổi từ `descriptions` thành `description`
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
    },
    taskStatuses: {
      type: Array,
      required: true,
    },
    teamMembers: [teamMemberSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// Xoá model cũ nếu đã tồn tại (tránh lỗi trùng lặp khi chạy lại)
if (mongoose.models && mongoose.models.projects) {
  delete mongoose.models.projects;
}

const ProjectModel = mongoose.model("projects", projectSchema);
export default ProjectModel;

