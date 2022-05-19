const multer = require('multer');

const fileUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/subscriptions')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
});
//8MB
let uploads = {
    fileUplaoad: multer({ storage: fileUpload,limits: { fileSize: 8000000 } }),
};

//uploads.user.single('pic')
module.exports = uploads;