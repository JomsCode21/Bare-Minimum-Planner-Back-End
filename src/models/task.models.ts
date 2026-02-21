import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string,
  isCompleted: boolean;
  createdAt: Date;
  user: mongoose.Types.ObjectId; // Reference to the User model
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String},
    description: {type: String},
    isCompleted: { type: Boolean, default: false },

    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);