// const fs = require("fs");
// const path = require("path");
// const sharp = require("sharp");
// const { glob } = require("glob");

import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import sharp from "sharp";
import { glob } from "glob";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

glob("images/**/*.{png,jpg,jpeg}", { ignore: "node_modules/**" }).then(
  async (results) => {
    const outputPath = path.resolve(__dirname, "outputs", results[0]);

    const result = await fsPromise.readFile(results[0]);

    const destStream = fs.createWriteStream(outputPath);

    sharp(result)
      .jpeg({
        mozjpeg: true,
      })
      .pipe(destStream);
  }
);
