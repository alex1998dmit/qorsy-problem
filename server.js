const express = require('express');
const multer = require('multer');

const app = express();

// Define the storage location for the uploaded files
const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// Initialize multer middleware
const upload = multer({ storage });

// Define a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please attach a file')
        error.statusCode = 400;
        return next(error);
    }
    res.send('File uploaded successfully');
});

app.listen(3000, () => console.log('Server is started at port number 3000'));