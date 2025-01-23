const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const { connectDB } = require('./database/db_connect');
const RMRoutes = require('./routes/rm-routes');
const ShopifyVariantRoutes = require('./routes/sh-variants-routes');
const variantMaterialsRoutes = require('./routes/variant-materials-routes');
const CategoryRoutes = require('./routes/category-routes');
const ProductRoutes = require('./routes/product-routes');
const OrderRoutes = require('./routes/orderCreation-routes');
// const { validateShopifyWebhook, parseBufferToJson } = require('./utils/shopifyWebhooks');

dotenv.config();
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.raw({ type: "application/json" }));
// app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use('/rawMaterials', RMRoutes);
app.use('/variants', ShopifyVariantRoutes);
app.use('/variantMaterials', variantMaterialsRoutes);
app.use('/categories', CategoryRoutes);
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);

app.get('/', (req, res) => {
    try {
        res.send("Hello world!!!");
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
