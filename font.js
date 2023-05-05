const fs = require("fs");
const path = require("path");
const ttf2woff2 = require("ttf2woff2");

const inputPath = path.resolve(__dirname, "fonts");
const outputPath = path.resolve(__dirname, "outputs", "fonts");

fs.readdir(inputPath, async (err, files) => {
  if (err) throw err;

  await Promise.all(
    files.map((fileName) => {
      return fs.readFile(path.resolve(inputPath, fileName), async (err, data) => {
        if (err) throw err;

        const [name] = fileName.split(".");

        return fs.writeFile(
          path.resolve(outputPath, [name, "woff2"].join(".")),
          ttf2woff2(data),
          (err) => {
            if (err) throw err;
          }
        );
      });
    })
  );

  console.log("DONE!");
});
