const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://jhnblake:Jhnblake%4099@cluster0.loz1n31.mongodb.net/portfolioCMS?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  tools: String,
  description: String,
  link: String,
});

const Project = mongoose.model("Project", ProjectSchema);

app.get("/", (req, res) => {
  res.send("Backend is running. Go to /api/projects to see project data.");
});

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/api/projects", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

app.delete("/api/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

app.listen(5050, () => {
  console.log("Server running on port 5050");
});