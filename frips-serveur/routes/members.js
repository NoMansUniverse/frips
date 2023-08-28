const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const _ = require("lodash");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const { nanoid } = require("nanoid");
let fs = require("fs-extra");
const path = require("path"); // path for cut the file extension
const sharp = require("sharp");
const log4js = require("log4js");
const { sendEmail } = require("../email/sendEmail");
const { sendPacket } = require("../email/Template/emailSendPacket");

log4js.configure({
  appenders: { members: { type: "file", filename: "members.log" } },
  categories: { default: { appenders: ["members"], level: "error" } },
});
var logger = log4js.getLogger("members");

const { item, account, image, pricepropose, transaction, review, address } =
  new PrismaClient();
// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private

const filterArrayItems = [
  {
    nbview: {
      _count: "desc",
    },
  },
  {
    favorit: {
      _count: "desc",
    },
  },
  {
    pricepropose: {
      _count: "desc",
    },
  },
  { DatePuplication: "asc" },
  { DatePuplication: "desc" },

  {
    Approve: {
      equals: true,
    },
  },
  { Approve: { equals: null } },
  {
    Approve: {
      equals: false,
    },
  },
  { DateSell: "desc" },
  { DateSell: "asc" },
];

const constructFilter = (filterArray, type) => {
  const array = [];
  if (filterArray.length === 0 && type === "myFrips") {
    return [{ pricepropose: { _count: "desc" } }, { DatePuplication: "desc" }];
  }
  if (filterArray.length === 0 && type === "myProposition") {
    return [{ Approve: { equals: null } }];
  }
  filterArrayItems.forEach((element, index) => {
    if (_.includes(filterArray, index)) {
      array.push(element);
    }
  });
  return array;
};

const upload = multer().single("singleImage");

router.post("/myProfile", auth, upload, async (req, res) => {
  const { id } = req.user;
  try {
    let pathDir = `public/imageProfile/${id}`;

    fs.emptyDir(pathDir, (err) => {
      if (err) throw err;
      console.log(`Successfully deleted everything inside ${pathDir}`);
    });
    fs.mkdirsSync(pathDir);

    let idImage = nanoid();
    fs.writeFileSync(
      path.join("./", pathDir, `${idImage}` + ".jpeg"),
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .jpeg({ quality: 75 })
        .toBuffer()
    );

    const changeProfileImage = await image.upsert({
      where: {
        id_Account: id,
      },
      create: {
        id_Account: id,
        image: `${idImage}` + ".jpeg",
        confidencial: false,
      },
      update: {
        image: `${idImage}` + ".jpeg",
        confidencial: false,
      },
    });
    logger.info("POST /myProfile of" + id);
    res.status(200).json(changeProfileImage.image);
  } catch (error) {
    logger.error("POST /myProfile", error);
    res.status(500).json("Serveur error");
  }
});

router.post("/updateAddress", auth, async (req, res) => {
  const { id } = req.user;
  const { Rue, Numero, Localite, NPA, Prenom, Nom } = req.body;
  try {
    const Addresse = await account.update({
      where: {
        id,
      },
      data: {
        address: {
          upsert: {
            create: {
              City: Localite,
              NPA: parseInt(NPA),
              NumStreet: Numero,
              Street: Rue,
            },
            update: {
              City: Localite,
              NPA: parseInt(NPA),
              NumStreet: Numero,
              Street: Rue,
            },
          },
        },
        Firstname:Prenom,
        Lastname:Nom
      },
      select: {
        address: true,
      },
    });
    logger.info("POST /updateAddress of" + id);
    res.status(200).json({ address: Addresse });
  } catch (error) {
    console.log(error);
    logger.error("POST /updateAddress", error);
    res.status(500).json("Serveur error");
  }
});

// @route   get api/members/myFrips
// @desc    get all your post
// @acces    Private

const constructQueryMySell = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    return;
  }
  whereFilter.map((item) => {
    if (item === 10) {
      arrayWhere.push({ DateSend: { equals: null } });
    }
    if (item === 11) {
      arrayWhere.push({ DateSend: { not: { equals: null } } });
    }
  });
  if (arrayWhere.length == 0) {
    return;
  }
  return arrayWhere;
};

const constructQueryOrderByMySell = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    return [{ DateSend: "asc" }];
  }
  whereFilter.map((item) => {
    if (item === 8) {
      arrayWhere.push({ DateSell: "desc" });
    }
    if (item === 9) {
      arrayWhere.push({ DateSell: "asc" });
    }
  });
  return arrayWhere;
};

