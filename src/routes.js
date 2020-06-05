import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import AnimalController from './app/controllers/AnimalController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/animals', AnimalController.index);
routes.get('/animals/:id', AnimalController.indexById);
routes.get('/dogs', AnimalController.indexDogs);
routes.get('/cats', AnimalController.indexCats);

routes.get('/files', FileController.index);
routes.get('/files/:id', upload.single('file'), FileController.indexById);

routes.post('/animals', AnimalController.store);
routes.put('/animals/:id', AnimalController.update);
routes.delete('/animals/:id', AnimalController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
