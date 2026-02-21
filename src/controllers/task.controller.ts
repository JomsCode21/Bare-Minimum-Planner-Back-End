import { Request, Response } from "express";
import { TaskModel } from "../models/task.models";
import { AuthRequest } from "@/middlewares/verify-token.middleware";

// Get all tasks for the authenticated user
export const getTask = async(req: AuthRequest, res: Response) => {
    try {
        const task = await TaskModel.find({user: req.user._id}).sort({ createdAt: -1});
        res.json(task);
    } catch (error) {
        res.status(500).json({message: "Error fetching tasks"});
    }
};

// Create a new task for the authenticated user
export const createTask = async(req: AuthRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        const newTask = await TaskModel.create({title, description, user: req.user._id});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({message: "Error creating task"});
    }
};

// Delete a task by ID
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Task not found or unauthorized" });
    }
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// Update a task by ID
export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;

        // Build the update object
        const updateFields: any = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;

        // findOneAndUpdate safely updates ONLY if both the Task ID and User ID match
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: id, user: req.user.id }, // Security check!
            { $set: updateFields },
            { new: true } // Returns the updated document instead of the old one
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found or unauthorized." });
        }

        // Returning success
        res.status(200).json({
            message: "Task updated successfully.",
            task: {
                id: updatedTask._id,
                title: updatedTask.title,
                description: updatedTask.description,
                isCompleted: updatedTask.isCompleted // Added this back into your response!
            }
        });

    } catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ message: "Error updating task." });
    }
};