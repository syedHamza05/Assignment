
const {codes}=require("../../../codes/status_codes");

const { 
    STATUS
 } = require("../../../constant/constant");
const { 
    sendResponse
} = require("../../../lib/universal-function");
const { messages } = require("../../../messages/messages");

const { sendMail } = require("../../../services/mail");


 const { 
    addSubscribed,
    checkSubscription,
    getPost,
    posts,
    postCount
 } = require("../services/subscriber");
 

/**
 * 
 * @param {email,postId} params 
 * @description for subscribed
 * @returns 
 */
 async function subscribed(req, res, next) {
    try {
        let params = req.body;
        let {postId,email}=params
        let count = await checkSubscription({postId,email});
        if (count) throw new Error(messages.ALREADY_SUBSCRIBED);
        await addSubscribed(params);
        let {title,description}=await getPost(params);
        let opts={
            email:email,
            subject:title,
            content:description
        }
        sendMail(opts);
        return sendResponse(req, res, codes.SUCCESS, messages.SUBSCRIBED, {});
    } catch (error) {
        next(error);
    }
}
/**
 * 
 * @param {limit,page} params 
 * @description for posts list
 * @returns 
 */
 async function getAllPosts(req, res, next) {
    try {
        let params = req.query;
        let postData = await posts(params);
        let count=await postCount(params)
        return sendResponse(req, res, codes.SUCCESS, messages.SUCCESS, {posts:postData,count});
    } catch (error) {
        next(error);
    }
}
module.exports = { 
    subscribed,
    getAllPosts
 };