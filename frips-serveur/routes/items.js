const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const { nanoid } = require("nanoid");
let fs = require("fs-extra");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { similarProduct } = require("./logicFunction/logicSimilarProduct");
const log4js = require("log4js");
const { sendEmail } = require("../email/sendEmail");
const sharp = require("sharp");

log4js.configure({
  appenders: { items: { type: "file", filename: "items.log" } },
  categories: { default: { appenders: ["items"], level: "error" } },
});
var logger = log4js.getLogger("items");

const { item, image, nbview, favorit, brand, review, pricepropose, account } =
  new PrismaClient();

// @route   Post api/items
// @desc    post one item
// @acces    Private

const upload = multer().any();

router.post("/", auth, upload, async (req, res) => {
  const { id } = req.user;
  const Name = req.body.Titre;
  const Size = req.body.Size;
  const DatePuplication = await new Date();
  const Description = req.body.Description;
  const Price = parseFloat(req.body.Price);
  const Catalogue = req.body.Catalogue;
  const CurrentAuction = true;
  let Color = req.body.Color;
  const State = parseInt(req.body.State);
  const Brand = req.body.Brand;
  let Delivery = req.body.Delivery;

  if (!Array.isArray(Color)) {
    Color = Array.of(Color);
  }

  if (!Array.isArray(Delivery)) {
    Delivery = Delivery.split(",").map(Number);
  }
  let idToDelete;
  try {
    const exist = await brand.upsert({
      where: {
        Name: Brand,
      },
      create: {
        Name: Brand,
      },
      update: {},
    });

    const Item = await item.create({
      data: {
        Name,
        Description,
        Size,
        Price,
        DatePuplication,
        Disponibility: true,
        Verified: true,
        id_Seller: id,
        CurrentAuction,
        item_category: {
          create: {
            id_Category: parseInt(Catalogue),
          },
        },
        item_color: {
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

        id_ItemCondition: State,
        item_brand: {
          create: {
            id_Brand: exist.id,
          },
        },
      },
    });
    idToDelete = Item.id;

    let pathDir = `public/images/${Item.id}`;

    fs.mkdirsSync(pathDir);

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
    logger.info("POST / : " + Item.id);
    res.status(200).json(Item);
  } catch (error) {
    logger.error("POST / : " + error);
    await item.delete({
      where: {
        id: idToDelete,
      },
    });
    res.status(500).json("Server error");
  }
});

// @route   Post api/items
// @desc    post one item
// @acces    Private
router.get("/", async (req, res) => {
  try {
    const Item = await item.findMany({
      where: {
        transaction: {
          none: {},
        },
      },
      include: {
        transaction: true,

        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: {
              select: {
                Name: true,
              },
            },
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: {
              select: {
                image: true,
              },
            },
            id: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },
      take: 10,
    });

    res.status(200).json(Item);
  } catch (error) {
    logger.error("GET / : " + error);
    res.status(500).json("Server error");
  }
});

router.delete("/deleteItem/:id_Item", auth, async (req, res) => {
  const { id } = req.user;
  const { id_Item } = req.params;
  try {
    const findUser = await item.findUnique({
      where: {
        id: parseInt(id_Item),
      },
    });

    if (findUser?.id_Seller === id) {
      const deleted = await item.delete({
        where: {
          id: parseFloat(id_Item),
        },
      });
      logger.info("DELETE / : " + deleted.id + " by user " + id);
      res.sendStatus(200);
    } else {
      logger.warn(
        "DELETE / : " +
          "not authorized action by user " +
          id +
          " on item " +
          id_Item
      );
      res.status(401).send({ msg: "Action non-autorisée" });
    }
  } catch (error) {
    logger.error("DELETE / : " + error);
    res.status(500).json("Server error");
  }
});

router.post("/ItemForPorpose", async (req, res) => {
  const { id } = req.body;

  try {
    const Item = await item.findMany({
      where: {
        account: {
          id: id,
        },
      },
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
          },
        },
      },
      take: -10,
    });

    res.status(200).json(Item);
  } catch (error) {
    logger.error("POST /ItemForPorpose : " + error);
    res.status(500).json("Server error");
  }
});

router.get("/auth", auth, async (req, res) => {
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
          },
        },
        favorit: {
          where: {
            id_Account: {
              equals: req.user.id,
            },
          },
        },
      },

      take: -4,
    });

    res.status(200).json(Item);
  } catch (error) {
    logger.error("GET /auth : " + error);
    res.status(500).json("Server error");
  }
});

router.get("/filterCataloguePagination", async (req, res) => {
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },

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
        item_color: {
          select: {
            color: {
              select: {
                Code: true,
                Name: true,
                id: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            id: true,
            Description: true,
            Name: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },
      take: 5,
    });

    res.status(200).json(Item);
  } catch (error) {
    logger.error("GET /filterCataloguePagination : " + error);
    res.status(500).json("Server error");
  }
});

