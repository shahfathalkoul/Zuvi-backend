const { Router } = require('express');
const { getAllVariants, getVariantById, addVariant, updateVariant, deleteVariant } = require('../controllers/sh-variants-controller');

const ShopifyVariantRoutes = Router();


ShopifyVariantRoutes.get('/getAll', getAllVariants)
ShopifyVariantRoutes.get('/get/:id', getVariantById)
ShopifyVariantRoutes.post('/add', addVariant)
ShopifyVariantRoutes.put('/update/:id', updateVariant)
ShopifyVariantRoutes.delete('/delete/:id', deleteVariant)

module.exports = ShopifyVariantRoutes;
