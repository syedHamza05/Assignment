
const { STATUS  } = require("../../../constant/constant");
const Model = require("../../../models");

/**
 * 
 * @param {title,description} params 
 * @description for add posts
 * @returns 
 */
 async function addPost(params) {
    try {
        return await Model.Posts(params).save();
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {postId,title,description} params 
 * @description for edit posts
 * @returns 
 */
 async function checkPost(params) {
    try {
        let {postId,title}=params;
        let query={
            status:{$ne:STATUS.DEFAULT}
        };
        if(postId){
            query._id={$ne:postId}
        }
        if(title){
            query.title=title;
        }
       
        return await Model.Posts.count(query);
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {postId,title,description} params 
 * @description for check posts
 * @returns 
 */
 async function editPost(params) {
    try {
        let {postId}=params;
        let query={
            _id:postId
        };
        let update={
            $set:params
        }
        return await Model.Posts.updateOne(query,update,{new:true});
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    addPost,
    editPost,
    checkPost
};