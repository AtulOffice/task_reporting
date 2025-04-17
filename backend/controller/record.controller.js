import { Recordsform } from "../models/record.model.js";

export const Recordsformave = async (req, res) => {
  try {
    const { name, date, task } = req.body;
    const data = await Recordsform.create({ name, date, task });
    return res.status(201).json({
      success: true,
      message: "data saved successfully",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "error while saving data",
    });
  }
};

export const findrecord = async (req, res) => {
  try {
    const data = await Recordsform.find();
    return res.status(200).json({
      success: true,
      message: "data fetch successfully",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "error while fetching data",
    });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Recordsform.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      data: deletedRecord,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "Error while deleting the record",
    });
  }
};
