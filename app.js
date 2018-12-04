/**
 * Created by Evgen on 23.02.2018.
 */
/**
 * Created by Evgen on 23.02.2018.
 */
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/Evgen097/topfly.git
//

// package.json
// {
//     "name": "app",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
// },
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//     "express": "^4.16.2"
// }
// }


var express = require('express');
var app = express();

try {
    app.use('/css', express.static(__dirname + '/css'));
    app.use('/font', express.static(__dirname + '/font'));
    app.use('/img', express.static(__dirname + '/img'));
    app.use('/js', express.static(__dirname + '/js'));
    app.use('/resources', express.static(__dirname + '/resources'));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');

    });
}
catch (err) {
    app.get('/', function (req, res) {
        res.json({'Sorry, error happend': err.stack});
    });
}

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});