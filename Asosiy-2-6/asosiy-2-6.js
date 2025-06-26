const {createServer}=require('http');
const {existsSync,mkdirSync,rename,createReadStream,createWriteStream}=require('fs');
const {join,extname}=require('path');
const {formidable}=require('formidable');
const {checkImages,checkVideos}=require('./checkFormat')

const PORT=3002;
// ---------------------------------------------------------------------------------------
// FUNKSIYALAR
const checkFolder=(item)=>{
    if(!existsSync(item)){
        mkdirSync(item,{recursive:true})
    }
}
const formiDable=function(uploadDir,size){
    formidable({
        uploadDir:uploadDir,
        keepExtensions:true,
        maxFileSize:size*1024*1024
    })
}
// ---------------------------------------------------------------------------------------
// FOLDER
const uploadsFolder=join(__dirname,'uploads');
checkFolder(uploadsFolder)
// ---------------------------------------------------------------------------------------
// BODY
const server=createServer(async(req,res)=>{
    const method=req.method;
    const url=req.url
    if(method=='POST' && url.startsWith('/uploads')){
        if(url==('/uploads/images')){
            const imageFolder=join(uploadsFolder,'images');
            checkFolder(imageFolder)
            const form=formiDable(imageFolder,20)
        }else if(url==('/uploads/videos')){

        }else{
            res.writeHead(404,{"content-type":"application/json"});
            return res.end(JSON.stringify({
                statusCode:404,
                message:'Not found this page :('
            }))
        }
    }
})

server.listen(PORT,()=>console.log(`Server is running ${PORT}`))
