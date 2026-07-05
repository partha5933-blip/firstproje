import { Schema, model, models, type InferSchemaType } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueAt: Date,
    completedAt: Date,
    status: { type: String, enum: ["open", "in-progress", "done"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    assignedTo: String
  },
  { timestamps: true }
);

TaskSchema.index({ status: 1, dueAt: 1 });
TaskSchema.index({ leadId: 1 });

export type TaskDocument = InferSchemaType<typeof TaskSchema>;

const Task = models.Task || model("Task", TaskSchema);

export default Task;
