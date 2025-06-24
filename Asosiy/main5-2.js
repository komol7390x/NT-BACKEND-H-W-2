const {createServer}=require('node:http');
const {writeToFile,readFromFile}=require('./file5-2');

const server=createServer(async(req,res)=>{
    const method=req.method
    const url=req.url
    if(method=='POST' && req.url=='/country'){
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

    if(method=="GET" && req.url=='/country'){

    }

    if(method=="PUSH" && req.url=='/country/id/'){

    }

    if(method=='DELETE' && req.url=='/country/id/'){

    }

})
const PORT=3001
server.listen(3002,()=>console.log(`Server is running ${PORT} port`))
