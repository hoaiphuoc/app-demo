export const SAMPLE_DATA = [
  {
    id: 0,
    day: "TUE",
    name: "Chest Day - with Arm exercises",
    position: 0,
    exercises: [
      {
        id: 0,
        name: "Bench Press Medium Grip",
        sets: [
          {
            id: 0,
            weight: 50,
            reps: 5,
          },
          {
            id: 1,
            weight: 60,
            reps: 5,
          },
          {
            id: 2,
            weight: 70,
            reps: 5,
          },
        ],
      },
      {
        id: 1,
        name: "Exercise B",
        sets: [
          {
            id: 0,
            weight: 40,
            reps: 10,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    day: "WED",
    name: "LEG DAY",
    position: 1,
    exercises: [
      {
        id: 0,
        name: "Exercise C",
        sets: [
          {
            id: 0,
            weight: 30,
            reps: 6,
          },
        ],
      },
      {
        id: 1,
        name: "Exercise D",
        sets: [
          {
            id: 0,
            weight: 40,
            reps: 5,
          },
        ],
      },
      {
        id: 2,
        name: "Exercise E",
        sets: [
          {
            id: 0,
            weight: 50,
            reps: 5,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    day: "WED",
    name: "ARM DAY",
    position: 2,
    exercises: [
      {
        id: 0,
        name: "Exercise F",
        sets: [
          {
            id: 0,
            weight: 60,
            reps: 6,
          },
        ],
      },
    ],
  },
];

export const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
