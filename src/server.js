import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import Router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { DOMAIN_FRONT, UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({
  origin: DOMAIN_FRONT,
  credentials: true
}));
  app.use(cookieParser());
  app.use('/api', Router);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
