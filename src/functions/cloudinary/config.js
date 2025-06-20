const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dirp2do2b",
  api_key: "366242984258263",
  api_secret: "2chwKVhUXwSMNHlxvIlWfrfM5V8",
});

module.exports = cloudinary;
