const lodash = require("lodash");

// Importing this function is difficult, see https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-from-jest-when-run
// so I pasted it here for testing purpose
const formatProjectData = (timeEntryArr) => {
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
// Sample data
const data = [
  {
    id: 1,
    description: "",
    startAt: new Date("2024-04-25T05:19:01.000Z"),
    durationInHours: "3",
    project: {
      id: 1,
      name: "projectPossible",
      description: "",
      createdAt: new Date("2024-04-25T04:01:00.000Z"),
    },
  },
  {
    id: 2,
    description: "",
    startAt: new Date("2024-04-25T05:55:36.000Z"),
    durationInHours: "1",
    project: {
      id: 2,
      name: "project2",
      description: "",
      createdAt: new Date("2024-04-25T09:54:07.000Z"),
    },
  },
  {
    id: 3,
    description: "",
    startAt: new Date("2024-04-25T05:19:01.000Z"),
    durationInHours: "7",
    project: {
      id: 1,
      name: "projectPossible",
      description: "",
      createdAt: new Date("2024-04-25T04:01:00.000Z"),
    },
  },
];

describe("formatProjectData Functionality", () => {
  test("aggregates time entries correctly by project", () => {
    const result = formatProjectData(data);
    expect(result).toHaveLength(2); // Expect two projects: "projectPossible" and "project2"

    // Check details for project "austin"
    const projectPossible = result.find((p) => p.name === "projectPossible");
    expect(projectPossible).toBeDefined();
    expect(projectPossible.totalDurationHours).toBe(10); // Sum of hours for project "projectPossible"

    // Check details for project "austin2"
    const project2 = result.find((p) => p.name === "project2");
    expect(project2).toBeDefined();
    expect(project2.totalDurationHours).toBe(1); // Sum of hours for project "project2"
  });
});
