const { OAuth2Client } = require('google-auth-library');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const params = new URLSearchParams(event.body);
    const token = params.get('token');
    const CLIENT_ID = '935903866874-b67p8avbfk8d3jl3ts10lmncfcr6vc9c.apps.googleusercontent.com';

    const allowedUsers = [
        'hanson.brady@gmail.com',
        'sarahwatts202@gmail.com',
        '463churchroad@gmail.com',
        // Add more allowed email addresses here
    ];

    const client = new OAuth2Client(CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userEmail = payload.email;

        // Check if the user's email is in the allowed list
        if (allowedUsers.includes(userEmail)) {
            // User is allowed
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } else {
            // User is not allowed
            return { statusCode: 403, body: JSON.stringify({ success: false, error: 'Access denied. User not authorized.' }) };
        }
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ success: false, error: error.message }) };
    }
};