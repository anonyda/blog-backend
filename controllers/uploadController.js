
const multer = require('multer');
const DataURI = require('datauri/parser');
const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('blogImage');

const getImageURI = async (req) => {

    try{
        const dURI = await new DataURI();
        let uri = dURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        // console.log(uri);
        return uri;

    }catch(err){

        console.log('In getImageURI',err);
    }
    
}

// const dataUri = req => dURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = {
    multerUploads,
    getImageURI
}