"use server";

import { IProject } from "@/interfaces";
import ProjectModel from "@/models/project-model";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache"; // ✅ Import chính xác

export const createNewProject = async (payload: Partial<IProject>) => {
  try {
    if (!payload.description) { // 🔥 Kiểm tra nếu thiếu description
      throw new Error("Description field is required");
    }

    await ProjectModel.create(payload);
    revalidatePath("/account/projects"); // ✅ Tự động cập nhật cache
    return {
      success: true,
      message: "Project created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateProjectById = async ({
  projectId,
  payload,
}: {
  projectId: string;
  payload: Partial<IProject>;
}) => {
  try {
    if (payload.description !== undefined && !payload.description.trim()) {
      throw new Error("Description cannot be empty");
    }

    await ProjectModel.findByIdAndUpdate(projectId, payload);
    revalidatePath("/account/projects"); // ✅ Xóa cache trang projects
    return {
      success: true,
      message: "Project updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteProjectById = async (projectId: string) => {
  try {
    await ProjectModel.findByIdAndDelete(projectId);
    revalidatePath("/account/projects"); // ✅ Cập nhật lại trang sau khi xóa
    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const response = await ProjectModel.findById(projectId);
    return {
      success: true,
      message: "Project found successfully",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getProjectsOfLoggedInUser = async () => {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      throw new Error("User not authenticated");
    }

    const currentUserMongoDBData = await UserModel.findOne({
      clerkUserId: currentUserData.id,
    }).lean();

    if (!currentUserMongoDBData) {
      throw new Error("User not found in database");
    }

    const projects = await ProjectModel.find({
      owner: currentUserMongoDBData._id,
    }).lean();

    return {
      success: true,
      message: "Projects found successfully",
      data: projects,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch projects",
    };
  }
};

