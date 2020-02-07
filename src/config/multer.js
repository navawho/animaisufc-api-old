const multer = require('multer');
const crypto = require('crypto');
const extname = require('path').extname();
const resolve = require('path').resolve();

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // add caracteres aleatórios em hexadimal ao inicio do nome do arquivo
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
