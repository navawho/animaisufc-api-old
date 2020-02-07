const db = require('../../database/pool');

class Dog {
  async getDogs() {
    const dogs = db.query(
      `select d.id, d.file_id, f.name file_name, f.path file_path, f.url file_url, d.name, d.description, d.sex from dog d join file f on d.file_id=f.id`
    );

    return dogs;
  }

  async getDogById(id) {
    const dog = db.query(
      `select d.id, d.file_id, f.name file_name, f.path file_path, f.url file_url, d.name, d.description, d.sex from dog d join file f on d.file_id=f.id where d.id=${id}`
    );

    return dog;
  }

  async create(name, description, sex) {
    const dog = db.query(
      `insert into Dog (name, description, sex)
      values ('${name}', '${description}', '${sex}')
      returning name, description, sex`
    );

    return dog;
  }
}

export default Dog;
