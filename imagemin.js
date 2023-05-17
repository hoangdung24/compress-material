// const imagemin = require("imagemin");
// const imageminJpegtran = require("imagemin-jpegtran");
// const imageminPngquant = require("imagemin-pngquant");

import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

imagemin(["images/**/*.{png,jpg,jpeg}"], {
  destination: "outputs/images",
  plugins: [
    imageminJpegtran(),
    imageminPngquant({
      quality: [0.6, 0.8],
    }),
  ],
}).then((test) => {
  console.log("🚀 ~ file: imagemin.js:13 ~ test:", test);
});
