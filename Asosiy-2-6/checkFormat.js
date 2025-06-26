function checkVideos(item){
    item=item.toLowerCase()
    const videosTypes={
        '.mp4': 'video/mp4',
    }
    for(let [key,val] of Object.entries(videosTypes)){
        if(item==key){
            return val
        }
    }
    return -1
}
function checkImages(item){
    const imagesTypes={
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
    }
    for(let [key,val] of Object.entries(imagesTypes)){
        if(item==key){
            return val
        }
    }
    return -1
}
function checkDocument(item){
    const documentTypes={
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
        '.zip': 'application/zip',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }
    for(let [key,val] of Object.entries(documentTypes)){
        if(item==key){
            return val
        }
    }
    return -1
}
module.exports={checkImages,checkVideos,checkDocument}