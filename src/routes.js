import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import AnimalController from './app/controllers/AnimalController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/animals', AnimalController.index);
routes.get('/animals/:id', AnimalController.indexById);
routes.get('/dogs', AnimalController.indexDogs);
routes.get('/cats', AnimalController.indexCats);
routes.post('/animals', AnimalController.store);

routes.get('/files', FileController.index);
routes.get('/files/:id', upload.single('file'), FileController.indexById);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
