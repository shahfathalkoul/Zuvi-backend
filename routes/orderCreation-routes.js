const { Router } = require('express');

const { handleOrderCreation } = require('../controllers/orderCreation-controller');



const OrderCreationRoutes = Router();
OrderCreationRoutes.post('/inventory-update', handleOrderCreation);
module.exports = OrderCreationRoutes;