const joi = require("joi");
const { validateSchema } = require("../../../lib/universal-function");

const validateLogin = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required()
        });
        await validateSchema(req.body, schema);
        next();
    } catch (error) {
      next(error);   
    }
};
const validateLogout = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            isLogoutAllDevice: joi.boolean().optional(),
        });
        await validateSchema(req.body, schema);
        next();
    } catch (error) {
      next(error);   
    }
};
const validateProfile = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
        
        });
        await validateSchema(req.query, schema);
        next();
    } catch (error) {
      next(error);   
    }
};

const validateUploadDoc = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            docFile:joi.any().required()
        });
        await validateSchema(req.body, schema);
        next();
    } catch (error) {
      next(error);   
    }
};
const validateCreatePost = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            title:joi.string().required(),
            description:joi.string().required()
        });
        await validateSchema(req.body, schema);
        next();
    } catch (error) {
      next(error);   
    }
};
const validateUpdatePost = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            postId:joi.string().required(),
            title:joi.string().optional(),
            description:joi.string().optional()
        });
        await validateSchema(req.body, schema);
        next();
    } catch (error) {
      next(error);   
    }
};

module.exports = {
    validateLogin,
    validateLogout,
    validateProfile,
    validateUploadDoc,
    validateCreatePost,
    validateUpdatePost
};