router.post("/mySell", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;

  try {
    const countMySell = await transaction.count({
      where: {
        OR: constructQueryMySell(filter),
        item: {
          id_Seller: id,
        },
      },
    });
    const mySell = await transaction.findMany({
      where: {
        OR: constructQueryMySell(filter),
        item: {
          id_Seller: id,
        },
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,
            Price: true,
            item_fees: {
              select: {
                fees: {
                  select: {
                    Name: true,
                    Description: true,
                    Price: true,
                  },
                },
              },
            },
            account: {
              select: {
                Pseudo: true,
                id: true,
                address: true,
                Firstname: true,
                Lastname: true,
                Email: true,
              },
            },

            DeliveryDetails: true,
          },
        },
        DeliveryPrice: true,
        TaxPrice: true,

        DateSell: true,
        DateSend: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            address: true,
            Firstname: true,
            Lastname: true,
            Email: true,
          },
        },
        review: {
          where: {
            transaction: {
              item: {
                id_Seller: id,
              },
            },
            id_Account: {
              equals: id,
            },
          },
          select: {
            Note: true,
            id_Account: true,
          },
        },
        id: true,

        Price: true,
        Status: true,
      },
      orderBy: constructQueryOrderByMySell(filter),
      take: 5,
      skip: 5 * (number - 1),
    });

    if (countMySell === 0 && filter.length !== 0) {
      res.status(200).json({
        items: mySell,
        count: countMySell,
        msg: "Il n'y a aucune correspondance à votre recherche",
      });
    } else if (countMySell === 0 && filter.length === 0) {
      res.status(200).json({
        items: mySell,
        count: countMySell,
        msg: "Vous avez envoyé toutes vos commandes",
      });
    } else {
      res.status(200).json({ items: mySell, count: countMySell, msg: "" });
    }
  } catch (error) {
    logger.error("POST /mySell", error);
    res.status(500).json("Servor Error");
  }
});

router.get("/mySell/:id_Item", auth, async (req, res) => {
  const { id } = req.user;
  const { id_Item } = req.params;

  try {
    const mySellItem = await transaction.findFirst({
      where: {
        id_Item: parseInt(id_Item),
        item: {
          id_Seller: id,
        },
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,
            account: {
              select: {
                Pseudo: true,
                id: true,
                address: true,
                Firstname: true,
                Lastname: true,
                Email: true,
              },
            },
            item_fees: {
              select: {
                fees: {
                  select: {
                    Name: true,
                    Description: true,
                    Price: true,
                  },
                },
              },
            },
            Price: true,
            DeliveryDetails: true,
          },
        },
        DateSell: true,
        DateSend: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            address: true,
            Firstname: true,
            Lastname: true,
            Email: true,
          },
        },

        id: true,
        DeliveryPrice: true,
        TaxPrice: true,

        Price: true,
        Status: true,
        review: {
          where: {
            id_Account: {
              equals: id,
            },
          },
          select: {
            Note: true,
          },
        },
      },
    });

    res.status(200).json(mySellItem);
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

router.post("/myFrips", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;
  try {
    const count = await item.count({
      where: {
        account: {
          id,
        },
        transaction: {
          none: {},
        },
      },
    });
    const MyFrips = await item.findMany({
      where: {
        id_Seller: id,
        transaction: {
          none: {},
        },
      },
      select: {
        image: {
          take: 1,
        },
        Price: true,
        id: true,
        Size: true,
        Name: true,
        pricepropose: {
          select: {
            Price: true,
            account: {
              select: {
                Pseudo: true,
                id: true,
                image: true,
              },
            },
            id_Account: true,
            Approve: true,
            dateApprove: true,
            SendDate: true,
          },
          orderBy: { Price: "desc" },
          take: 1,
        },
        _count: {
          select: {
            favorit: true,
            nbview: true,
          },
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
      },
      take: 5,
      skip: 5 * (number - 1),
      orderBy: constructFilter(filter, "myFrips"),
    });

    if (count === 0 && filter.length === 0) {
      res.status(200).json({
        items: MyFrips,
        count: count,
        msg: "Vous n'avez aucun article mis en vente",
      });
    } else if (count === 0 && filter.length !== 0) {
      res.status(200).json({
        items: MyFrips,
        count: count,
        msg: "Il n'y a aucune correspondance à votre recherche",
      });
    } else {
      res.status(200).json({ items: MyFrips, count, msg: "" });
    }
  } catch (error) {
    logger.error("POST /myFrips", error);
    res.status(500).json("Serveur error");
  }
});

