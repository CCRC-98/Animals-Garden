//  -- Rutas PQRS --   //

const { Router, query } = require('express');
const router = Router();

const pqrsControllers = require('../controllers/pqrs.controller');


router.post('/', pqrsControllers.createPQRS);


module.exports = router;