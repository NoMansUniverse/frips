const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const log4js = require("log4js");
log4js.configure({
  appenders: { conversation: { type: "file", filename: "conversation.log" } },
  categories: { default: { appenders: ["conversation"], level: "error" } },
});
var logger = log4js.getLogger("conversation");

const { PrismaClient } = require("@prisma/client");
const _ = require("lodash");
const { sendEmail } = require("../email/sendEmail");
const { account, item, chat, message, pricepropose } = new PrismaClient();

/**
 * @route   POST api/conversation
 * @desc    get conversation
 * @acces   Private (need token)
 */
router.post("/", auth, async (req, res) => {
  let id_item = parseInt(req.body.id);
  const { id } = req.user;

  try {
    const id_Receiver = await item.findUnique({
      where: {
        id: id_item,
      },
      select: {
        account: {
          select: {
            Pseudo: true,
            id: true,
          },
        },
      },
    });

    let existConv = await chat.findMany({
      where: {
        OR: [
          {
            id_Account_1: id,
            id_Account_2: id_Receiver.account.id,
          },
          {
            id_Account_2: id,
            id_Account_1: id_Receiver.account.id,
          },
        ],
      },

      select: {
        id: true,
        message: true,
        account_accountTochat_id_Account_2: {
          select: {
            Pseudo: true,
            id: true,
          },
        },
        account_accountTochat_id_Account_1: {
          select: {
            Pseudo: true,
            id: true,
          },
        },
      },
    });

    if (existConv.length !== 0) {
      const test = {
        Profile: [
          existConv[0].account_accountTochat_id_Account_1.id,
          existConv[0].account_accountTochat_id_Account_1.Pseudo,
        ],
        Profile1: [
          existConv[0].account_accountTochat_id_Account_2.id,
          existConv[0].account_accountTochat_id_Account_2.Pseudo,
        ],
        message: existConv[0].message,
        id: existConv[0].id,
      };
      res.status(200).json(test);
    }

    let create;
    if (existConv.length === 0 || existConv === undefined) {
      create = await chat.create({
        data: {
          id_Account_1: id,
          id_Account_2: id_Receiver.account.id,
        },
        select: {
          message: true,
          id: true,
          account_accountTochat_id_Account_2: {
            select: {
              Pseudo: true,
              id: true,
            },
          },
          account_accountTochat_id_Account_1: {
            select: {
              Pseudo: true,
              id: true,
            },
          },
        },
      });

      const test = {
        Profile: [
          create.account_accountTochat_id_Account_1.id,
          create.account_accountTochat_id_Account_1.Pseudo,
        ],
        Profile1: [
          create.account_accountTochat_id_Account_2.id,
          create.account_accountTochat_id_Account_2.Pseudo,
        ],
        message: create.message,
        id: create.id,
      };
      logger.info(
        "Conversation created between " +
          id +
          " and " +
          id_Receiver.account.id +
          ""
      );
      res.status(200).json(test);
    }
  } catch (error) {
    logger.error("POST /conversation" + error);
    res.status(500).send("Serveur error");
  }
});

/**
 * @route   POST api/conversation/myConversation
 * @desc    get new message
 */
