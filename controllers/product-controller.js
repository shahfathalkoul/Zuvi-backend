const { prisma } = require("../database/db_connect");
const { addProductService } = require("../services/product-services");



const getAllProducts = async(req,res) => {
    try {
        const products = await prisma.sHOPIFY_PRODUCTS.findMany();
        return res.status(200).json(products);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting all products" });
    }
};


const getProductById = async(req,res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ message: "Please provide product ID" });
    }

    try {
        const product = await prisma.sHOPIFY_PRODUCTS.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting product by ID" });
    }

};

const addProduct = async(req,res) => {
    // let {name,categoryId,variants} = req.body;

    // if(!name || !categoryId || !variants) {
    //     return res.status(400).json({ message: "Please provide all details" });
    // }

    try{
        let data  = await addProductService();
        // console.log(data);
        console.log(data.products[0].variants);
        console.log(data.products[0].options);
    }catch(e){
        console.error(e.message);
        res.status(400).json({ message: "Error in adding product" });
    }


};

module.exports = {addProduct,getAllProducts,getProductById};