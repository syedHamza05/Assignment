const mongoose = require('mongoose');
const { DEVICE_TYPE  } = require("../constant/constant");
const Schema = mongoose.Schema;

const adminSessionSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    adminId: {type: Schema.Types.ObjectId,ref: "admins",index:true},
    deviceType: {
        type: Number,
        enum: [DEVICE_TYPE.DEFAULT,DEVICE_TYPE.ANDROID,DEVICE_TYPE.IOS,DEVICE_TYPE.WEB],
        default: DEVICE_TYPE.DEFAULT,
    },
    deviceId: {type: String,index:true},
    deviceToken: {type: String},
    deviceName: {type: String,default:""},
    ip: {type: String,default:""}
}, {
    timestamps: true
});
const adminSessions = mongoose.model('adminSessions', adminSessionSchema);
module.exports = adminSessions;
