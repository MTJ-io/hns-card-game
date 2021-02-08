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

  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data));
  console.log("data written");
})();
