const OrganizationData = [
  {
    id: 1,
    jobType: "Job Type A",
    jobPercent: {
      per1: 20,
      per2: 3,
      per3: 50,
      per4: 2,
      per5: 4
    },
    car: 18,
    queue: 57,
    late: 10.3,
  },
  {
    id: 2,
    jobType: "Job Type B",
    jobPercent: {
      per1: 35,
      per2: 12,
      per3: 4,
      per4: 1,
      per5: 12
    },
    car: 12,
    queue: 52,
    late: 7.5,
  },
  {
    id: 3,
    jobType: "Job Type C",
    jobPercent: {
      per1: 30,
      per2: 12,
      per3: 49,
      per4: 5,
      per5: 9
    },
    car: 10,
    queue: 21,
    late: 6.5,
  },
  {
    id: 4,
    jobType: "Job Type D",
    jobPercent: {
      per1: 70,
      per2: 19,
      per3: 2,
      per4: 4,
      per5: 7
    },
    car: 5,
    queue: 24,
    late: 2.5,
  },
  {
    id: 5,
    jobType: "Job Type F",
    jobPercent: {
      per1: 23,
      per2: 2,
      per3: 11,
      per4: 9,
      per5: 1
    },
    car: 25,
    queue: 69,
    late: 4.3,
  },
  {
    id: 6,
    jobType: "Job Type H",
    jobPercent: {
      per1: 52,
      per2: 4,
      per3: 9,
      per4: 24,
      per5: 4
    },
    car: 49,
    queue: 22,
    late: 12.2,
  },
  {
    id: 7,
    jobType: "Job Type I",
    jobPercent: {
      per1: 5,
      per2: 20,
      per3: 4,
      per4: 23,
      per5: 1
    },
    car: 12,
    queue: 1,
    late: 12,
  },
  {
    id: 8,
    jobType: "Job Type J",
    jobPercent: {
      per1: 88,
      per2: 1,
      per3: 4,
      per4: 12,
      per5: 2
    },
    car: 25,
    queue: 44,
    late: 9.0,
  }
];

export default {
  getOrganizationData() {
    return OrganizationData;
  }
};