const priceRange = (Price) => {
  if (Price[0] !== 0 && Price[1] === null) {
    return { AND: [{ Price: { gte: Price[0] } }] };
  }

  if (Price[1] !== null && Price[0] == 0) {
    return { AND: [{ Price: { lte: Price[1] == null ? 1000000 : Price[1] } }] };
  }

  if (Price[1] !== null && Price[0] !== 0) {
    return {
      AND: [{ Price: { gte: Price[0] } }, { Price: { lte: Price[1] } }],
    };
  }

  return;
};

const filterCatalogue = (Catalogue) => {
  return {
    item_category: {
      some: {
        OR: [
          {
            id_Category: {
              in: Catalogue,
            },
          },
          {
            category: {
              OR: [
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              id_Parent: {
                                in: Catalogue,
                              },
                            },
                          },
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      id_Parent: {
                        in: Catalogue,
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              category_categoryTocategory_category_id_Parent: {
                                category_category_categoryTocategory_category_id_Child:
                                  {
                                    some: {
                                      id_Parent: {
                                        in: Catalogue,
                                      },
                                    },
                                  },
                              },
                            },
                          },
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              category_categoryTocategory_category_id_Parent: {
                                category_category_categoryTocategory_category_id_Child:
                                  {
                                    some: {
                                      category_categoryTocategory_category_id_Parent:
                                        {
                                          category_category_categoryTocategory_category_id_Child:
                                            {
                                              some: {
                                                id_Parent: {
                                                  in: Catalogue,
                                                },
                                              },
                                            },
                                        },
                                    },
                                  },
                              },
                            },
                          },
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
};

const findSearchQuery = (Search) => {
  const arraySearch = [];
  Search.map((item) => {
    arraySearch.push({
      Name: {
        contains: item.Name,
      },
    });
    arraySearch.push({
      Description: {
        contains: item.Name,
      },
    });
  });
  return arraySearch;
};

const isFilter = (filter) => {
  const {
    newCatalogue,
    newCouleur,
    newEtat,
    newMarque,
    Price,
    Search,
    itemsId,
    newTaille,
  } = filter;

  const filters = [];

  if (newMarque.length !== 0) {
    filters.push({
      item_brand: {
        some: {
          id_Brand: { in: newMarque },
        },
      },
    });
  }

  if (newCatalogue.length !== 0) {
    filters.push(filterCatalogue(newCatalogue));
  }

  if (newEtat.length !== 0) {
    filters.push({ id_ItemCondition: { in: newEtat } });
  }

  if (newTaille.length !== 0) {
    filters.push({ Size: { in: newTaille } });
  }

  if (newCouleur.length !== 0) {
    filters.push({ item_color: { some: { id_Color: { in: newCouleur } } } });
  }

  if (Boolean(Price[0]) || Boolean(Price[1])) {
    filters.push(priceRange(Price));
  }

  if (filters.length !== 0 || findSearchQuery(Search).length !== 0) {
    if (filters.length !== 0 && findSearchQuery(Search).length !== 0) {
      return { AND: filters, OR: findSearchQuery(Search) };
    } else if (filters.length !== 0 && findSearchQuery(Search).length === 0) {
      return { AND: filters };
    } else {
      return { OR: findSearchQuery(Search) };
    }
  } else {
    return;
  }
};

const isSorted = (sortedId) => {
  if (sortedId == null) return;
  if (sortedId == 1) {
    return { Price: "asc" };
  }

  if (sortedId == 0) {
    return { Price: "desc" };
  }
};

router.post("/pagination", async (req, res) => {
  const { number } = req.body;
  const {
    newCatalogue,
    newCouleur,
    newEtat,
    newMarque,
    Price,
    itemsId,
    sortedBy,
  } = req.body;

  console.log(isFilter(req.body));
  try {
    const count = await item.count({
      where: {
        ...isFilter(req.body),
        transaction: {
          none: {},
        },
      },
    });

    const Item = await item.findMany({
      where: {
        OR: isFilter(req.body),
        transaction: {
          none: {},
        },
      },
      include: {
        image: {
          take: 1,
        },

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
        item_color: {
          select: {
            color: {
              select: {
                Code: true,
                Name: true,
                id: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            id: true,
            Description: true,
            Name: true,
          },
        },
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
              },
            },
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: true,
            id: true,
          },
        },
      },

      orderBy: [isSorted(sortedBy?.id), { DatePuplication: "desc" }],
      skip: 15 * (number - 1),

      take: 15,
    });

    res.status(200).json({ items: Item, count: count });
  } catch (error) {
    logger.error("POST /api/item/pagination" + error);
    res.status(500).json("Server error");
  }
});

