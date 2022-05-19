
Node Version:v16.14.2
Npm Version:8.5.0

Run CMD(FOR WINDOW OS):npm run local
Run CMD(FOR MAC/UBUNTU/SERVER OS):npm run start

IF use window use SET otherwise use export in package.json

Note(.env.local):
#Service configuration

NODE_ENV="local"
PORT="3001"
API_KEY="@fdstse5wq42"
FROM_EMAIL="demo@gmail.com"

#Jwt credentials
JWT_SECRET="@2!$%%@@!"
JWT_EXPIRESIN="365 * 24 * 60 * 60"

#Mongo credentials
DB_NAME="events"
DB_URL="mongodb://localhost:27017/assignment"
DB_USER=""
DB_PASSWORD=""

#Smtp credentials
SMTP_HOST="event"
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""

POSTMAN COLLECTION:https://documenter.getpostman.com/view/21046673/UyxnD51K