const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../email/sendEmail");

const { account ,item,transaction} = new PrismaClient();

// @route   POST api/users
// @desc    Register user
// @acces    Public


const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

router.post("/",auth,async (req, res) => {
    
    const tr = transaction.aggregate({
        sum:{
            TaxPrice:true,

        },
        where:{
            DateSell:{
                gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            }
        }
        
        
        
    })

    res.status(200).json(tr)
 
});



module.exports = router;
