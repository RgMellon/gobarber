import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/session', SessionsController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

// o file dentro de single é o nome do campo no form.
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
