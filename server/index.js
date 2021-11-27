import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import fileService from './fileService';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
  console.log('a', a);
  res.json({ status: true });
});

app.use('/api/file', fileService);

// catch endpoint is not found
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'fail',
  });
});

// catch err in function
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ status, message: err.message });
});

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
