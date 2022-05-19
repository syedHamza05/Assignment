
const {codes}=require("../../../codes/status_codes");

const { 
    STATUS,
    ADMIN_LIMIT,
 } = require("../../../constant/constant");
const { 
    sendResponse,
    jwtSign,
} = require("../../../lib/universal-function");
const { messages } = require("../../../messages/messages");

const { sendMail } = require("../../../services/mail");
const { 
    checkAdminExists,
    adminDetails,
 } = require("../services/admins");

 const { 
    createAdminSessions,
    countAdminSessions,
    activeSessions,
    deleteActiveSessions
 } = require("../services/sessions");
 const { 
    addPost,
    editPost,
    checkPost
 } = require("../services/posts");
 
/**
 * 
 * @param {deviceId,adminId,isLogoutAllDevice} params 
 * @description for delete admin sessions
 * @returns 
 */
 async function _deleteSessions(params) {
    try {
        let {deviceId,adminId,isLogoutAllDevice}=params;
        if(deviceId){
            await deleteActiveSessions({deviceId});
        }
        else if(isLogoutAllDevice){
            let admins=await activeSessions({adminId});
            deleteActiveSessions({adminId});
        }
        return true;
    } catch (error) {
       throw error;
    }
}
/**
 * 
 * @param {*(admin data)} params 
 * @description for create admin session and validate login attempts
 * @returns 
 */
 async function _createSession(params) {
    try {
        let {deviceId,accessToken}=params;
        let sessionCount=await countAdminSessions(params);
        if(sessionCount>ADMIN_LIMIT.SESSION)
        throw new Error(messages.SESSION_LIMIT_EXCEEDED);
        await createAdminSessions(params);
        return 
    } catch (error) {
       throw error;
    }
}
/**
 * 
 * @param {*(admin data)} params 
 * @description for genrate admin auth token
 * @returns 
 */
 async function _genrateAdminAuthToken(params) {
    try {
        let accessToken=await jwtSign(params);
        await _createSession({...params,accessToken});
        return accessToken;
    } catch (error) {
       throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for login
 * @returns 
 */
 async function login(req, res, next) {
    try {
        let {email,password} = req.body;
        let admin = await checkAdminExists({email});
        if (!admin) throw new Error(messages.USER_NOT_FOUND);
        if (admin.status ==STATUS.BLOCKED) throw new Error(messages.USER_IS_BLOCKED);

        await admin.authenticate(password);

        admin = admin.toJSON();
        let deviceId=admin.adminId+"-"+(new Date()).getTime();
        let accessToken =await _genrateAdminAuthToken({...admin,deviceId});
        admin.accessToken = accessToken;
        admin.deviceId=deviceId;    
        return sendResponse(req, res, codes.SUCCESS, messages.SUCCESS, admin);
    } catch (error) {
        next(error);
    }
}
/**
 * 
 * @param {*} params 
 * @description for logout
 * @returns 
 */
 async function logout(req, res, next) {
    try {
        await _deleteSessions(req.body);
        return sendResponse(req, res, codes.SUCCESS, messages.LOGOUT_SUCCESSFULLY, {});
    } catch (error) {
        next(error);
    }
}
/**
 * 
 * @param {*} params 
 * @description for profile
 * @returns 
 */
 async function profile(req, res, next) {
    try {
        let {adminId}=req.query;
        let admin=await adminDetails({adminId});
        return sendResponse(req, res, codes.SUCCESS, messages.SUCCESS,admin);
    } catch (error) {
        next(error);
    }
}

/**
 * 
 * @param {*} params 
 * @description for upload Doc
 * @returns 
 */
 async function uploadDoc(req, res, next) {
    try {
        let s3File={};
        if (req.files && req.files.docFile && req.files.docFile.size > 0) {
            s3File ={};// await uploadOriginalImageToS3Bucket(req.files.docFile,S3_FOLDERS.ADMINS);
        }
        return sendResponse(req, res, codes.SUCCESS, messages.SUCCESS,s3File);
    } catch (error) {
        next(error);
    }
}

/**
 * 
 * @param {*} params 
 * @description for create posts
 * @returns 
 */
 async function createPost(req, res, next) {
    try {
        let params=req.body;
        let count=await checkPost(params);
        if(count){
            throw new Error(messages.POST_ALREADY_CREATED);
        }
        let post=await addPost(params);
        return sendResponse(req, res, codes.SUCCESS, messages.ADD_POST_SUCCESSFULLY,post);
    } catch (error) {
        next(error);
    }
}

/**
 * 
 * @param {*} params 
 * @description for update posts
 * @returns 
 */
 async function updatePost(req, res, next) {
    try {
        let params=req.body;
        let count=await checkPost(params);
        if(count){
            throw new Error(messages.POST_ALREADY_CREATED);
        }
        await editPost(params);
        return sendResponse(req, res, codes.SUCCESS, messages.UPDATE_POST_SUCCESSFULLY,{});
    } catch (error) {
        next(error);
    }
}
module.exports = { 
    login,
    logout,
    profile,
    uploadDoc,
    createPost,
    updatePost
 };