const router = require("express").Router();
const routes = require("./v1/route");
router.use("/v1", routes);
module.exports = router;
