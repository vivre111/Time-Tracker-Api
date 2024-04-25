import { EntitySchema } from "typeorm/index.js";

// Time Entry manages the ManyToMany Relationship between Projects and Users
// It also stands for a block of time for a User dedicated to a Project.
const TimeEntrySchema = new EntitySchema({
  name: "TimeEntry",
  tableName: "time_entries",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    description: {
      type: "varchar",
    },
    startAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    // assumption: we're tracking project status weekly, so 'endAt', although not defined,
    // is implicit end of the week that the project started
    durationInHours: {
      type: "int",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
    },
    project: {
      type: "many-to-one",
      target: "Project",
      joinColumn: true,
    },
  },
});

export default TimeEntrySchema;
