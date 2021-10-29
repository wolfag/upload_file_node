import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const FOLDER = 'images';

const imgUploader = multer({ dest: `${FOLDER}/` });
const router = Router();

router.post('/avatar', imgUploader.single('avatar'), (req, res) => {
  const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
  const orgName = (processedFile.originalname || '').trim().replace(/ /g, '-'); // Tên gốc trong máy tính của người upload
  const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
  // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
  const newFullPath = `${fullPathInServ}-${orgName}`;
  fs.renameSync(fullPathInServ, newFullPath);
  res.send({
    status: true,
    message: 'file uploaded',
    fileNameInServer: newFullPath,
  });
});

router.get('/avatar/:name', (req, res) => {
  const fileName = req.params.name;
  console.log('fileName', fileName);
  if (!fileName) {
    return res.send({
      status: false,
      message: 'no filename specified',
    });
  }
  console.log('---->', path.resolve(`./${FOLDER}/${fileName}`));
  res.sendFile(path.resolve(`./${FOLDER}/${fileName}`));
});

export default router;
