import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProvidersController from './app/controllers/ProvidersController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/session', SessionsController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.get('/providers', ProvidersController.index);

// o file dentro de single é o nome do campo no form.
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

export default routes;
