import crypto from 'crypto';
import { extname, resolve } from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageS3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_AWS,
    secretAccessKey: process.env.SECRET_KEY_AWS,
    region: process.env.REGION
});

// const fileFilter = ;

export default {
    dest: resolve(__dirname, "..", "..", "files", "uploads"),
    storage: multerS3({
        s3: storageS3,
        bucket: 'avatars-provider/files-pet-social',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if(err) return cb(err);
                return cb(null, res.toString('hex') + extname(file.originalname));
            });
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif"
        ];
    
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type."));
        }
    }
}