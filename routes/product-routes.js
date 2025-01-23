const { Router } = require('express');
const { getAllProducts, getProductById, addProduct } = require('../controllers/product-controller');



const ProductRoutes = Router();


ProductRoutes.get('/getAll', getAllProducts)
ProductRoutes.get('/get/:id', getProductById)
ProductRoutes.post('/add', addProduct)
// ProductRoutes.put('/update/:id', updateRM)
// ProductRoutes.delete('/delete/:id', deleteRM)

module.exports = ProductRoutes;