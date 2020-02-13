const db = require('../../database/pool');

class User {
  async create(name, email, password_hash) {
    const file = db.query(
      `insert into users (name, email, password_hash) values ('${name}', '${email}', '${password_hash}') returning *`
    );

    return file;
  }

  async getUsers() {
    const users = db.query(`select * from users`);

    return users;
  }

  async getUserById(id) {
    const user = db.query(`select * from users where id=${id}`);

    return user;
  }

  async getUserByEmail(email) {
    const user = db.query(`select * from users where email='${email}'`);

    return user;
  }
}

export default new User();
