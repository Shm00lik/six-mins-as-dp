export const Definitions = {
  grid: {
    rows: 1,
    cols: 2,
    gridHeight: 0.7,

    rolesList: [
      "מעבד נתונים",
      "אחמש",
      "סקאוטר",
      "סקאוטר BAS",
      "אחראי BAS",
      "איכותני",
      "צוות אדום",
      "פיט מכניקה",
      "פיט חומרה",
      "פיט תוכנה",
      "פיט שרטוט",
      "אחראי פיט",
      "דוברות פיט",
      "דוברות קהילה",
      "נהג א'",
      "נהג ב'",
      "מפעיל א'",
      "מפעיל ב'",
      "קואוץ' א'",
      "קואוץ' ב'",
      "שחקנש",
      "צלם מגרש",
      "טכנישן",
      "צלם מדיה",
      "אחראי עידוד",
      "קמע",
      "לוגיסטיקה",
    ],

    rolesTextStyle: {
      font: "20px Assistant",
      fontStyle: "bold",
      color: "#000000",
      rtl: true,
    },

    cell: {
      fillColor: 0xffffff,
      strokeColor: 0xe1e1e1,
      lineWidth: 4,
    },
  },

  backgroundImage: {
    path: "./src/assets/background.png",
  },

  backgroundVideo: {
    path: "./src/assets/6minsVideo.mp4",
  },

  ball: {
    path: "./src/assets/ball.png",
    size: 100,
  },

  shooter: {
    body: {
      path: "./src/assets/shooterBody.png",
      scale: 0.3,
    },
    leg: {
      path: "./src/assets/shooterLeg.png",
      scale: 0.3,
    },
  },

  timer: {
    textStyle: {
      font: "100px Assistant",
      color: "#FFFFFF",
    },

    maxTime: (0 * 60 + 9) * 1000, // minutes * seconds * milliseconds
  },

  win: {
    audio: {
      path: "./src/assets/rizz.ogg",
    },

    video: {
      path: "./src/assets/vassilyVideo.mp4",
    },

    textStle: {
      font: "254px Assistant",
      color: "#FFFFFF",
    },
  },

  db: {
    projectId: "six-mins-as-dp-3339",
    collectionName: "scores",
  },
};

export interface DBDoc {
  name: string;
  score: number;
}
