const puppeteer = require("puppeteer");
const path = require("path");
const twemoji = require("twemoji");
const fse = require("fs-extra");

const googleEmojiPages = [
  "https://www.google.com/get/noto/help/emoji/smileys-people/",
  "https://www.google.com/get/noto/help/emoji/animals-nature/",
  "https://www.google.com/get/noto/help/emoji/food-drink/",
  "https://www.google.com/get/noto/help/emoji/travel-places/",
  "https://www.google.com/get/noto/help/emoji/activities/",
  "https://www.google.com/get/noto/help/emoji/objects/",
  "https://www.google.com/get/noto/help/emoji/symbols/",
  "https://www.google.com/get/noto/help/emoji/flags/"
];

async function fetchPage(urlToFetch) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlToFetch, {
    waitUntil: "load"
  });
  const html = await page.content();
  const pageTitleParts = urlToFetch.split("/").filter(item => item !== "");
  let filePath = path.resolve(
    `./src/node/raw-pages/${pageTitleParts[pageTitleParts.length - 1]}.html`
  );
  await fse.outputFile(filePath, html);

  setTimeout(async () => {
    await browser.close();
  }, 6000 * 4);
}

const getCategoryName = file => {
  const splitValues = file.split("/");
  return splitValues[splitValues.length - 1].split(".")[0];
};

async function readSinglePage(file) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const contentHTML = fse.readFileSync(path.resolve(file), "utf8");
  await page.setContent(contentHTML);
  const table = await page.$("ul.emoji-list");
  const rawRows = await table.$$eval("li", nodes => {
    return nodes.map(n => {
      const caption = n.querySelector("figcaption");
      const code = caption.querySelector("small");

      if (code) {
        return {
          code: code.innerText
            .split("U+")
            .filter(el => el !== "")
            .map(el => el.trim()),
          name: caption.innerText.split("U+")[0].trim()
        };
      }
      return null;
    });
  });

  await browser.close();
  return {
    category: getCategoryName(file),
    emojis: rawRows
  };
}
async function saveEmojiJSON() {
  const directoryPath = path.resolve("./src/node/raw-pages");
  const files = fse.readdirSync(directoryPath);
  const getEmojis = () =>
    files.map(async file => {
      const cat = await readSinglePage(path.resolve(directoryPath, file));
      return cat;
    });

  const emojiPromises = await Promise.all(getEmojis());
  emojiPromises.forEach(section => {
    section.emojis.forEach(emojiItem => {
      const emoji = emojiItem.code
        .map(singleCode => {
          return twemoji.convert.fromCodePoint(singleCode);
        })
        .filter(el => el !== "")
        .join("");
      emojiItem.emoji = emoji;
    });
  });
  fse.writeFileSync(
    path.resolve("./src/emoji-list.json"),
    JSON.stringify(emojiPromises)
  );
}
//
// googleEmojiPages.forEach(i => {
//   fetchPage(i);
// });
saveEmojiJSON();
