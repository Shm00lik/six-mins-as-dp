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

    teamMembers: [
      "שירה אביב",
      "טלי ברודצקי",
      "דביר בן יוסף",
      "טליה חזן",
      "יובל מוצפי",
      "מורן שטיין",
      "מיקה ברוורמן",
      "עלמה דורון",
      "עמית קרייזל",
      "עמרי רוזן",
      "שחר מלאך",
      "איליי סופר",
      "אלון בלוטרייך",
      "גיא אסייג",
      "נועם טננבאום",
      "אודיה נתנאל",
      "נועה פדלון",
      "רוי גבעולי",
      "תומר שיפרמן",
      "יסמין גנה",
      "נדב באבד",
      "שירה קיש",
      "דניאל קישון",
      "אביגיל ויס",
      "שיר ויס",
      "תמר אלכסנדרה ליפשיץ",
      "ירדן פרץ",
      "ענבל קס",
      "אביב כהנא",
      "יהלי רפפורט",
      "ליאור אליהו טל",
      "נדב עשור",
      "מיקה טייג",
      "נועה קיש",
      "רוני אוזן",
      "דניאל קונפורטי",
      "ינון ברזני",
      "אייל יוחאי",
      "דניאל שמידמן",
      "דניאל מושקוביץ",
      "הלל גלייכמן",
      "חננאל מלול",
      "נדב חלצי",
      "נטע טורטן",
      "רון וינשטין",
      "תמר הנדל",
      "גיל תשובה",
      "הראל לובל",
      "קטרין צימרינוב",
      "רוני אבישי",
      "תהל ורדי",
      "מיכל לייפציגר",
      "יובל שורצבאום",
      "עמית כהן",
    ],

    otherTeamMemeber: "אחר",
  },
};
