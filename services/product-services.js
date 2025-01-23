const { hitAdminApi } = require("../database/authorization");
const { prisma } = require("../database/db_connect")


const addProductService = async() => {
    try{


        let data = await hitAdminApi('products','GET');
        return data;

    }catch(e){
        console.error(e.message);
        res.status(400).json({ message: "Error in updating product" });
    }
  

}

module.exports = { addProductService }
