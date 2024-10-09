const cluster = require("node:cluster");
const http = require("node:http");
const os = require("node:os")

console.log(os.cpus().length);


if(cluster.isMaster)
{
    cluster.schedulingPolicy = cluster.SCHED_RR;
    console.log(`Master process ${process.pid} is running`)
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
}else{
    console.log(`Worker process ${process.pid} is started`)
    const server = http.createServer((req, res)=>{
        console.log(`Worker process ${process.pid}------`)
        if(req.url === "/")
        {
          res.writeHead(200, {"Content-Type":"text/plain"}) 
          res.end("Home Page")
        }
        else if(req.url === "/slow-page")
        {   
            for(let i = 0; i < 6000000000; i++){}
            
            res.writeHead(200, {"Content-Type":"text/plain"}) 
            res.end("Slow Page")
         
        }
    })
    
    server.listen(8000, ()=> console.log("server listening on port 8000")
    )
}