router.post("/more", async (req, res) => {
  const { number } = req.body;
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: {
              select: {
                image: true,
              },
            },
            id: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },
      take: 10,
      skip: 10 * (number - 1),
    });
    res.status(200).json(Item);
  } catch (error) {
    logger.error("POST /api/item/more" + error);
    res.status(500).json("Server error");
  }
});

router.get("/new", async (req, res) => {
  try {
    const Item = await item.findMany({
      where: {
        transaction: {
          none: {},
        },
      },
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },
        item_color: {
          select: {
            color: {
              select: {
                Name: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            Name: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            id: true,

            image: true,
          },
        },
      },
      orderBy: [
        { favorit: { _count: "desc" } },
        { nbview: { _count: "desc" } },
      ],
      take: 4,
    });

    res.status(200).json(Item);
  } catch (error) {
    logger.error("GET /api/item/new" + error);
    res.status(500).json("Server error");
  }
});

router.post("/topBusiness", async (req, res) => {
  const { mobile } = req.body;
  try {
    const user = await account.findUnique({
      where: {
        id: 1,
      },
      select: {
        image: true,
        Pseudo: true,
        id: true,
      },
    });
    const Item = await item.findMany({
      where: {
        transaction: {
          none: {},
        },
        id_Seller: 1,
      },
      select: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },
        item_category: {
          select: {
            category: {
              select: {},
            },
          },
        },
        Price: true,
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
              },
            },
          },
        },
        Size: true,
        _count: {
          select: {
            favorit: true,
          },
        },
        id: true,
      },
      orderBy: [
        { nbview: { _count: "desc" } },
        { favorit: { _count: "desc" } },
      ],
      take: mobile ? 6 : 5,
    });
    const { _avg } = await review.aggregate({
      where: {
        id_Account: 1,
      },
      _avg: {
        Note: true,
      },
    });

    res.status(200).json({ ...user, item: Item, _avg });
  } catch (error) {
    console.log(error);
    logger.error("GET /api/item/new" + error);
    res.status(500).json("Server error");
  }
});

router.get("/Id_of_MyFavorite", auth, async (req, res) => {
  try {
    const favoriteIDs = await favorit.findMany({
      where: {
        id_Account: req.user.id,
      },
      select: {
        id_Item: true,
      },
    });

    res.status(200).json(favoriteIDs);
  } catch (error) {
    logger.error("GET /api/item/Id_of_MyFavorite" + error);
    res.status(500).json("Server error");
  }
});

router.post("/proposition", auth, async (req, res) => {
  const { Price, idItem } = req.body;
  const { id } = req.user;

  try {
    const hasSendProposition = await pricepropose.findUnique({
      where: {
        id_Account_id_Item: {
          id_Account: id,
          id_Item: parseInt(idItem),
        },
      },
      select: {
        SendDate: true,
      },
    });

    if (
      Boolean(hasSendProposition) &&
      new Date(hasSendProposition?.SendDate) <
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    ) {
      res.status(400).json("déjà envoyé");
    } else {
      const data = await pricepropose.upsert({
        where: {
          id_Account_id_Item: {
            id_Account: id,
            id_Item: idItem,
          },
        },
        create: {
          id_Item: idItem,
          id_Account: id,
          Price: parseFloat(Price),
          SendDate: new Date(),
        },
        update: {
          id_Item: idItem,
          id_Account: id,
          Price: parseFloat(Price),
          SendDate: new Date(),
        },
        select: {
          item: {
            select: {
              account: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      logger.info(
        "Price proposition send by " + id + " for item " + idItem + ""
      );

      await sendEmail(data.item.account.id, "ReceivedOffer", {
        id_Item: idItem,
        pricepropose: parseFloat(Price),
        id_Sender: id,
      });
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    logger.error("POST /api/item/proposition" + error);
    res.status(500).json("Server error");
  }
});

/* select:{
    favorit:{
        where:{
            id_Account:req.user.id
        },
        select:{
            id_Item:true
        }
    }
}*/

// @route   Post api/items
// @desc    post one item
// @acces    Private

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let Item = await item.findUnique({
      where: {
        id: parseInt(id),
      },

      select: {
        image: true,
        Name: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            item: {
              take: 12,
              include: {
                item_brand: {
                  select: {
                    brand: {
                      select: {
                        Name: true,
                      },
                    },
                  },
                },
                image: {
                  take: 1,
                },
                item_category: {
                  select: {
                    category: {
                      select: {
                        Name: true,
                      },
                    },
                  },
                },
              },
            },
            image: {
              select: {
                image: true,
              },
            },
          },
        },
        Description: true,
        Price: true,
        Size: true,
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
        item_color: {
          select: {
            color: {
              select: {
                Name: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            Name: true,
          },
        },
        id: true,
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    const { _avg } = await review.aggregate({
      where: {
        id_Account: Item.account.id,
      },
      _avg: {
        Note: true,
      },
    });

    const userItem = await item.findMany({
      where: {
        AND: [
          { id_Seller: Item.account.id },
          {
            transaction: {
              none: {},
            },
          },
        ],
      },
      orderBy: {
        DatePuplication: "desc",
      },
      select: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: {
              select: {
                Name: true,
              },
            },
          },
        },
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
                id: true,
              },
            },
          },
        },
        id: true,
        Price: true,
        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            id: true,
            image: true,
          },
        },
      },
      take: 6,
    });

    const findedSimilarProduct = await similarProduct(
      Item.item_brand[0].brand.id,
      Item.item_category[0].category.id
    );

    Item = {
      ...Item,
      userItem,
      findedSimilarProduct,
      review: _avg?.Note,
    };
    res.status(200).json(Item);
  } catch (error) {
    logger.error("GET /api/item/:id" + error);
    res.status(500).json("Server error");
  }
});

