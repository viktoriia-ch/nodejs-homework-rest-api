const Jimp = require("jimp");

const ResizePhoto = async (path) => {
  const image = await Jimp.read(path);
  image.resize(250, 250);
  image.write(path);
};

module.exports = ResizePhoto;
