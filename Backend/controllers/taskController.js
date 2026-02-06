import Task from "../models/Task.js";

// GET all
export const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// GET one
export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
};

// CREATE
export const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status
  });

  res.status(201).json(task);
};

// UPDATE
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!task) return res.status(404).json({ message: "Not found" });

  res.json(task);
};

// DELETE
export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
};
