import Project from "../entity/Project.js";
import { getConnection } from "typeorm/globals.js";
import authenticateToken from "../middleware/authenticateToken.js";

export function setupProjectRoutes(app) {
  const projectRepository = getConnection().getRepository(Project);

  // Create a project
  app.post("/api/project/create", authenticateToken, async (req, res) => {
    try {
      const { name, description } = req.body;

      // Validate the input
      if (!name) {
        return res.status(400).json({ message: "Project name is required" });
      }

      // Create a new project instance
      const existingProject = await projectRepository.findOne({
        where: { name },
      });
      if (existingProject) {
        return res
          .status(500)
          .json({ message: "Found duplicated Project names" });
      }
      const newProject = projectRepository.create({
        name,
        description,
        createdBy: req.user.userId,
      });
      const savedProject = await projectRepository.save(newProject);

      res.status(201).json({
        message: "Project created successfully",
        project: savedProject,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Get all Projects
  app.get("/api/project/getAll", authenticateToken, async (req, res) => {
    try {
      const projects = await projectRepository.find({
        relations: ["createdBy"],
      });

      // Return the list of projects
      res.json({
        message: "Projects retrieved successfully",
        projects,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve projects" });
    }
  });
}
