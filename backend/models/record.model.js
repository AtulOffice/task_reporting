import mongoose from "mongoose";

const recrd = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recordsform = mongoose.model("Records", recrd);
