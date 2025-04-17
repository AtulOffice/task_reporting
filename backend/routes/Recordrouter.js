import express from "express";
import {
  Recordsformave,
  deleteRecord,
  findrecord,
} from "../controller/record.controller.js";

export const RecordRouter = express.Router();

RecordRouter.post("/save", Recordsformave);
RecordRouter.get("/fetch", findrecord);
RecordRouter.delete("/delete/:id", deleteRecord);
