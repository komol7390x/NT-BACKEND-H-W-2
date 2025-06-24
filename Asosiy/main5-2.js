const {createServer}=require('node:http');
const {writeToFile,readFromFile}=require('./file5-2');

const server=createServer(async(req,res)=>{
    if(req.method=='POST' && req.url=='/country'){
        let body=''
        req.on('data',chunk=>{
            body+=chunk
        })
        req.on('end',async()=>{
            let read=await readFromFile();
            const data=JSON.parse(body)
            const newUser={
                id:!read.length?1:read.at(-1).id+1,...data
            }
            read.push(newUser);
            writeToFile(read);
            res.writeHead(201,{'content-type':'application:json'});
            res.end(JSON.stringify({
                statuCode:201,
                message:'Done',
                data:newUser
            }))
        })
    }

    if(req.method=="GET" && req.url=='/'){

    }

    if(req.method=="PUSH" && req.url=='/country/id/'){

    }

    if(req.method=='DELETE' && req.url=='/country/id/'){

    }

})

server.listen(3002,()=>console.log('Server is running 3002 port'))