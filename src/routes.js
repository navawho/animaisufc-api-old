const Router = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const CatController = require('./app/controllers/CatController');
const DogController = require('./app/controllers/DogController');
const FileController = require('./app/controllers/FileController');

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/cats', CatController.index);
routes.get('/cats/:id', CatController.indexById);
routes.post('/cats', CatController.store);

routes.get('/dogs', DogController.index);
routes.get('/dogs/:id', DogController.indexById);
routes.post('/dogs', DogController.store);

routes.get('/files', FileController.index);
routes.get('/files/:id', upload.single('file'), FileController.indexById);
routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
