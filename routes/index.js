const express = require('express');

const router = express.Router();
const contactsRoutes = require('./contacts');
//router.get('/contacts');
// const swaggerAutogen = require('swagger-autogen')();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
router.use('/', require('./swagger'));
router.use('/contacts', contactsRoutes);
;
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router;
