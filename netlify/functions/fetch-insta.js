const fetch = require('node-fetch');

exports.handler = async function(event) {
    const targetUrl = event.queryStringParameters.url;
    if (!targetUrl) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Target URL is required.' }) };
    }
    try {
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' }
        });
        if (!response.ok) { throw new Error(`Instagram returned an error: ${response.status} ${response.statusText}`); }
        const body = await response.text();
        return { statusCode: 200, body: JSON.stringify({ html: body }) };
    } catch (error) {
        console.error('Fetch error in Netlify function:', error);
        return { statusCode: 500, body: JSON.stringify({ error: `Server-side fetch failed: ${error.message}` }) };
    }
};