router.get("/myFripsNotifications", auth, async (req, res) => {
  const { id } = req.user;
  try {
    const resultsPurchase = await item.findMany({
      where: {
        transaction: {
          some: {
            Status: {
              equals: null,
            },
            DateSend: {
              not: {
                equals: null,
              },
            },
            id_Account: id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const resultsSell = await item.findMany({
      where: {
        id_Seller: id,
        transaction: {
          some: {
            DateSend: {
              equals: null,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    const resultsProposition = await item.findMany({
      where: {
        pricepropose: {
          some: {
            id_Account: id,
            SendDate: {
              gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            },
          },
        },
        transaction: {
          none: {},
        },
      },
      select: {
        id: true,
      },
    });

    res.status(200).json({ resultsSell, resultsProposition, resultsPurchase });
  } catch (error) {
    logger.error("GET /myFripsNotifications", error);
    res.status(500).json("Serveur error");
  }
});

const constructQueryMyProposition = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    arrayWhere.push({
      Approve: {
        equals: null,
      },
    });
    arrayWhere.push({
      Approve: {
        equals: true,
      },
    });
  }

  whereFilter.map((item) => {
    if (item === 5) {
      arrayWhere.push({
        Approve: {
          equals: true,
        },
      });
    }
    if (item === 6) {
      arrayWhere.push({ Approve: { equals: null } });
    }
    if (item === 7) {
      arrayWhere.push({ Approve: { equals: false } });
    }
  });
  return arrayWhere;
};

router.post("/MyProposition", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;

  try {
    const count = await pricepropose.count({
      where: {
        id_Account: id,
        SendDate: {
          gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
        OR: constructQueryMyProposition(filter),
        item: {
          transaction: {
            none: {},
          },
        },
      },
    });

    const MyProposition = await pricepropose.findMany({
      where: {
        id_Account: id,
        SendDate: {
          gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
        OR: constructQueryMyProposition(filter),
        item: {
          transaction: {
            none: {},
          },
        },
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            Price: true,
            id: true,
            Size: true,
            Name: true,
            item_brand: {
              select: {
                brand: {
                  select: {
                    Name: true,
                  },
                },
              },
            },
          },
        },
        dateApprove: true,
        Approve: true,
        SendDate: true,
        Price: true,
        id_Account: true,
      },
    });

    res.status(200).json({ items: MyProposition, count });
  } catch (error) {
    logger.error("POST /MyProposition", error);
    res.status(500).json("Serveur error");
  }
});

router.get(
  "/ReceivedProposition/:id_Item/:id_Sender",
  auth,
  async (req, res) => {
    const { id } = req.user;
    const { id_Item, id_Sender } = req.params;

    try {
      const { account } = await item.findFirst({
        where: {
          id: parseInt(id_Item),
        },
        select: {
          account: {
            select: {
              id: true,
            },
          },
        },
      });
      console.log(account);

      if (id !== account.id) {
        res.status(400).json({ msg: "Aucune correspondance" });
      } else {
        const MyProposition = await pricepropose.findUnique({
          where: {
            id_Account_id_Item: {
              id_Account: parseInt(id_Sender),
              id_Item: parseInt(id_Item),
            },
          },
          select: {
            item: {
              select: {
                image: {
                  take: 1,
                },
                Price: true,
                id: true,
                Size: true,
                Name: true,
                item_brand: {
                  select: {
                    brand: {
                      select: {
                        Name: true,
                      },
                    },
                  },
                },
              },
            },
            dateApprove: true,
            Approve: true,
            SendDate: true,
            Price: true,
            id_Account: true,
          },
        });
        if (!Boolean(MyProposition)) {
          res.status(400).json({ msg: "Aucune correspondance" });
        } else {
          if (
            MyProposition.SendDate >
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          ) {
            res.status(200).json(MyProposition);
          } else {
            res.status(400).json({ msg: "Article plus disponible" });
          }
        }
      }
    } catch (error) {
      logger.error("GET /mySell/:id_Item", error);
      res.status(500).json("Servor Error");
    }
  }
);

router.get("/MyProposition/:id_Item", auth, async (req, res) => {
  const { id } = req.user;
  const { id_Item } = req.params;

  try {
    const MyProposition = await pricepropose.findUnique({
      where: {
        id_Account_id_Item: {
          id_Account: parseInt(id),
          id_Item: parseInt(id_Item),
        },
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            Price: true,
            id: true,
            Size: true,
            Name: true,
            item_brand: {
              select: {
                brand: {
                  select: {
                    Name: true,
                  },
                },
              },
            },
          },
        },
        dateApprove: true,
        Approve: true,
        SendDate: true,
        Price: true,
        id_Account: true,
      },
    });

    if (!Boolean(MyProposition) || MyProposition.id_Account !== id) {
      res.status(400).json({ msg: "Aucune correspondance" });
    } else {
      if (
        MyProposition.dateApprove <
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      ) {
        res.status(200).json(MyProposition);
      } else {
        res.status(400).json({ msg: "Offre plus disponible" });
      }
    }
  } catch (error) {
    logger.error("GET /mySell/:id_Item", error);
    res.status(500).json("Servor Error");
  }
});

router.post("/Received", auth, async (req, res) => {
  const { id } = req.user;
  const { id_transaction } = req.body;

  try {
    await transaction.update({
      where: {
        id: id_transaction,
      },
      data: {
        Status: "reçu",
      },
    });
    logger.info(
      "POST /Received",
      "Transaction " + id_transaction + " received"
    );
    res.sendStatus(200);
  } catch (error) {
    logger.error("POST /Received", error);
    res.status(500).json("Servor Error");
  }
});

router.post("/Delivery", auth, async (req, res) => {
  const { id } = req.user;
  const { id_transaction } = req.body;

  try {
    const { id_Account, id_Item } = await transaction.update({
      where: {
        id: id_transaction,
      },

      data: {
        DateSend: new Date(),
      },
      select: {
        id_Account: true,
        id_Item: true,
      },
    });

    res.sendStatus(200);
    await sendEmail(id_Account, "SendPacket", { id_Item, id_Sender: id });
  } catch (error) {
    logger.error("POST /Delivery", error);
    res.status(500).json("Servor Error");
  }
});

router.post("/Rewiew", auth, async (req, res) => {
  const { id } = req.user;
  const { id_transaction, note } = req.body;

  try {
    await review.create({
      data: {
        id_Transaction: id_transaction,
        id_Account: id,
        Note: note,
        Date_Houre: new Date(),
        Text: null,
      },
    });
    logger.info(
      "POST /Rewiew",
      "Review created on transaction " + id_transaction
    );
    res.sendStatus(200);
  } catch (error) {
    logger.error("POST /Rewiew", error);
    res.status(500).json("Servor Error");
  }
});

const constructQueryMyPurchase = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    return;
  }
  whereFilter.map((item) => {
    if (item === 13) {
      arrayWhere.push({ Status: { equals: null } });
    }
    if (item === 12) {
      arrayWhere.push({ Status: { not: { equals: null } } });
    }
  });
  if (arrayWhere.length == 0) {
    return;
  }
  return arrayWhere;
};

const constructQueryOrderByMyPurchase = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    return;
  }
  whereFilter.map((item) => {
    if (item === 14) {
      arrayWhere.push({ DateSell: "desc" });
    }
    if (item === 15) {
      arrayWhere.push({ DateSell: "asc" });
    }
  });
  return arrayWhere;
};

router.post("/MyPurchase", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;

  try {
    const countMyPurchase = await transaction.count({
      where: {
        OR: constructQueryMyPurchase(filter),
        id_Account: id,
      },
    });
    const MyPurchase = await transaction.findMany({
      where: {
        id_Account: id,
        OR: constructQueryMyPurchase(filter),
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,
            account: {
              select: {
                Pseudo: true,
                id: true,
                address: true,
                Firstname: true,
                Lastname: true,
                Email: true,
              },
            },
            item_fees: {
              select: {
                fees: {
                  select: {
                    Name: true,
                    Description: true,
                    Price: true,
                  },
                },
              },
            },
            Price: true,
            DeliveryDetails: true,
          },
        },
        DateSell: true,
        DateSend: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            address: true,
            Firstname: true,
            Lastname: true,
            Email: true,
          },
        },

        id: true,
        DeliveryPrice: true,
        TaxPrice: true,

        Price: true,
        Status: true,
        review: {
          where: {
            id_Account: {
              equals: id,
            },
          },
          select: {
            Note: true,
          },
        },
      },
      take: 5,
      skip: 5 * (number - 1),
      orderBy: constructQueryOrderByMyPurchase(filter),
    });

    if (countMyPurchase === 0 && filter.length === 0) {
      res.status(200).json({
        items: MyPurchase,
        count: countMyPurchase,
        msg: "Vous avez marquer reçu sur toutes vos commandes",
      });
    } else if (countMyPurchase === 0 && filter.length !== 0) {
      res.status(200).json({
        items: MyPurchase,
        count: countMyPurchase,
        msg: "Il n'y a aucune correspondance à votre recherche",
      });
    } else {
      res
        .status(200)
        .json({ items: MyPurchase, count: countMyPurchase, msg: "" });
    }
  } catch (error) {
    logger.error("POST /MyPurchase", error);
    res.status(500).json("Servor Error");
  }
});

