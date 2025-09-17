import Report from "../models/Report.js";
import { Parser } from "json2csv"; // For CSV export

// ✅ Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

// ✅ Create a report (for testing / admin use)
export const createReport = async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const newReport = new Report({ title, amount, date });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Failed to create report" });
  }
};

// ✅ Export report as CSV
export const exportReports = async (req, res) => {
  try {
    const reports = await Report.find();
    if (!reports.length) {
      return res.status(404).json({ message: "No reports available" });
    }

    const fields = ["title", "amount", "date"];
    const parser = new Parser({ fields });
    const csv = parser.parse(reports);

    res.header("Content-Type", "text/csv");
    res.attachment("reports.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Failed to export reports" });
  }
};
