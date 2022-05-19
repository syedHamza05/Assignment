const joi = require("joi");
const { validateSchema } = require("../../../lib/universal-function");

const validateSubscribed = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            postId:joi.string().required(),
            email: joi.string().email().required(),
        });
        await validateSchema(req.body, schema);
        next();
    } catch (error) {
      next(error);   
    }
};

const validatePosts = async(req, res, next) => {
    try {
        let schema = joi.object().keys({
            pageNo:joi.number().min(1).required(),
            limit: joi.number().max(100).required(),
        });
        await validateSchema(req.query, schema);
        next();
    } catch (error) {
      next(error);   
    }
};

module.exports = {
    validateSubscribed,
    validatePosts
};