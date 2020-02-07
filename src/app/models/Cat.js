const db = require('../../database/pool');

class Cat {
  async getCats() {
    const cats = db.query(
      `select c.id, c.file_id, f.name file_name, f.path file_path, f.url file_url, c.name, c.description, c.sex from cat c join file f on c.file_id=f.id`
    );

    return cats;
  }

  async getCatById(id) {
    const cat = db.query(
      `select c.id, c.file_id, f.name file_name, f.path file_path, f.url file_url, c.name, c.description, c.sex from cat c join file f on c.file_id=f.id where c.id=${id}`
    );

    return cat;
  }

  async create(name, description, sex) {
    const dog = db.query(
      `insert into Cat (name, description, sex)
      values ('${name}', '${description}', '${sex}')
      returning name, description, sex`
    );

    return dog;
  }
}

export default Cat;