router.post("/myConversation/newMessage", auth, async (req, res) => {
  const id_Chat = req.body.chat_id;
  const text = req.body.Text;
  const { id } = req.user;
  const { id_Item } = req.body;
  const PricePropose = req.body.Price;
  const { id_Receiver } = req.body;

  try {
    if (id_Item && PricePropose) {
      const { message: newMessage } = await chat.findUnique({
        where: {
          id: parseInt(id_Chat),
        },
        select: {
          message: {
            where: {
              item: {
                pricepropose: {
                  some: {
                    SendDate: {
                      gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                    },
                  },
                },
                id: id_Item,
              },
            },
          },
        },
      });

      if (newMessage.length > 0) {
        res.sendStatus(403);
      } else {
        await pricepropose.upsert({
          where: {
            id_Account_id_Item: {
              id_Account: id,
              id_Item: id_Item,
            },
          },
          create: {
            id_Item: id_Item,
            id_Account: id,
            Price: parseFloat(PricePropose),
            SendDate: new Date(),
          },
          update: {
            id_Item: id_Item,
            id_Account: id,
            Price: parseFloat(PricePropose),
            SendDate: new Date(),
          },
        });
        await message.create({
          data: {
            Unread: true,
            Text: text,
            Date_Houre: new Date(),
            id_Sender: id,
            id_Receiver: req.body.id_Receiver,
            id_Chat: parseInt(id_Chat),
            id_Item: Boolean(id_Item) ? id_Item : null,
          },
        });
        logger.info(
          "Message (PricePropose) send between " +
            id +
            " and " +
            id_Receiver +
            ""
        );
        await sendEmail(id_Receiver, "NewMessage", {
          id_Sender: id,
          id_Item: id_Item,
          pricepropose: PricePropose,
          id_Chat,
        });
        res.status(200).json("message send");
      }
    } else {
      const msg = await message.create({
        data: {
          Unread: true,
          Text: text,
          Date_Houre: new Date(),
          id_Sender: id,
          id_Receiver: req.body.id_Receiver,
          id_Chat: parseInt(id_Chat),
          id_Item: Boolean(id_Item) ? id_Item : null,
        },
      });

      if (Boolean(msg)) {
        await sendEmail(id_Receiver, "NewMessage", { id_Sender: id, id_Chat });

        logger.info("Message send between " + id + " and " + id_Receiver + "");
        res.status(200).json("message send");
      }
      else{
        res.sendStatus(401)
      }
    }
  } catch (error) {
    logger.error("POST /conversation/myConversation/newMessage" + error);
    res.status(500).send("Serveur error");
  }
});

router.put("/updateMessage", auth, async (req, res) => {
  const { id_Chat } = req.body;
  const { id } = req.user;

  try {
    const Messages = await message.updateMany({
      where: {
        id_Chat: parseInt(id_Chat),
        id_Receiver: id,
      },
      data: {
        Unread: false,
      },
    });
    logger.info(
      "Message read between " + id + " and " + id_Chat + "by " + id + ""
    );
    res.status(200).json("Messages updates");
  } catch (error) {
    logger.error("PUT /conversation/updateMessage" + error);
    res.status(500).json("Serveur Error");
  }
});

router.get("/unReadNotification", auth, async (req, res) => {
  const { id } = req.user;
  try {
    const conversation = await chat.findMany({
      where: {
        message: {
          some: {
            Unread: true,
            id_Receiver: id,
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

    res.status(200).json({ conversation, resultsSell });
  } catch (error) {
    logger.error("GET /conversation/unReadNotification" + error);
    res.status(500).json("Serveur Erreur");
  }
});

router.get("/MyConversation/lastMessage/:id", auth, async (req, res) => {
  const { id } = parseInt(req.params);

  try {
    const conv = await chat.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        message: {
          take: -1,
        },
      },
    });

    const test = {
      message: conv.message[0],
    };

    res.status(200).json(test);
  } catch (error) {
    logger.error("GET /conversation/MyConversation/lastMessage/:id" + error);
    res.status(500).send("Serveur error");
  }
});

router.get("/MyConversation/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const convExist = await chat.findMany({
      where: {
        id: parseInt(id),
      },
      select: {
        id_Account_1: true,
        id_Account_2: true,
      },
    });

    if (
      convExist[0]?.id_Account_1 !== req.user.id &&
      convExist[0]?.id_Account_2 !== req.user.id
    ) {
      logger.warn(
        "GET /conversation/MyConversation/:id" +
          "Unauthorized by " +
          req.user.id +
          ""
      );
      res.status(400);
    } else {
      const messageNumber = await message.count({
        where: {
          id_Chat: parseInt(id),
        },
      });

      const conv = await chat.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          message: {
            orderBy: { Date_Houre: "desc" },

            take: 20,
            include: {
              item: {
                select: {
                  image: {
                    take: 1,
                  },
                  Price: true,
                  id: true,
                  pricepropose: {
                    select: {
                      Price: true,
                      id_Account: true,
                      dateApprove: true,
                      Approve: true,
                      id_Item: true,
                      SendDate: true,
                    },
                    orderBy: {
                      Price: "desc",
                    },
                    take: 1,
                  },
                },
              },
            },
          },
          account_accountTochat_id_Account_2: {
            select: {
              Pseudo: true,
              id: true,
              image: {
                select: {
                  image: true,
                },
              },
            },
          },
          account_accountTochat_id_Account_1: {
            select: {
              Pseudo: true,
              id: true,
              image: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });

      const data = {
        Profile: {
          id: conv.account_accountTochat_id_Account_1.id,
          Pseudo: conv.account_accountTochat_id_Account_1.Pseudo,
          image: conv.account_accountTochat_id_Account_1.image?.image,
        },
        Profile1: {
          id: conv.account_accountTochat_id_Account_2.id,
          Pseudo: conv.account_accountTochat_id_Account_2.Pseudo,
          image: conv.account_accountTochat_id_Account_2.image?.image,
        },

        message: conv.message,

        messageNumber,
      };
      logger.info(
        "GET /conversation/MyConversation/:id" + "by " + req.user.id + ""
      );
      res.status(200).json(data);
    }
  } catch (error) {
    logger.error("GET /conversation/MyConversation/:id" + error);
    res.status(500).send("Serveur error");
  }
});

