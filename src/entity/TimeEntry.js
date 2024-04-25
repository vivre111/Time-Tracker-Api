import { EntitySchema } from "typeorm/index.js";

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
    durationInHours: {
      type: "decimal",
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
