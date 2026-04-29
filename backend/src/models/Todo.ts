import { Schema, model } from "mongoose";

// 1. Schemat - för en enskild Todo
const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, "Du måste skriva vad som ska göras"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"], // Tillåter bara dessa tre värden
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 2. Modellen - Verktyget som exporteras för att styra databasen
export const Todo = model("Todo", todoSchema);