router.post("/favorit", auth, async (req, res) => {
  try {
    const exist = await favorit.findUnique({
      where: {
        id_Account_id_Item: {
          id_Item: req.body.id,
          id_Account: req.user.id,
        },
      },
      select: {
        item: true,
      },
    });

    if (exist) {
      await favorit.delete({
        where: {
          id_Account_id_Item: {
            id_Item: req.body.id,
            id_Account: req.user.id,
          },
        },
      });
      res.status(200).json("upload");
    } else {
      await favorit.create({
        data: {
          id_Account: req.user.id,
          id_Item: req.body.id,
        },
      });
      res.status(200).json("ok");
    }
  } catch (error) {
    logger.error("POST /api/item/favorit" + error);
    res.status(500).json("Server error");
  }
});

router.post("/view", auth, async (req, res) => {
  const idUser = req.user.id;
  const { id } = req.body;
  try {
    await nbview.upsert({
      where: {
        id_Account_id_Item: {
          id_Account: idUser,
          id_Item: id,
        },
      },
      create: {
        id_Account: idUser,
        id_Item: id,
      },
      update: {},
    });
    res.status(200).json("viewed");
  } catch (error) {
    logger.error("POST /api/item/view" + error);
    res.status(500).json("Serveur error");
  }
});

router.delete("/favorit", auth, async (req, res) => {
  try {
    await favorit.delete({
      where: {
        id_Account_id_Item: {
          id_Item: req.body.id,
          id_Account: req.user.id,
        },
      },
      select: {
        item: true,
      },
    });
    logger.info("DELETE /api/item/favorit by " + req.user.id);
    res.status(200).json("ok");
  } catch (error) {
    logger.error("DELETE /api/item/favorit" + error);
    res.status(500).json("Server error");
  }
});

router.post("/favorit/all", auth, async (req, res) => {
  const { id } = req.user;
  const { pagination } = req.body;
  try {
    const count = await item.count({
      where: {
        favorit: {
          some: {
            id_Account: id,
          },
        },
      },
    });
    const Item = await item.findMany({
      where: {
        favorit: {
          some: {
            id_Account: id,
          },
        },
      },
      include: {
        image: {
          take: 1,
        },

        item_brand: {
          select: {
            brand: {
              select: {
                Name: true,
              },
            },
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: {
              select: {
                image: true,
              },
            },
            id: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },

      take: 6,
      skip: 6 * (pagination - 1),
    });

    res.status(200).json({ items: Item, count });
  } catch (error) {
    logger.error("POST /api/item/favorit/all" + error);
    res.status(500).json("Server error");
  }
});

router.post("/search", auth, async (req, res) => {
  try {
    const result = await item.findMany({
      where: {
        OR: [
          { Description: { in: req.body.filter } },
          {
            itemcondition: {
              Name: {
                in: req.body.filter,
              },
            },
          },
          {
            item_brand: {
              some: {
                brand: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
          {
            item_category: {
              some: {
                category: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
          {
            item_color: {
              some: {
                color: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
        ],
      },
    });

    res.status(200).json(result);
  } catch (error) {
    logger.error("POST /api/item/search" + error);
    res.status(500).json("Server error");
  }
});

router.post("/search", auth, async (req, res) => {
  try {
    const result = await item.findMany({
      where: {
        OR: [
          { Description: { in: req.body.filter } },
          {
            itemcondition: {
              Name: {
                in: req.body.filter,
              },
            },
          },
          {
            item_brand: {
              some: {
                brand: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
          {
            item_category: {
              some: {
                category: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
          {
            item_color: {
              some: {
                color: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
        ],
      },
      select: {
        Name: true,
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
        item_color: {
          select: {
            color: {
              select: {
                Name: true,
                id: true,
              },
            },
          },
        },
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(result);
  } catch (error) {
    logger.error("POST /api/item/search" + error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
