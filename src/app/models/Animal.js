const db = require('../../database/pool');

class Animal {
  async getAnimals() {
    const animals = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animal a join file f on a.file_id=f.id`
    );

    return animals;
  }

  async getDogs() {
    const dogs = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animal a join file f on a.file_id=f.id where a.type ILIKE 'c'`
    );

    return dogs;
  }

  async getCats() {
    const cats = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animal a join file f on a.file_id=f.id where a.type ILIKE 'g'`
    );

    return cats;
  }

  async getAnimalById(id) {
    const animal = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animal a join file f on a.file_id=f.id where a.id=${id}`
    );

    return animal;
  }

  async createAnimal(type, name, description, sex, color, birth) {
    const animal = db.query(
      `insert into Animal (type, name, description, sex, color, birth)
      values ('${type}', '${name}', '${description}', '${sex}', '${color}', '${birth}')
      returning type, name, description, sex, color, birth`
    );

    return animal;
  }
}

export default Animal;
