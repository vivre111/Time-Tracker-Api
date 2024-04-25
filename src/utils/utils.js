import lodash from "lodash";
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
