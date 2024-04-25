test("sampletest", () => {
  const data = [
    {
      id: 1,
      description: "22",
      startAt: new Date("2024-04-25T05:19:01.000Z"),
      durationInHours: "3",
      project: {
        id: 1,
        name: "austin",
        description: "1234",
        createdAt: new Date("2024-04-25T04:01:00.000Z"),
      },
    },
    {
      id: 2,
      description: "121221",
      startAt: new Date("2024-04-25T05:55:36.000Z"),
      durationInHours: "1",
      project: {
        id: 2,
        name: "austin2",
        description: "1234",
        createdAt: new Date("2024-04-25T09:54:07.000Z"),
      },
    },
    {
      id: 3,
      description: "21",
      startAt: new Date("2024-04-25T06:02:13.000Z"),
      durationInHours: "21",
      project: {
        id: 2,
        name: "austin2",
        description: "1234",
        createdAt: new Date("2024-04-25T09:54:07.000Z"),
      },
    },
    {
      id: 4,
      description: "21212",
      startAt: new Date("2024-04-25T06:04:09.000Z"),
      durationInHours: "2",
      project: {
        id: 1,
        name: "austin",
        description: "1234",
        createdAt: new Date("2024-04-25T04:01:00.000Z"),
      },
    },
    {
      id: 5,
      description: "2",
      startAt: new Date("2024-04-25T06:10:55.000Z"),
      durationInHours: "22",
      project: {
        id: 2,
        name: "austin2",
        description: "1234",
        createdAt: new Date("2024-04-25T09:54:07.000Z"),
      },
    },
    {
      id: 8,
      description: "222",
      startAt: new Date("2024-04-26T02:27:00.000Z"),
      durationInHours: "1",
      project: {
        id: 1,
        name: "austin",
        description: "1234",
        createdAt: new Date("2024-04-25T04:01:00.000Z"),
      },
    },
    {
      id: 9,
      description: "21",
      startAt: new Date("2024-04-25T10:29:00.000Z"),
      durationInHours: "21",
      project: {
        id: 1,
        name: "austin",
        description: "1234",
        createdAt: new Date("2024-04-25T04:01:00.000Z"),
      },
    },
  ];
  // {...project, totalDurationHours, timeEntries:[]}
  const lodash = require("lodash");

  const formatProjectData = (timeEntryArr) => {
    const timeEntryObj = lodash.groupBy(
      timeEntryArr,
      (ele) => ele.project.name
    );
    const projectData = Object.values(timeEntryObj).map(
      (projectTimeEntryArr) => {
        const project = projectTimeEntryArr[0].project;
        const totalDurationHours = projectTimeEntryArr.reduce((acc, cur) => {
          return acc + parseInt(cur.durationInHours);
        }, 0);
        return {
          ...project,
          totalDurationHours,
          timeEntries: projectTimeEntryArr,
        };
      }
    );
    console.log(projectData);
  };
  formatProjectData(data);
});
