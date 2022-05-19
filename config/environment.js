const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const ENVIRONMENT = process.env.NODE_ENV.trim();

switch (ENVIRONMENT) {
    case "dev":
    case "development":
        {
            if (fs.existsSync(path.join(process.cwd(), "/.env.development"))) {
                dotenv.config({ path: ".env.development" });
            } else {
                console.log("Unable to find Environment File");
                process.exit(1);
            }
            break;
        }
    case "qa":
        {
            if (fs.existsSync(path.join(process.cwd(), "/.env.qa"))) {
                dotenv.config({ path: ".env.qa" });
            } else {
                console.log("Unable to find Environment File");
                process.exit(1);
            }
            break;
        }
    case "stag":
    case "staging":
        {
            if (fs.existsSync(path.join(process.cwd(), "/.env.staging"))) {
                dotenv.config({ path: ".env.staging" });
            } else {
                process.exit(1);
            }
            break;
        }
    case "prod":
    case "production":
        {
            if (fs.existsSync(path.join(process.cwd(), "/.env"))) {
                dotenv.config({ path: ".env" });
            } else {
                process.exit(1);
            }
            break;
        }
    default:
        {
            if (fs.existsSync(path.join(process.cwd(), "/.env.local"))) {
                dotenv.config({ path: ".env.local" });
            } else {
                process.exit(1);
            }
        }
}
const SERVER = {
    APP_NAME: "Assignment",
    PORT: process.env["PORT"],
    API_KEY:process.env["API_KEY"],
    FROM_EMAIL: process.env["FROM_EMAIL"],
    JWT:{
        SECRET:process.env["JWT_SECRET"],
        EXPIRESIN:eval(process.env["JWT_EXPIRESIN"]),
    },
    MONGO: {
        DB_NAME: process.env["DB_NAME"],
        DB_URL: process.env["DB_URL"],
        OPTIONS: {
            user: process.env["DB_USER"],
            pass: process.env["DB_PASSWORD"],
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    SMTP: {
        HOST:process.env["SMTP_HOST"],
        PORT:process.env["SMTP_PORT"],
        USER:process.env["SMTP_USER"],
        PASSWORD:process.env["SMTP_PASSWORD"]
    }
};
module.exports = {
    SERVER
}