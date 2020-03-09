const db = require('../../database/pool');

class File {
  async create(name, path) {
    const file = db.query(
      `insert into files (name, path) values ('${name}', '${path}') returning *`
    );

    return file;
  }

  async getFiles() {
    const files = db.query(`select id, name, path from files`);

    return files;
  }

  async getFileById(id) {
    const file = db.query(`select id, name, path from files where id=${id}`);

    return file;
  }
}

export default new File();
