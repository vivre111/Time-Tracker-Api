import TimeEntry from "../entity/TimeEntry.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { getConnection } from "typeorm/globals.js";

// TODO: put all JWT_SECRET in .env
var JWT_SECRET = "your_jwt_secret";

export function setupTimeEntryRoutes(app) {
  const TimeEntryRepository = getConnection().getRepository(TimeEntry);

  // Create a timeEntry
  app.post("/api/timeEntry/create", authenticateToken, async (req, res) => {
    try {
      const { projectId, durationInHours, description, userId, startAt } =
        req.body;

      // Validate the input
      if (!userId || !projectId || !durationInHours || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // TODO: check whether user/timeEntry exist
      // TODO: startAt can be set

      // Create a new timeEntry instance
      const newTimeEntry = TimeEntryRepository.create({
        description,
        durationInHours,
        startAt: startAt || new Date(),
        user: { id: userId }, // Link to the user
        project: { id: projectId }, // Link to the project
      });

      // Save the new timeEntry to the database
      const savedTimeEntry = await TimeEntryRepository.save(newTimeEntry);

      res.status(201).json({
        message: "time entry created successfully",
        timeEntry: savedTimeEntry,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create timeEntry" });
    }
  });

  // Get all timeEntries
  app.get("/api/timeEntry/getAll", authenticateToken, async (req, res) => {
    try {
      const timeEntries = await TimeEntryRepository.find({
        relations: ["user", "project"],
      });

      // Return the list of timeEntries
      res.json({
        message: "Time Entries retrieved successfully",
        timeEntries,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve timeEntries" });
    }
  });
}
