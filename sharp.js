const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const inputPath = path.resolve(__dirname, "images");
const outputPath = path.resolve(__dirname, "outputs", "images");

fs.readdir(inputPath)
  .then(async (files) => {
    await Promise.all(
      files.map((file) => {
        fs.lstat(file)
          .then(() => {
            // if (err) {
          })
          .catch(async (err) => {
            const subFiles = await fs.readdir(path.resolve(inputPath, file));

            return subFiles.map(async (el) => {
              const fullPath = path.resolve(inputPath, file, el);

              const data = await fs.readFile(fullPath);

              const image = sharp(data);

              const metadata = await image.metadata();

              const { format } = metadata;

              if (format === "jpeg" || format === "jpg") {
                console.log("HERE");

                return image
                  .jpeg({ mozjpeg: true, quality: 80 })
                  .write(path.resolve(outputPath, file, el));
              }

              if (format === "png") {
                console.log("HERE");

                return image
                  .png({ quality: 80 })
                  .write(path.resolve(outputPath, file, el));
              }

              return Promise.resolve();
            });

            //   fs.readdir(path.resolve(inputPath, file), (err, files) => {
            //     if (err) throw err;
            //     console.log(files);
            //     return files.map((subFile) => {
            //       return fs.readFile(() => {});
            //     });
            //   });
            // }
          });
      })
    );

    // console.log(files);
  })
  .catch(() => {});

// async (err, files) => {
//   if (err) throw err;

//   await Promise.all(
//     files.map((file) => {
//       fs.lstat(file, (err, stats) => {
//         if (err) {
//           //* DIR

//           fs.readdir(path.resolve(inputPath, file), (err, files) => {
//             if (err) throw err;
//             console.log(files);

//             return files.map((subFile) => {
//               return fs.readFile(() => {});
//             });
//           });
//         }

//         console.log(stats);
//       });

//       // fs.readFile(file, (err, data) => {
//       //   if (err) throw err;

//       //   console.log(data);
//       // });
//     })
//   );

//   // console.log(files);
// };
