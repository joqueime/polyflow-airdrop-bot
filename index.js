require("colors");

const fs = require("fs");
const path = require("path");

const { uploadAndSaveOnce } = require("./src/uploader");
const { displayHeader, delay } = require("./src/utils");

const IMAGE_FILE = "IMAGE.png";
const TOKENS = JSON.parse(fs.readFileSync(path.join(__dirname, "BEARERS.json"), "utf-8"));

(async () => {
  displayHeader();

  console.log("Starting the bot...\n".green);
  await delay(3000);

  for (const token of TOKENS) {
    (async function loop() {
      while (true) {
        await uploadAndSaveOnce(token, IMAGE_FILE);
        await delay(1000);
      }
    })();
  }
})();
