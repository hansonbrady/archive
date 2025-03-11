const { OAuth2Client } = require('google-auth-library');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const params = new URLSearchParams(event.body);
    const token = params.get('token');
    const CLIENT_ID = '935903866874-b67p8avbfk8d3jl3ts10lmncfcr6vc9c.apps.googleusercontent.com';

    const client = new OAuth2Client(CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        // User is authenticated!
        // Add your logic to create/find the user in your database and manage sessions.
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ success: false, error: error.message }) };
    }
};