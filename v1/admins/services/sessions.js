
const { STATUS  } = require("../../../constant/constant");
const Model = require("../../../models");

/**
 * 
 * @param {*} params 
 * @description for create admin sessions
 * @returns 
 */
 async function createAdminSessions(params) {
    try {
        let {_id}=params;
        if(_id)
        delete params._id;
        return await Model.AdminSessions(params).save();
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for count admin sessions
 * @returns 
 */
 async function countAdminSessions(params) {
    try {
        let {adminId}=params;
        let query={
            adminId:adminId
        }
        return await Model.AdminSessions.count(query)
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for active admin sessions
 * @returns 
 */
 async function activeSessions(params) {
    try {
        let {adminId,deviceId}=params;
        let query={
            status:{$ne:STATUS.DELETED}
        }
        if(adminId)
        query.adminId=adminId;

        if(deviceId)
        query.deviceId=deviceId;

        return await Model.AdminSessions.find(query,{},{});
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for delete active admin sessions
 * @returns 
 */
 async function deleteActiveSessions(params) {
    try {
        let {adminId,deviceId}=params;
        let query={};
        if(adminId)
        query.adminId=adminId;

        if(deviceId)
        query.deviceId=deviceId;

        return await Model.AdminSessions.deleteMany(query);
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for current admin sessions
 * @returns 
 */
 async function getCurrentSession(params) {
    try {
        let {adminId,deviceKey}=params;
        let query={
            status:{$ne:STATUS.DELETED}
        }
        if(deviceKey)
        query.deviceId=deviceKey;

        if(adminId)
        query.adminId=adminId;

        return await Model.AdminSessions.findOne(query,{},{});
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createAdminSessions,
    countAdminSessions,
    activeSessions,
    deleteActiveSessions,
    getCurrentSession
};