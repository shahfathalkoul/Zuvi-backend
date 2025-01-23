// const { validateShopifyWebhook, parseBufferToJson } = require('../utils/shopifyWebhooks');
const { prisma } = require("../database/db_connect");
const handleOrderCreation = async (req, res) => {
  // Uncomment the validation if needed
  // if (!validateShopifyWebhook(req)) {
  //   console.log("Invalid webhook request");
  //   return res.status(401).send("Invalid webhook request");
  // }
  console.log("Order creation webhook received");
  try {
    const orderItems = req.body.line_items; 
    for (const item of orderItems) {
      const variantId = item.variant_id;
      const quantity = item.quantity;
      const rawMaterialsUsed = await prisma.SHOPIFY_VARIANTS.findUnique({
        where: { id: variantId },
        include: {
          VariantMaterials: {
            include: {
              rawMaterial: true,
            },
          },
        },
      });

      console.log("ye hai raw m",rawMaterialsUsed)
      rawMaterialsUsed.VariantMaterials.forEach(async (variantMaterial) => {
        const material = variantMaterial.rawMaterial;
        console.log(material)
        const requiredQuantity = variantMaterial.avgQuantity;
        console.log(requiredQuantity)

        const totalRequiredQuantity = requiredQuantity * quantity;
        console.log("ye h total" ,totalRequiredQuantity)

        await prisma.RAW_MATERIALS.update({
            where: { id: material.id },
            data: {
              quantity: {
                decrement: totalRequiredQuantity, // Reduce the quantity field
              },
            },
          });
        console.log(`Updated inventory for ${material.name}: -${totalRequiredQuantity} units`);
      });
    }
    res.status(200).send("Inventory updated successfully based on order creation.");
  } catch (error) {
    console.error("Error handling order creation:", error);
    res.status(500).send("Error handling order creation");
  }
};
module.exports = { handleOrderCreation };
