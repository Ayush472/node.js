import app from './expressApp';
import './routes';
import fs from 'fs';
// import config from '../config/config.js';

// console.log("::config.production::", config.PRODUCTION, typeof config.PRODUCTION);

let flag = false
let server
if (flag === "true") {
    console.log("::producion:stage::");
    var options = {
        key: fs.readFileSync('./certs/privkey.pem'), // for aeroda.in
        cert: fs.readFileSync('./certs/cert.pem'), // for aeroda.in

        // key: fs.readFileSync('./privkey.pem'), // for staging aeroda.in
        // cert: fs.readFileSync('./cert.pem'), // for staging aeroda.in

        requestCert: false,
        rejectUnauthorized: false
    };
    server = require('https').Server(options, app);
} else {
    console.log("::local::system:");
    server = require('http').Server(app);
}

export default server;
