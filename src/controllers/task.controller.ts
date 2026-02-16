import { Request, Response } from "express";
import { TaskModel } from "../models/task.models";

export const getTask = async(req: Request, res: Response) => {
    try {
        const task = await TaskModel.find().sort({ createdAt: -1});
        res.json(task);
    } catch (error) {
        res.status(500).json({message: "Error fetching tasks"});
    }
};

export const createTask = async(req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const newTask = await TaskModel.create({title, description});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({message: "Error creating task"});
    }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const { title, description, isCompleted} = req.body;

        // Finding task using id
        const task = await TaskModel.findById(id);
        if(!task) {
            return res.status(404).json({message: "Task not found."});
        }

        if (title) task.title = title;
        if (description) task.description = description;

        if (isCompleted !== undefined) {
            task.isCompleted = isCompleted;
        }
        
        // saving updated Task
        const updatedTask = await task.save();

        // Returning success
        res.status(200).json({
            message: "Task updated successfully.",
            task: {
                id: updatedTask._id,
                title: updatedTask.title,
                description: updatedTask.description
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating task."});
    }
}