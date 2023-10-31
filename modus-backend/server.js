process.on('uncaughtException',(err)=>{
    console.log(err.name,err.message);
    console.log('uncaughtException occured, shuttingdown...');
    process.exit(1);
})

const app = require('./app');
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});

// create server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server has started!");
})

process.on('unhandledRejection',(err)=>{
    console.log(err.name,err.message);
    console.log('unhandled rejection occured, shuttingdown...');

    server.close(()=>{
        process.exit(1);
    })
})