router.post("/MyConversation/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { number } = req.body;

  try {
    const isUserInConv = await chat.findMany({
      where: {
        id: parseInt(id),
        OR: [
          {
            id_Account_1: req.user.id,
            id_Account_2: req.user.id,
          },
        ],
      },
    });

    if (isUserInConv.length === 0) {
      logger.warn(
        "POST /conversation/MyConversation/:id" +
          "Unauthorized by " +
          req.user.id +
          ""
      );
      res.status(400);
    }

    const conv = await chat.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        message: {
          orderBy: {
            Date_Houre: "desc",
          },

          take: 20,
          skip: 20 * number,
          include: {
            item: {
              select: {
                image: {
                  take: 1,
                },
                Price: true,
                Size: true,
                pricepropose: {
                  select: {
                    Approve: true,
                    dateApprove: true,
                    id_Item: true,
                  },
                },
                id: true,
              },
            },
          },
        },
      },
    });

    const convMessage = {
      message: conv.message,
    };
    res.status(200).json(convMessage);
  } catch (error) {
    logger.error("POST /conversation/MyConversation/:id" + error);
    res.status(500).send("Serveur error");
  }
});

router.get("/myConversation", auth, async (req, res) => {
  const { id } = req.user;

  try {
    const count = await chat.count({
      where: {
        OR: [
          {
            id_Account_1: id,
          },
          {
            id_Account_2: id,
          },
        ],
        AND: [
          {
            OR: [
              {
                NOT: {
                  message: {
                    every: {
                      Text: null,
                    },
                  },
                },
              },
              {
                NOT: {
                  message: {
                    every: {
                      id_Item: null,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    });

    let myConversation = await chat.findMany({
      where: {
        OR: [
          {
            id_Account_1: id,
          },
          {
            id_Account_2: id,
          },
        ],
        AND: [
          {
            OR: [
              {
                NOT: {
                  message: {
                    every: {
                      Text: null,
                    },
                  },
                },
              },
              {
                NOT: {
                  message: {
                    every: {
                      id_Item: null,
                    },
                  },
                },
              },
            ],
          },
        ],
      },

      select: {
        message: {
          take: 1,
          orderBy: [
            {
              Date_Houre: "desc",
            },
          ],
        },

        id: true,

        account_accountTochat_id_Account_2: {
          select: {
            Pseudo: true,
            id: true,
            image: {
              select: {
                image: true,
              },
            },
          },
        },
        account_accountTochat_id_Account_1: {
          select: {
            Pseudo: true,
            id: true,
            image: {
              select: {
                image: true,
              },
            },
          },
        },
      },
    });

    const unreadMessages = myConversation.filter((m) => {
      return m.message[0].Unread && m.message[0].id_Sender !== id;
    });
    const readMessages = myConversation.filter((m) => {
      return !m.message[0].Unread || m.message[0].id_Sender === id;
    });

    const sortedUnreadMessages = unreadMessages.sort(
      (a, b) =>
        new Date(b.message[0].Date_Houre) - new Date(a.message[0].Date_Houre)
    );
    const sortedReadMessages = readMessages.sort(
      (a, b) =>
        new Date(b.message[0].Date_Houre) - new Date(a.message[0].Date_Houre)
    );
    const sortedMessages = [...sortedUnreadMessages, ...sortedReadMessages];

    res.status(200).json({ myConversation: sortedMessages, count });
  } catch (error) {
    logger.error("GET /conversation/myConversation" + error);
    res.status(500).send("Serveur error : conversation");
  }
});

module.exports = router;
