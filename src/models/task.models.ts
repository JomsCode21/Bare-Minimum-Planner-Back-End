import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string,
  isCompleted: boolean;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String},
    description: {type: String},
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);