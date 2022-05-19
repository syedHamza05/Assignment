const express = require("express");
const multiparty = require("connect-multiparty");
const router = express.Router();
const { authorization } = require("../../../polices/authorized");
const { 
    subscribed,
    getAllPosts
} = require("../controllers/users");

const { 
    validateSubscribed,
    validatePosts
} = require("../validations/users");


router.put("/subscribed", validateSubscribed, subscribed);
router.get("/posts", validatePosts, getAllPosts);

module.exports = router;