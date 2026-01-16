const https = require('https');

const key = "AIzaSyARPQjSFMoVn2S6ENtiwacA82W66tZAjSI";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("AVAILABLE MODELS:");
                json.models.forEach(m => {
                    if (m.name.includes('gemini')) console.log(m.name);
                });
            } else {
                console.log("Error:", json);
            }
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(e);
});
