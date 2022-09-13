const router = require('express').Router();
const notesRoutes = require('./noteRoutes.js');

router.use(notesRoutes);

module.exports = router;