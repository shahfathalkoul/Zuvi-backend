const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();


const validateShopifyWebhook = (req) => {
    const shopifyHmac = req.headers["x-shopify-hmac-sha256"];
    const body = req.body;
    console.log(process.env.SHOPIFY_SECRET, shopifyHmac, body);
    const hmac = crypto
        .createHmac("sha256", process.env.SHOPIFY_SECRET)
        .update(body)
        .digest("base64");
    return shopifyHmac === hmac;
};

const parseBufferToJson = (buffer) => {
    try {
        return JSON.parse(buffer.toString("utf8"));
    } catch (error) {
        throw new Error("Invalid JSON payload");
    }
};

module.exports = { validateShopifyWebhook, parseBufferToJson };