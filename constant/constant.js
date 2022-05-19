const PROJECT_NAME="Event";

const SERVICE_BASE_URL="service";
const BATCH_SIZE_OF_NOTIFICAION= 500;

const ADMIN_TYPE={
    ADMIN:1,
    SUB_ADMIN:2
}
const ADMIN_LIMIT={
    SESSION:5,
    OTP:3,
    EMAIL_VARIFICATION_LINK:3
}
const LANGUAGE_TYPE = {
    DEFAULT: "en",
    ENGLISH: "en",
    ARABIC: "ar",
};

const DEVICE_TYPE = {
    DEFAULT: 0,
    ANDROID: 1,
    IOS: 2,
    WEB: 3,
};

const LOGGER = {
    LOGGER_ON: true,
    CONSOLE_ON: true,
    ADD_ERROR_FILE: false,
    ADD_INFO_FILE: false,
    DAILY_ROTATE_LOG_ON: false
}

const PREFIX = {
    ADMIN_OTP: PROJECT_NAME + "-" + process.env.NODE_ENV + "-admin-otp-",
    SOCKET: PROJECT_NAME + "-" + process.env.NODE_ENV + "-socket-",
    OTP: PROJECT_NAME + "-" + process.env.NODE_ENV + "-otp-"
}
const EXPIRE_TIME = {
    ADMIN_OTP_COUNTER_EXPIRE_TIME: 1 * 24 * 60 * 60, // 1 days
    ADMIN_OTP_EXPIRE_TIME:1 * 1 * 2 * 60, // 2 minutes
    ADMIN_EMAIL_LINK_EXPIRE_TIME:1 * 1 * 2 * 60, // 2 minutes
    ADMIN_EMAIL_COUNTER_LINK_EXPIRE_TIME:1 * 24 * 60 * 60, // 1 days

}

const SERVICE_TYPE={
    DEFAULT:0,
    SMTP:1
}
const STATUS={
    DEFAULT:0,
    DELETED:1,
    BLOCKED:2,
    UN_BLOCKED:3,
    ACTIVE:4,
    DE_ACTIVATED:5,
    PENDING:6,
    COMPLETED:7,
    LIVE:8,
    REFUND:9,
    START:10,
    END:10,
    CREATED:11,
    CANCELED:12
}
const NOTIFICATIONS={
    ADMIN_EMAIL_VARIFICATION_LINK:{
        PATH:`email-verification.html`,
        SUBJECT:`Reset password link`
    },
    ADMIN_FORGOT_PASSWORD:{
        PATH:`forgot-password.html`,
        SUBJECT:`Reset password link`
    },
    OTP:{
        MESSAGE:`Your OTP is:{{otpCode}}`
    }
}
module.exports = {
    ADMIN_TYPE,
    ADMIN_LIMIT,
    BATCH_SIZE_OF_NOTIFICAION,
    DEFAULT_LIMIT: 10,
    DEFAULT_SKIP: 0,
    LANGUAGE_TYPE,
    DEVICE_TYPE,
    LOGGER,
    PREFIX,
    PROJECT_NAME,
    EXPIRE_TIME,
    SERVICE_BASE_URL,
    SERVICE_TYPE,
    STATUS,
    NOTIFICATIONS
};