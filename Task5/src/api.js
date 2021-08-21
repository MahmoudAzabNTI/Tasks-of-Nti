const url ='https://jsonplaceholder.typicode.com/posts?_limit=20'
const fs = require('fs');
const https = require('https');
const request = https.request(url, (response) => {
    let result = "";
    response.on('data', (mainData) => {
        result += mainData.toString();
    })
    response.on('end', () => {
        const final = JSON.parse(result);
        fs.writeFileSync('src/models/post.json', JSON.stringify(final))
        console.log(final);

    })
})
request.end();