import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import authAdminMiddleware from './app/middlewares/authAdmin';

import FileController from './app/controllers/FileController';
import AnimalController from './app/controllers/AnimalController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/animals', AnimalController.index);
routes.get('/animals/:id', AnimalController.indexById);
routes.get('/dogs', AnimalController.indexDogs);
routes.get('/cats', AnimalController.indexCats);

routes.get('/files', FileController.index);
routes.get('/files/:id', upload.single('file'), FileController.indexById);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/notifications', NotificationController.index);

routes.use(authMiddleware);

routes.get('/users', UserController.indexById);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.remove);

routes.use(authAdminMiddleware);

routes.post('/animals', AnimalController.store);
routes.put('/animals/:id', AnimalController.update);
routes.delete('/animals/:id', AnimalController.delete);

routes.post('/notifications', NotificationController.store);
routes.delete('/notifications/:id', NotificationController.remove);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
