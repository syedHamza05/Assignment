
const { STATUS  } = require("../../../constant/constant");
const Model = require("../../../models");

/**
 * 
 * @param {postId} params 
 * @description for get post details
 * @returns 
 */
 async function getPost(params) {
    try {
        let {postId}=params;
        let query={
            _id:postId
        }
        return await Model.Posts.findOne(query,{},{});
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {email,postId} params 
 * @description for add posts
 * @returns 
 */
 async function addSubscribed(params) {
    try {
        return await Model.Subscriptions(params).save();
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {postId,email} params 
 * @description for edit posts
 * @returns 
 */
 async function checkSubscription(params) {
    try {
        let {postId,email}=params;
        let query={
            status:{$ne:STATUS.DELETED}
        };
        if(postId){
            query.postId=postId
        }
        if(email){
            query.email=email;
        }
       
        return await Model.Subscriptions.count(query);
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {*} params 
 * @description for posts
 * @returns 
 */
 async function posts(params) {
    try {
        let {limit,pageNo}=params;
        let skip =limit *(pageNo-1);
        let query={
            status:{$ne:STATUS.DELETED}
        }
        return await Model.Posts.find(query,{},{}).skip(skip).limit(limit);
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {*} params 
 * @description for post count
 * @returns 
 */
 async function postCount(params) {
    try {
        let query={
            status:{$ne:STATUS.DELETED}
        }
        return await Model.Posts.count(query)
    } catch (error) {
        throw error;
    }
}
module.exports = { 
    getPost,
    addSubscribed,
    checkSubscription,
    posts,
    postCount
};