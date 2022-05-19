const express = require("express");
const multiparty = require("connect-multiparty");
const router = express.Router();
const { authorization } = require("../../../polices/authorized");
const { 
    login,
    logout,
    profile,
    uploadDoc,
    createPost,
    updatePost
} = require("../controllers/admins");

const { 
    validateLogin,
    validateLogout,
    validateProfile,
    validateUploadDoc,
    validateCreatePost,
    validateUpdatePost
} = require("../validations/admins");

/*
ADMIN API'S
*/
/*
ADMIN ONBOARDING API'S
*/
router.put("/login", validateLogin, login);
router.put("/logout",validateLogout, authorization, logout);
router.get("/", validateProfile,authorization,profile);

/*
FILE UPLOAD API'S
*/
router.post("/upload/doc", validateUploadDoc,authorization, multiparty(), uploadDoc);

router.post("/posts", validateCreatePost, createPost);
router.put("/posts", validateUpdatePost, updatePost);

module.exports = router;