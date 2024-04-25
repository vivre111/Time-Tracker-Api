import { setupProjectRoutes } from "./services/Project.js";
import { setupTimeEntryRoutes } from "./services/TimeEntry.js";
import { setupUserRoutes } from "./services/User.js";

// TODO: put all JWT_SECRET in .env
var JWT_SECRET = "your_jwt_secret";

export function setupRoutes(app) {
  setupProjectRoutes(app);
  setupTimeEntryRoutes(app);
  setupUserRoutes(app);
}
