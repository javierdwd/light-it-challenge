import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import sanitize from 'sanitize-filename';

const uploadDir = path.resolve(__dirname, '../../uploads');

import { type MulterFile } from '@/types/Multer';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const fileHash = crypto.randomBytes(16).toString('hex');
    // Sanitize filename using the sanitize-filename library
    const sanitizedName = sanitize(file.originalname);
    const fileName = `${fileHash}-${sanitizedName}`;
    cb(null, fileName);
  },
});

const fileFilter = (_req: Request, file: MulterFile, cb: FileFilterCallback) => {
  // Accept images only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});
