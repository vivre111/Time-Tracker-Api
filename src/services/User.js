import User from "../entity/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm/globals.js";
import lodash from "lodash";
import authenticateToken from "../middleware/authenticateToken.js";

// TODO: put all JWT_SECRET in .env
var JWT_SECRET = "your_jwt_secret";

export const formatProjectData = (timeEntryArr) => {
  const timeEntryObj = lodash.groupBy(timeEntryArr, (ele) => ele.project.name);
  const projectData = Object.values(timeEntryObj).map((projectTimeEntryArr) => {
    const project = projectTimeEntryArr[0].project;
    const totalDurationHours = projectTimeEntryArr.reduce((acc, cur) => {
      return acc + parseInt(cur.durationInHours);
    }, 0);
    return {
      ...project,
      totalDurationHours,
      timeEntries: projectTimeEntryArr,
    };
  });
  return projectData;
};

export function setupUserRoutes(app) {
  const userRepository = getConnection().getRepository(User);

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

  // Get all users
  app.get("/api/user/getAll", authenticateToken, async (req, res) => {
    try {
      const users = await userRepository.find();

      // Return the list of timeEntries
      res.json({
        message: "Users retrieved successfully",
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve Users" });
    }
  });

  // Track Project
  app.get("/api/user/projectData", authenticateToken, async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(500).json({ message: "Failed to retrieve User ID" });
    }

    try {
      const rawUserProjectData = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.timeEntry", "timeEntry")
        .leftJoinAndSelect("timeEntry.project", "project")
        .where("user.id = :userId", { userId })
        .getOne();
      const timeEntryData = rawUserProjectData.timeEntry;
      const userProjectData = formatProjectData(timeEntryData);

      // Return the list of projects
      res.json({
        message: "User Project Data retrieved successfully",
        userProjectData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve User Project Data" });
    }
  });
}
