const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { STATUS,ADMIN_TYPE } = require("../constant/constant");
const { messages } = require("../messages/messages");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, index: true, default: "" },
    phoneNo: { type: String, index: true, default: "" },
    countryCode: { type: String, index: true, default: "" },
    password: { type: String, index: true, default: "" },
    profilePic: { 
        original:{type: String, default: "" },
        thumbNail:{type: String, default: "" }
    },
    addresses: [
        {
            addressType: { type: String, default: "" },
            country: { type: String, default: "" },
            state: { type: String, default: "" },
            city: { type: String, default: "" },
            address: { type: String, default: "" },
            latitude: { type: Number, default: 0 },
            longitude: { type: Number, default: 0 },
            isDefault: { type: Boolean, default: true },
        },
    ],
    adminType:{
        type: Number, enum: [
            ADMIN_TYPE.ADMIN,ADMIN_TYPE.SUB_ADMIN
        ], default: ADMIN_TYPE.SUB_ADMIN
    },
    status:{type: Number, enum: [
        STATUS.DEFAULT,STATUS.PENDING,
        STATUS.COMPLETED,STATUS.BLOCKED,
        STATUS.UN_BLOCKED
    ], default: STATUS.DEFAULT },
}, {
    timestamps: true
});

adminSchema.set("toJSON", {
    transform: function (doc, ret, option) {
        ret.adminId=(doc._id).toString();
        delete ret.password;
        delete ret.__v;
    },
});

adminSchema.methods.authenticate = function (password, cb) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("MissingPasswordError"));

        bcrypt.compare(password, this.password, (error, result) => {
            if (!result) reject(new Error("WrongPassword"));
            resolve(this);
        });
    });

    if (!cb) return promise;
    promise.then((result) => cb(null, result)).catch((err) => cb(err));
};

adminSchema.methods.setPassword = function (password, cb) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("MissingPasswordError"));

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            this.password = hash;
            resolve(this);
        });
    });

    if (!cb) return promise;
    promise.then((result) => cb(null, result)).catch((err) => cb(err));
};

adminSchema.methods.authenticate = function (password, cb) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error(messages.MISSING_PASSWORD));

        bcrypt.compare(password, this.password, (error, result) => {
            if (!result) reject(new Error(messages.WRONG_PASSWORD));
            resolve(this);
        });
    });

    if (!cb) return promise;
    promise.then((result) => cb(null, result)).catch((err) => cb(err));
};

adminSchema.methods.setPassword = function (password, cb) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error(messages.MISSING_PASSWORD));

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            this.password = hash;
            resolve(this);
        });
    });

    if (!cb) return promise;
    promise.then((result) => cb(null, result)).catch((err) => cb(err));
};
const admins = mongoose.model('admins', adminSchema);
module.exports = admins;
