const { 
    STATUS,
    ADMIN_TYPE
 } = require("../constant/constant");

const { 
    checkSupperAdmin,
    createAdmin
 } = require("../v1/admins/services/admins");



/**
 * 
 * @param {*} params 
 * @description for add default admin
 * @returns 
 */
async function addDefaultAdmin() {
    try {
        let params={
            firstName:"Hamza",
            lastName:"zaidi",
            phoneNo:"7088344423",
            countryCode:"91",
            email:"hamza@yopmail.com",
            password:"Qwerty@123"
        }
        const count = await checkSupperAdmin();
        console.log("count",count)
        if(count)
        return true;
        params.adminType=ADMIN_TYPE.ADMIN
        params.status=STATUS.UN_BLOCKED;
        const doc = await createAdmin(params);
        await doc.setPassword(params.password);
        await doc.save();
        return true;
    } catch (error) {
        console.log("error",error)
       return false;
    }
}



module.exports = { 
    addDefaultAdmin
 };