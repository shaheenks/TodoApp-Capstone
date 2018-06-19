const AWS = require('aws-sdk');
const proxy = require('proxy-agent');

const awsClientConfig = {
    "proxyServer": "http://10.222.50.22:8080"
};

// Initialize configuration Object.
var awsConfig = {};

const PROXY = { agent: proxy('http://10.222.50.22:8080') };

const connect = (
    proxy=false,
    region='us-east-1'
) => {
    // Setting Proxy configuration if flag & address is set to TRUE.
    if (proxy && awsClientConfig.proxyServer) {
        console.log(`Setting Proxy Server. ${awsClientConfig.proxyServer}`)
        awsConfig.httpOptions = PROXY;
    };
    // Applying REGION based on parameters.
    awsConfig.region = region;
    // Applying configuration object.
    AWS.config.update(awsConfig);
    
    return AWS;
};

module.exports = {
    connect
};



