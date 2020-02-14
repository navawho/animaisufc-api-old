import bcrypt from 'bcryptjs';

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

  async hashPassword(password) {
    const password_hash = await bcrypt.hash(password, 8);

    return password_hash;
  }

  async checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }

  async update(id, _name, _email, _newPassword) {
    if (_name) {
      if (_email) {
        if (_newPassword) {
          const user = db.query(
            `update users set password_hash = '${_newPassword}', name = '${_name}', email = '${_email}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
          );

          return user;
        }
        const user = db.query(
          `update users set name = '${_name}', email = '${_email}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
        );

        return user;
      }
      if (_newPassword) {
        const user = db.query(
          `update users set password_hash = '${_newPassword}', name = '${_name}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
        );

        return user;
      }
      const user = db.query(
        `update users set name = '${_name}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
      );

      return (await user).rows[0];
    }
    if (_email) {
      if (_newPassword) {
        const user = db.query(
          `update users set password_hash = '${_newPassword}', email = '${_email}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
        );

        return user;
      }
      const user = db.query(
        `update users set email = '${_email}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
      );

      return user;
    }
    if (_newPassword) {
      const user = db.query(
        `update users set password_hash = '${_newPassword}' where id='${id}' returning id, name, email, password_hash, admin, created_at, updated_at`
      );

      return user;
    }
    return null;
  }
}

export default new User();
