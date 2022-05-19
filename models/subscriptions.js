const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { STATUS ,LOGIN_TYPE } = require("../constant/constant");
const { messages } = require("../messages/messages");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    postId: {type: Schema.Types.ObjectId,ref: "posts"},
    email: { type: String, index: true, default: "" },
    status:{type: Number, enum: [
        STATUS.DEFAULT,STATUS.START,
        STATUS.END,
        STATUS.PENDING
    ], default: STATUS.DEFAULT },
}, {
    timestamps: true
});

subscriptionSchema.set("toJSON", {
    transform: function (doc, ret, option) {
        ret.subscriptionId=(doc._id).toString();
        delete ret._id;
        delete ret.__v;
    },
});

const subscriptions = mongoose.model('subscriptions', subscriptionSchema);
module.exports = subscriptions;