router.get("/MyPurchase/:id_Item", auth, async (req, res) => {
  const { id } = req.user;
  const { id_Item } = req.params;

  try {
    const MyPurchase = await transaction.findFirst({
      where: {
        id_Account: id,
        id_Item: parseInt(id_Item),
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,
            account: {
              select: {
                Pseudo: true,
                id: true,
                address: true,
                Firstname: true,
                Lastname: true,
                Email: true,
              },
            },
            item_fees: {
              select: {
                fees: {
                  select: {
                    Name: true,
                    Description: true,
                    Price: true,
                  },
                },
              },
            },
            Price: true,
            DeliveryDetails: true,
          },
        },
        DateSell: true,
        DateSend: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            address: true,
            Firstname: true,
            Lastname: true,
            Email: true,
          },
        },

        id: true,
        DeliveryPrice: true,
        TaxPrice: true,

        Price: true,
        Status: true,
        review: {
          where: {
            id_Account: {
              equals: id,
            },
          },
          select: {
            Note: true,
          },
        },
      },
    });

    if (Boolean(MyPurchase)) {
      res.status(200).json(MyPurchase);
    } else {
      res.status(400).json({ msg: "Article a été supprimé" });
    }
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

router.post("/StatusProposition", auth, async (req, res) => {
  const { id_Item, approved, id_Account } = req.body;

  try {
    const propose = await pricepropose.update({
      where: {
        id_Account_id_Item: {
          id_Account,
          id_Item,
        },
      },
      data: {
        dateApprove: new Date(),
        Approve: approved,
      },
    });

    res.sendStatus(200);
    if (approved) {
      sendEmail(id_Account, "AcceptedOffer", { id_Item });
    }
  } catch (error) {
    logger.error("POST /StatusProposition", error);
    res.status(500).json("Servor Error");
  }
});

