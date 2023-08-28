const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const log4js = require("log4js");
log4js.configure({
  appenders: { edit: { type: "file", filename: "edit.log" } },
  categories: { default: { appenders: ["edit"], level: "error" } },
});
const sharp = require("sharp");
var logger = log4js.getLogger("edit");

const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const fs = require("fs");
const { item, account, image, brand } = new PrismaClient();
const path = require("path");
const { nanoid } = require("nanoid");

router.get("/:idItem", auth, async (req, res) => {
  const { idItem } = req.params;

  try {
    const { item } = await account.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        item: {
          where: {
            id: parseInt(idItem),
          },
          include: {
            image: true,
            item_brand: {
              select: {
                brand: {
                  select: {
                    Name: true,
                    id: true,
                  },
                },
              },
            },
            itemcondition: {
              select: {
                Name: true,
                id: true,
                Description: true,
              },
            },
            item_color: {
              select: {
                color: true,
              },
            },
            item_category: {
              select: {
                id_Category: true,
              },
            },
            item_fees: {
              select: {
                id_Fees: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(item[0]);
  } catch (error) {
    logger.error("GET /:idItem " + error);
    res.status(500).json("Server error");
  }
});

const upload = multer().any();

router.post("/", auth, upload, async (req, res) => {
  const { id } = req.user;
  const id_Item = req.body.id_Item;
  const Name = req.body.Titre;
  const Size = req.body.Size;
  const DatePuplication = await new Date();
  let Color = await req.body.Color;
  const Description = req.body.Description;
  const Price = parseFloat(req.body.Price);
  const Catalogue = req.body.Catalogue;
  const CurrentAuction = true;
  const State = parseInt(req.body.State);
  const Brand = req.body.Brand;
  const Delivery = req.body.Delivery.split(",").map(Number);

  if (!Array.isArray(Color)) {
    Color = Array.of(Color);
  }
  let ancientItem
  try {
     ancientItem = await item.findUnique({
      where: {
        id: parseInt(id_Item),
      },
      select: {
        item_brand: {
          select: {
            id_Brand: true,
          },
        },
        item_category: {
          select: {
            id_Category: true,
          },
        },
        item_color: {
          select: {
            id_Color: true,
          },
        },
        item_fees: {
          select: {
            id_Fees: true,
          },
        },
      },
    });

    const exist = await brand.upsert({
      where: {
        Name: Brand,
      },
      create: {
        Name: Brand,
      },
      update: {},
    });

    const Item = await item.update({
      where: {
        id: parseInt(id_Item),
      },
      data: {
        Name,
        Description,
        Size,
        Price,
        DatePuplication,
        CurrentAuction,
        id_ItemCondition: State,
        item_brand: {
          update: {
            where: {
              id_Item_id_Brand: {
                id_Item: parseInt(id_Item),
                id_Brand: ancientItem.item_brand[0].id_Brand,
              },
            },
            data: {
              id_Brand: exist.id,
            },
          },
        },
        item_category: {
          update: {
            data: {
              id_Category: parseInt(Catalogue),
            },
            where: {
              id_Item_id_Category: {
                id_Category: ancientItem.item_category[0].id_Category,
                id_Item: parseInt(id_Item),
              },
            },
          },
        },
        item_color: {
          deleteMany: {},
          create: Color.map((color) => {
            return {
              color: {
                connect: {
                  id: parseInt(color),
                },
              },
            };
          }),
        },
        item_fees: {
          deleteMany: {},
          create: Delivery.map((id_Fees) => {
            return {
              fees: {
                connect: {
                  id: parseInt(id_Fees),
                },
              },
            };
          }),
        },
      },
    });

    let pathDir = `public/images/${Item.id}`;

    fs.readdir(pathDir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(pathDir, file), (err) => {
          if (err) throw err;
        });
      }
    });
    await image.deleteMany({
      where: {
        id_Item: parseInt(id_Item),
      },
    });
    for (let index = 0; index < req.files.length; index++) {
      let id = nanoid();
      fs.writeFileSync(
        path.join("./", pathDir, `${id}` + ".jpeg"),
        await sharp(req.files[index].buffer)
          .rotate()
          .resize({ width: 800, height: 800, fit: "inside" })
          .jpeg({ quality: 95 })
          .toBuffer()
      );

      await image.create({
        data: {
          id_Item: Item.id,

          confidencial: false,

          image: `${id}` + ".jpeg",
        },
      });
    }

    res.status(200).json(Item);
  } catch (error) {
    logger.error("POST / " + error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
