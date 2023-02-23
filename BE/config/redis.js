const redis=require("redis");
const { error } = require("winston");


const client = redis.createClient({
    password: 'wMKAL2QmoyDVGI9jsan9Ho7pvTcH0v3F',
    socket: {
        host: 'redis-10133.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10133
    }
});

client.connect();

client.on("error",(error)=>{
    console.log(error.message);
})
client.on("connect",()=>{
    console.log("connected to the redis cloud");
})

module.exports={
    client
}