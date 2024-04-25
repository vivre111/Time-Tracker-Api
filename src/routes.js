import Project from "./entity/Project.js";
import User from "./entity/User.js";
import Task from "./entity/Task.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/authenticateToken.js";
import { getConnection } from "typeorm/globals.js";

// TODO: put all JWT_SECRET in .env
// TODO: Create a ProjectService, UserService, TaskService
var JWT_SECRET = "your_jwt_secret";

export function setupRoutes(app) {
  const userRepository = getConnection().getRepository(User);
  const projectRepository = getConnection().getRepository(Project);
  const taskRepository = getConnection().getRepository(Task);

  app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // save the encrypted password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await userRepository.save(user);
      res.status(201).send("User registered");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userRepository.findOne({ where: { username } });
    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ message: "Logged in!", token });
    } else {
      res.status(400).send("Credentials do not match");
    }
  });

  // Create a project
  app.post("/api/projects", authenticateToken, async (req, res) => {
    try {
      const { name, description } = req.body;

      // Validate the input
      if (!name) {
        return res.status(400).json({ message: "Project name is required" });
      }

      // Create a new project instance
      const newProject = projectRepository.create({
        name,
        description,
        createdBy: req.user.id,
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

  // Create a task
  app.post("/api/tasks", authenticateToken, async (req, res) => {
    try {
      const { userId, projectId, durationInHours, name, description } =
        req.body;

      // Validate the input
      if (!userId || !projectId || !durationInHours || !name) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // TODO: check whether user/task exist
      // TODO: startAt can be set

      // Create a new task instance
      const newTask = taskRepository.create({
        name,
        description,
        durationInHours,
        startAt: new Date(),
        user: { id: userId }, // Link to the user
        project: { id: projectId }, // Link to the project
      });

      // Save the new task to the database
      const savedTask = await taskRepository.save(newTask);

      res.status(201).json({
        message: "Task created successfully",
        task: savedTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  // Get all tasks
  app.get("/api/tasks", authenticateToken, async (req, res) => {
    try {
      const tasks = await taskRepository.find({
        relations: ["user", "project"],
      });

      // Return the list of tasks
      res.json({
        message: "Tasks retrieved successfully",
        tasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve tasks" });
    }
  });

  // Get all Projects
  app.get("/api/projects", authenticateToken, async (req, res) => {
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
