const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { STATUS  } = require("../constant/constant");
const postSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        title: { type: String,default:'' },
        description: { type: String, default: '' },
        status:{type: Number, enum: [
            STATUS.DELETED,STATUS.BLOCKED,STATUS.UN_BLOCKED
        ], default: STATUS.UN_BLOCKED },
    },
    {
        timestamps: true,
    }
);
postSchema.set("toJSON", {
    transform: function (doc, ret, option) {
        ret.postId=(doc._id).toString();
        delete ret._id;
        delete ret.__v;
    },
});
const posts = mongoose.model("posts", postSchema);
module.exports = posts;
