import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const multerMiddleware = (req, res, next) => {
    upload.single('attachment')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        next();
    });
};

export default multerMiddleware;
