const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const log4js = require("log4js");
log4js.configure({
  appenders: { image: { type: "file", filename: "image.log" } },
  categories: { default: { appenders: ["image"], level: "error" } },
});
var logger = log4js.getLogger("image");

const path = require("path"); // path for cut the file extension
let fs = require("fs-extra");

const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `public/images/${req.body.id[0]}`;

    fs.mkdirsSync(path);

    cb(null, path);
  },
  filename: (req, file, cb) => {
    let id = nanoid();
    /* need to use the file's mimetype because the file name may not have an extension at all */

    cb(null, `${id}` + path.extname(file.originalname));
  },
});
const upload = multer({ storage: fileStorage });

const { PrismaClient } = require("@prisma/client");
const { image, item } = new PrismaClient();
const sharp = require("sharp");

// @route   Post api/items
// @desc    post one item
// @acces    Private

router.post("/", upload.any(), async (req, res) => {
  try {
    for (let index = 0; index < req.files.length; index++) {
      const image = await image.create({
        data: {
          id_Item: parseInt(req.body.id),
          image: req.files[index].path.split("\\")[3],
        },
      });
    }

    res.status(200).json(image);
  } catch (error) {
    await item.delete({
      where: {
        id: req.body.id[0],
      },
    });
    logger.error("POST / " + error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
