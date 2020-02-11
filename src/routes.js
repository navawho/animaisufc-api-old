import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import AnimalController from './app/controllers/AnimalController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/animals', AnimalController.index);
routes.get('/animals/:id', AnimalController.indexById);

routes.get('/animals/dogs', AnimalController.indexDogs);
routes.get('/animals/cats', AnimalController.indexCats);

routes.post('/animals', AnimalController.store);

export default routes;
