const db = require('../../database/pool');

class Animal {
  async getAnimals() {
    const animals = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.port, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animals a join files f on a.file_id=f.id`
    );

    return animals;
  }

  async getDogs() {
    const dogs = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.port, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animals a join files f on a.file_id=f.id where a.type ILIKE 'c'`
    );

    return dogs;
  }

  async getCats() {
    const cats = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.port, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animals a join files f on a.file_id=f.id where a.type ILIKE 'g'`
    );

    return cats;
  }

  async getAnimalById(id) {
    const animal = db.query(
      `select a.id, a.type, a.name, a.sex, a.age, a.color, a.port, a.description, a.file_id, f.name file_name, f.path file_path, f.url file_url from animals a join files f on a.file_id=f.id where a.id=${id}`
    );

    return animal;
  }

  async createAnimal(json) {
    const { type, name, description, sex, color, birth, port } = json;

    const { rows } = await db.query(
      `insert into animals (type,  name, description, sex)
      values ('${type}', '${name}', '${description}', '${sex}')
      returning id`
    );

    const id = rows[0].id;

    if (color) {
      await db.query(`update animals set color='${color}' where id=${id}`);
    }

    if (birth) {
      await db.query(`update animals set birth='${birth}' where id=${id}`);
    }

    if (port) {
      await db.query(`update animals set port='${port}' where id=${id}`);
    }

    const animal = await db.query(`select * from animals where id=${id}`);

    return animal;
  }

  async update(id, json) {
    const { type, name, description, sex, color, birth, port } = json;

    if (type) {
      await db.query(`update animals set type='${type}' where id=${id}`);
    }

    if (name) {
      await db.query(`update animals set name='${name}' where id=${id}`);
    }

    if (description) {
      await db.query(`update animals set description='${description}' where id=${id}`);
    }

    if (sex) {
      await db.query(`update animals set sex='${sex}' where id=${id}`);
    }

    if (color) {
      await db.query(`update animals set color='${color}' where id=${id}`);
    }

    if (birth) {
      await db.query(`update animals set birth='${birth}' where id=${id}`);
    }

    if (port) {
      await db.query(`update animals set port='${port}' where id=${id}`);
    }

    const animal = await db.query(`select * from animals where id=${id}`);

    return animal;
  }

  async delete(id) {
    const animal = await db.query(`delete from animals where id=${id} returning *`);

    return animal;
  }
}

export default new Animal();
