const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

async function getRows() {
  const headers = [
    "suit",
    "card",
    "original_file",
    "artist",
    "alt",
    "title",
    "description",
    "audio_file",
  ];

  const rows = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, "data.csv"))
      .pipe(csv.parse())
      .on("error", (error) => reject(error))
      .on("data", (row) => rows.push(row))
      .on("end", (rowCount) =>
        resolve(
          rows.slice(1).map((row) => {
            return headers.reduce(
              (prev, header, idx) => ({
                ...prev,
                [header]: row[idx],
              }),
              {}
            );
          })
        )
      );
  });
}

const rulesContent = `## Rules that everyone can understand
- It’s clear what different cards do, and what the cards mean
- Pictures can really help, big numbers can be confusing
- Have different sets of rules, so players can play in a way that’s fun for everyone

## Games that everyone can win
- Everyone can win bingo, it’s down to luck
- Games can have more than one winner
- You can play for a set time then stop – remember “Play is the Point”!
- Recognise different players’ achievements, not just win or lose.
`;

(async function () {
  const rows = await getRows();

  const data = rows.reduce((prev, curr, idx) => {
    const { suit, card, ...rest } = curr;

    if (!prev[suit]) {
      prev[suit] = {};
    }

    prev[suit][card] = rest;

    return prev;
  }, {});

  data["common"]["back"] = {
    original_file: "rules.svg",
    artist: "Aysen",
    alt: "",
    title: "Card back Image",
    description:
      "The master image from the back of the Inclusive Futures card deck. A colourful purple and blue picture with white spots and the letters 'Q' 'K' 'J' and 'A'.",
    audio_file: "",
  };

  data["common"]["rules1"] = {
    original_file: "rules.svg",
    artist: "",
    alt: "",
    title: "Rules",
    description: rulesContent,
    audio_file: "",
  };

  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data));
  console.log("data written");
})();
