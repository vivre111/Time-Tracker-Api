import { EntitySchema } from "typeorm/index.js";

const TaskSchema = new EntitySchema({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
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

export default TaskSchema;