router.post("/user/:name", async (req, res) => {
  const { filter, number } = req.body;
  const { name } = req.params;

  try {
    const userAccount = await account.findUnique({
      where: {
        Pseudo: name,
      },
      select: {
        id: true,
        Pseudo: true,
        image: {
          select: {
            image: true,
          },
        },
      },
    });
    const { id } = userAccount;

    if (!id) {
      res.sendStatus(400);
    }

    const { _avg } = await review.aggregate({
      where: {
        id_Account: id,
      },
      _avg: {
        Note: true,
      },
    });

    const count = await item.count({
      where: {
        id_Seller: id,
        transaction: {
          none: {},
        },
      },
    });
    const itemUser = await item.findMany({
      where: {
        id_Seller: id,
        transaction: {
          none: {},
        },
      },

      select: {
        image: {
          take: 1,
        },
        Price: true,
        id: true,
        Size: true,
        Name: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            image: true,
          },
        },
        _count: {
          select: {
            favorit: true,
            nbview: true,
          },
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
      },
      take: 10,
      skip: 10 * (number - 1),
    });

    res.status(200).json({
      items: itemUser,
      count,
      userAccount: { ...userAccount, review: _avg?.Note },
    });
  } catch (error) {
    console.log(error);
    logger.error("POST /:name", error);
    res.status(500).json("Serveur error");
  }
});

router.post("/IBAN", auth, async (req, res) => {
  const { id } = req.user;
  const { IBAN } = req.body;

  try {
    const Account = await account.update({
      where: {
        id,
      },
      data: {
        IBAN,
      },
      select: {
        IBAN: true,
      },
    });

    res.status(200).json(Account.IBAN);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/RequestPayment", auth, async (req, res) => {
  const {id} = req.user
  try {
    
    const tr =  await transaction.updateMany({
      where:{
        item:{
          id_Seller:id
        },
         DatePaymentRequest:{
          not:{
            equals:null
          }
         },

      },
      data:{
        DatePaymentRequest:new Date()
      }
    })
    console.log(tr)
    

    if(tr.count ===0){
      res.status(400).json("Vous avez déjà fait une requeête pour vos derniers paiements")
    }
    else{
      res.sendStatus(200)
    }
  } catch (error) {
    console.log(error);
    logger.error("GET /auth " + error);
    res.status(500).send("Serveur error");
  }
});

module.exports = router;
