const redis = require("redis"); //requiring redis port
const { error } = require("winston");

// connecting to the client
const client = redis.createClient({
    password: 'wMKAL2QmoyDVGI9jsan9Ho7pvTcH0v3F',
    socket: {
        host: 'redis-10133.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10133
    }
});

client.connect();

client.on("error", (error) => {

})
client.on("connect", () => {

})

module.exports = {
    client
}