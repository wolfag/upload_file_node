import express from 'express';
import cors from 'cors';

import fileService from './fileService';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ status: true });
});

app.use('/api/file', fileService);

app.listen(8080, () => {
  console.log('server start at 8080');
});
