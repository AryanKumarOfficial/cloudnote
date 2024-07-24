import multer from 'multer';
import path from 'path';

// Ensure that the 'uploads' directory exists or create it

const storage = multer.diskStorage({
    destination: function (req, file: Express.Multer.File, cb) {
        cb(null, path.join(process.cwd(), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({storage});
