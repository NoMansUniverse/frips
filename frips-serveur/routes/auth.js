const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
var log4js = require("log4js");
log4js.configure({
  appenders: { auth: { type: "file", filename: "auth.log" } },
  categories: { default: { appenders: ["auth"], level: "error" } },
});
var logger = log4js.getLogger("auth");

const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../email/sendEmail");

const { account, favorit, reset_password, transaction } = new PrismaClient();

router.get("/", auth, async (req, res) => {
  try {
    const user = await account.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        Pseudo: true,
        Email: true,
        Firstname: true,
        Lastname: true,
        id: true,
        image: {
          select: {
            image: true,
          },
        },
        IBAN: true,
        address: true,
      },
    });
    const MoneyAvaible = await transaction.aggregate({
      where: {
        item:{
          id_Seller:req.user.id
        },
        DateSend:{
          not:{
            equals:null
          }
        },
        IsPaid:{
          equals:null
        }
      },
      _sum: {
        Price:true
      },
    });

    const UnpaidMoney = await transaction.aggregate({
      where:{
        item:{
          id_Seller:req.user.id
        },
        IsPaid:{
          equals:null
        },
      },
      _sum: {
        Price: true,
      },
    });

    console.log(UnpaidMoney)
    logger.info("user " + req.user.id + " GET /auth");
    res
      .status(200)
      .json({
        ...user,
        sumUnpaidMoney: UnpaidMoney?._sum?.Price,
        MoneyAvaible: MoneyAvaible?._sum?.Price,
      });
  } catch (error) {
    console.log(error);
    logger.error("GET /auth " + error);
    res.status(500).send("Serveur error");
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @acces    Public


router.post("/", async (req, res, next) => {
  const { Email, Password } = req.body;
  try {
    let user = await account.findUnique({
      where: {
        Email,
      },
      select: {
        Password: true,
        id: true,
      },
    });

    if (!user) {
      await bcrypt.compare(Password, "FAKE_PASSWORD");
      logger.info("Failed login attempt for " + Email);
      res.status(400).json({ errors: [{ msg: "Identifiant invalide" }] });
    }

    const isMatch = await bcrypt.compare(Password, user?.Password);

    if (!isMatch) {
      logger.info("Failed login attempt for user : " + user?.id);
      res.status(400).json({ errors: [{ msg: "Identifiant invalide" }] });
    } else {
      //webtokken
      const payload = {
        user: {
          id: user.id,
        },
      };

      console.log(payload);
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      logger.info("user " + user.id + " POST /auth");
      // avatar*/
    }
  } catch (error) {
    logger.error("POST /auth" + error);
    res.status(500).send("Server error");
  }
});

router.post("/reset/password", async (req, res, next) => {
  const { Email } = req.body;
  try {
    const user = await account.findUnique({
      where: {
        Email,
      },
      select: {
        id: true,
        Email: true,
      },
    });

    if (!user) {
      return;
    }

    const hasAlreadySend = await reset_password.findFirst({
      where: {
        id_Account: user.id,
        date_end: {
          gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });
    console.log(hasAlreadySend);
    if (Boolean(hasAlreadySend)) {
      res
        .status(403)
        .json({ msg: "Email déjà envoyé il y a moins de 24 heures" });
    }
    //webtokken
    else {
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        async (err, token) => {
          if (err) throw err;
          res.sendStatus(200);
          const truncatedToken = token; // truncate token to 60 characters

          await sendEmail(null, "ResetPassword", {
            Email,
            token: truncatedToken,
          });
          await reset_password.upsert({
            where: {
              id_Account: user.id,
            },
            create: {
              date_end: new Date(),
              token: truncatedToken,
              id_Account: user.id,
            },
            update: {
              date_end: new Date(),
              token: truncatedToken,
            },
          });
        }
      );

      logger.info("user " + user.id + " POST /auth");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/reset/password/:token", async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
  console.log("ici");
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = decoded.user;

    const tokenDB = await reset_password.findFirst({
      where: {
        id_Account: user.id,
        date_end: {
          gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
      select: {
        token: true,
      },
    });

    if (!Boolean(tokenDB)) {
      res.sendStatus(401);
    } else if (_.isEqual(token, tokenDB.token)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/newPassword", async (req, res, next) => {
  const { token, newPassword, confirmNewPassword } = req.body;
  try {
    if (_.isEqual(newPassword, confirmNewPassword)) {
      const { id_Account } = await reset_password.findFirst({
        where: {
          token,
          date_end: {
            gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          },
        },
        select: {
          id_Account: true,
        },
      });
      const salt = await bcrypt.genSalt(10);
      const Password = await bcrypt.hash(newPassword, salt);

      await account.update({
        where: {
          id: id_Account,
        },
        data: {
          Password,
        },
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
module.exports = router;
