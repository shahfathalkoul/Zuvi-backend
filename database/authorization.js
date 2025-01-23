const axios = require('axios');

const hitAdminApi = async (endpoint, method, body = null) => {
    try {
        const { SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, SHOPIFY_STORE_DOMAIN } = process.env;

        if (!SHOPIFY_API_KEY || !SHOPIFY_API_PASSWORD || !SHOPIFY_STORE_DOMAIN) {
            throw new Error("Missing required environment variables.");
        }

        const shopifyUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/${endpoint}.json`;
        console.log(`Making ${method} request to ${endpoint}...`);

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
                `${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}`
            ).toString("base64")}`,
        };

        const config = {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) }), 
        };

        let example1 = await JSON.stringify(config);
        console.log(`Config: ${example1}`);

        const response = await fetch(shopifyUrl, config);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        // Parse the response as JSON
        const responseData = await response.json();
        console.log(`Fetched data from ${endpoint}`);
        return responseData;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

module.exports = { hitAdminApi };
