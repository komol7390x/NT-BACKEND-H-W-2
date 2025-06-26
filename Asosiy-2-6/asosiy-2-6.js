const { createServer } = require('http');
const { existsSync, mkdirSync, rename, createReadStream, createWriteStream } = require('fs');
const { join, extname } = require('path');
const { formidable } = require('formidable');
const { checkImages, checkVideos } = require('./checkFormat')

const PORT = 3002;
// ---------------------------------------------------------------------------------------
// FUNKSIYALAR
const checkFolder = async (item) => {
    if (!existsSync(item)) {
        mkdirSync(item, { recursive: true })
    }
}
// ---------------------------------------------------------------------------------------
// FOLDER
const uploadsFolder = join(__dirname, 'uploads');
// ---------------------------------------------------------------------------------------
// BODY
const server = createServer(async (req, res) => {
    const method = req.method;
    const url = req.url;
    await checkFolder(uploadsFolder)
    // ---------------------------------------------------------------------------------------
    // UPLOADS
    if (method === 'POST' && url === '/uploads') {
        const form = formidable({
            uploadDir: uploadsFolder,
            keepExtensions: true,
            maxFileSize: 20 * 1024 * 1024   //File sizeni berdik
        });

        form.parse(req, (err, _, files) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                return res.end(JSON.stringify({
                    statusCode: 500,
                    message: err.message || 'Error on uploading file'
                }));
            }

            const file = files['']?.[0];                                //FILE aniqlab oldik
            const ext = extname(file.originalFilename).toLowerCase();       //File nomini
            let folderType = join(uploadsFolder, 'unknown');

            if (checkImages(ext) != -1) {       //File Formatini topib shu papkaga Downlaod qivomiza
                folderType = join(uploadsFolder, 'images');
            } else if (checkVideos(ext) != -1) {
                folderType = join(uploadsFolder, 'videos');
            }

            checkFolder(folderType);

            const data = new Date();
            const time = `${data.toISOString()}_${file.originalFilename}`;
            const newFilePath = join(folderType, time);

            rename(file.filepath, newFilePath, (err) => {
                if (err) {
                    res.writeHead(500, { "content-type": "application/json" });
                    return res.end(JSON.stringify({
                        statusCode: 500,
                        error: {
                            message: err.message || 'Error on renaming file'
                        }
                    }));
                }

                res.writeHead(201, { "content-type": "application/json" });
                return res.end(JSON.stringify({
                    statusCode: 201,
                    message: 'success',
                    data: time
                }));
            });
        });
    }
    // ---------------------------------------------------------------------------------------
    // GET  
    else if (method == 'GET' && url.startsWith('/media')) {

    }

    else {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({
            statusCode: 404,
            message: 'Not found this page :('
        }));
    }
});


server.listen(PORT, () => console.log(`Server is running ${PORT}`))
