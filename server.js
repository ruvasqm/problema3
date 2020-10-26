const express = require("express");
const { join } = require("path");
const PORT = process.env.PORT || 7000;
const expressStaticGzip = require("express-static-gzip");
const app = express();
app.use(
  "/",
  expressStaticGzip("dist", {
    enableBrotli: true,
    customCompressions: [{ encodingName: "deflate", fileExtension: "zz" }],
    orderPreference: ["br"],
  })
);
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});
app
  .listen(PORT, () => {
    console.log("server is running on port :" + PORT);
  })
  .on("error", function (err) {
    if (err.errno === "EADDRINUSE") {
      console.log(
        `----- Port ${PORT} is busy, trying with different port ----`
      );
    } else {
      console.log(err);
    }
  });
