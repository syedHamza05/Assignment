const router = require('express').Router();
const adminRoutes = require('./admins/routes/admins');
const userRoutes = require('./users/routes/users');
router.use('/admins', adminRoutes);
router.use('/users', userRoutes);
module.exports = router;