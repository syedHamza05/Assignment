
const { STATUS,ADMIN_TYPE  } = require("../../../constant/constant");
const Model = require("../../../models");
/**
 * 
 * @param {*} params 
 * @description for cheking admin exists or not
 * @returns 
 */
async function checkAdminExists(params) {
    try {
        let {email,phoneNo,adminId}=params;
        let query={
            status:{$ne:STATUS.DELETED}
        }
        if(email)
        query.email=email;
        if(phoneNo)
        query.phoneNo=phoneNo;
        if(adminId)
        query._id={$ne:adminId};
        return await Model.Admins.findOne(query,{},{});
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for create admin
 * @returns 
 */
 async function createAdmin(params) {
    try {
        return await Model.Admins.create(params);
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for get admin details
 * @returns 
 */
 async function adminDetails(params) {
    try {
        let {adminId}=params;
        let query={
            _id:adminId,
            status:{$ne:STATUS.DELETED}
        }
        
        return await Model.Admins.findOne(query);
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {*} params 
 * @description for check supper admin
 * @returns 
 */
 async function checkSupperAdmin() {
    try {
        let query={
            status:{$ne:STATUS.DELETED},
            adminType:ADMIN_TYPE.ADMIN
        }
        
        return await Model.Admins.count(query);
    } catch (error) {
        throw error;
    }
}
module.exports = { 
    checkAdminExists,
    createAdmin,
    adminDetails,
    checkSupperAdmin
};