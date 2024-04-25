import { EntitySchema } from "typeorm/index.js";

const ProjectSchema = new EntitySchema({
  name: "Project",
  tableName: "projects",
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
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    createdBy: {
      type: "many-to-one",
      target: "User",
    },
  },
});

export default ProjectSchema;
