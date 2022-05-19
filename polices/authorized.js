const { 
    jwtVerify,jwtDecode, 
    unauthorizedResponse, 
    forBiddenResponse } = require("../lib/universal-function");
const { messages } = require("../messages/messages");
const { LANGUAGE_TYPE, STATUS } = require("../constant/constant");
const { codes } = require("../codes/status_codes");
const { SERVER } = require("../config/environment");
const { 
    getCurrentSession
 } = require("../v1/admins/services/sessions");

const authorization = async(req, res, next) => {
    try {
        if (req.headers && req.headers["api-key"]) {
            const key = req.headers["api-key"];
            const accessToken=req.headers["authorization"];
            const deviceKey=req.headers["deviceid"];
            const deviceType=req.headers["devicetype"];
            const timezone=req.headers["timezone"];
            req.headers["content-language"] = req.headers["content-language"] || LANGUAGE_TYPE.ENGLISH;
            const language=req.headers["content-language"]
            const keys = [SERVER.API_KEY];
            const isKeyExits = keys.includes(key);
            if (isKeyExits && deviceKey) {
                await jwtVerify(accessToken);
                let token=await getCurrentSession(deviceKey);
                if(token && token==accessToken){
                    await jwtDecode(accessToken);
                    let {payload:{adminId}}=await jwtDecode(accessToken);
                        if(req.body){
                            req.body.deviceType=deviceType;
                            req.body.timezone=timezone;
                            req.body.language=language;
                            req.body.adminId=adminId;
                        }
                        
                        if(req.query){
                            req.query.deviceType=deviceType;
                            req.query.timezone=timezone;
                            req.query.language=language;
                            req.query.adminId=adminId;
                        }
                        
                        if(req.params){
                            req.params.deviceType=deviceType;
                            req.params.timezone=timezone;
                            req.params.language=language;
                            req.params.adminId=adminId;
                        }
                      next();
                }
                else
                return unauthorizedResponse(req, res, messages.SESSION_EXPIRE);
               
            } else {
                return unauthorizedResponse(req, res, messages.INVALID_SECRET_KEY);
            }
        } else {
            return unauthorizedResponse(req, res,messages.INVALID_SECRET_KEY);
        }
    } catch (error) {
        return unauthorizedResponse(req, res,messages.INVALID_SECRET_KEY);
    }
};
module.exports = { 
    authorization
}