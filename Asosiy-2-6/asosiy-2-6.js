const { createServer } = require('http');
const { existsSync, mkdirSync, rename, createReadStream, writeFileSync, readdirSync } = require('fs');
const { join, extname } = require('path');
const { formidable } = require('formidable');
const { checkImages, checkVideos } = require('./checkFormat')

const PORT = 3002;
// ---------------------------------------------------------------------------------------
// FOLDER
const uploadsFolder = join(__dirname, 'uploads');
// ---------------------------------------------------------------------------------------
// FUNKSIYALAR
const checkFolder = async (item) => {
    if (!existsSync(item)) {
        mkdirSync(item, { recursive: true })
    }
}
const jsonFileWrite = async () => {
    const jsonFolder = join(uploadsFolder, 'jsonFolder');
    await checkFolder(jsonFolder)
    let jsonFile = join(jsonFolder, 'jsonFile.json');
    writeFileSync(jsonFile, '[]');
}
// ---------------------------------------------------------------------------------------
// BODY
const server = createServer(async (req, res) => {
    const method = req.method;
    const url = req.url;
    await checkFolder(uploadsFolder)
    await jsonFileWrite()
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

            rename(file.filepath, newFilePath, (err) => {             //File qayta nomlavomiza
                if (err) {
                    res.writeHead(500, { "content-type": "application/json" });
                    return res.end(JSON.stringify({
                        statusCode: 500,
                        error: {
                            message: err.message || 'Error on renaming file'
                        }
                    }));
                }

                res.writeHead(201, { "content-type": "application/json" });   //Hammasi yaxshi ishlasa 201 qaytradi
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
        let miniTypes = '';
        let fileName = '';
        let ext = ''
        if (url.startsWith('/media/images')) {
            miniTypes = decodeURIComponent(url.replace('/media/images/', ''));
            const image = join(uploadsFolder, 'images')
            fileName = join(image, miniTypes)
            ext = checkImages(`.${miniTypes.split('.').at(-1)}`)

        } else if (url.startsWith('/media/videos')) {
            miniTypes = decodeURIComponent(url.replace('/media/videos/', ''));
            const video = join(uploadsFolder, 'videos')
            fileName = join(video, miniTypes)
            ext = checkVideos(`.${miniTypes.split('.').at(-1)}`)
        } else {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({
                statusCode: 404,
                message: 'Not found this page :('
            }));
        }
        if (!existsSync(fileName)) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({
                statusCode: 404,
                error: {
                    message: 'File not found'
                }
            }));
        }

        const contentType = ext || 'application/octect-stream';
        res.writeHead(200, { "content-type": contentType });
        const strem = createReadStream(fileName);
        strem.pipe(res)
    }
    // ---------------------------------------------------------------------------------------
    // GET
    else if (method == 'GET' && url == '/gallery') {
        // uploads papkadagi subfolderlarni olish
        const subfolders = readdirSync(uploadsFolder).filter(name => {
            const fullPath = join(uploadsFolder, name);
            return statSync(fullPath).isDirectory();
        });

        // Har bir subfolderdagi fayllarni yig‘ish
        subfolders.forEach(folder => {
            const folderPath = join(uploadsFolder, folder);
            const files = readdirSync(folderPath);

            files.forEach(file => {
                const ext = extname(file).toLowerCase();
                let type = 'other';

                if (checkImages(ext)!=-1) {
                    type = 'image';
                } else if (checkVideos(ext)!=-1) {
                    type = 'video';
                }

                items.push({
                    name: file,
                    type: type,
                    url: `/uploads/${folder}/${file}`
                });
            });
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ gallery: items }));
    }
    // ---------------------------------------------------------------------------------------
    // ELSE
    else {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({
            statusCode: 404,
            message: 'Not found this page :('
        }));
    }
});
server.listen(PORT, () => console.log(`Server is running ${PORT}`));
