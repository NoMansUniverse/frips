const express = require("express");
const router = express.Router();
const log4js = require("log4js");
log4js.configure({
  appenders: { infoItem: { type: "file", filename: "infoItem.log" } },
  categories: { default: { appenders: ["infoItem"], level: "error" } },
});
var logger = log4js.getLogger("infoItem");

const { PrismaClient } = require("@prisma/client");

const {
  image,
  message,
  brand,
  color,
  category,
  itemcondition,
  fees,
  category_category,
} = new PrismaClient();

// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private

router.get("/search", async (req, res) => {
  try {
    const infoBrand = await brand.findMany({
      select: {
        Name: true,
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const infoCategory = await category.findMany({
      select: {
        id: true,
        Name: true,
      },
      distinct: ["id"],
    });

    const infoObject = [infoBrand, infoCategory];

    res.status(200).json(infoObject);
  } catch (error) {
    logger.error("GET api/infoItem/search" + error);
    res.status(500).json("Server error");
  }
});

router.get("/info", async (req, res) => {
  try {
    let infoBrand = await brand.findMany({
      select: {
        Name: true,
        id: true,
      },
      orderBy: {
        Name: "asc",
      },
    });

    const infoColor = await color.findMany({
      select: {
        Code: true,
        Name: true,
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    const infoItemCondition = await itemcondition.findMany({
      select: {
        Description: true,
        Name: true,
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const infoDelivery = await fees.findMany();

    const infoCategory = await category.findMany({
      select: {
        id: true,
        Name: true,
        _count: true,
      }
    });

    const infoObject = {
      brandInfo: infoBrand,
      itemconditionInfo: infoItemCondition,
      itemColorInfo: infoColor,
      infoCategory,
      infoDelivery,
    };

    res.status(200).json(infoObject);
  } catch (error) {
    logger.error("GET api/infoItem/info" + error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
