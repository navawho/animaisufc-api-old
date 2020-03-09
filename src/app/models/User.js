import bcrypt from 'bcryptjs';

const db = require('../../database/pool');

class User {
  async create(json) {
    const { name, email, phone, admin, password_hash } = json;

    const { rows } = await db.query(
      `insert into users (name, email, password_hash) values ('${name}', '${email}', '${password_hash}') returning id`
    );

    const userId = rows[0].id;

    if (phone) {
      await db.query(`update users set phone='${phone}' where id=${userId}`);
    }

    if (admin) {
      await db.query(`update users set admin=${admin} where id=${userId}`);
    }

    const user = await db.query(
      `select id, name, email, phone, admin from users where id=${userId}`
    );

    return user;
  }

  async getUsers() {
    const users = await db.query(`select id, name, email, admin from users`);

    return users;
  }

  async getUserById(id) {
    const user = await db.query(
      `select id, name, email, admin from users where id=${id}`
    );

    return user;
  }

  async deleteUserById(id) {
    const user = await db.query(
      `delete from users where id=${id} returning id, name, email, admin`
    );

    return user;
  }

  async getUserByEmail(email) {
    const user = await db.query(
      `select id, name, email, admin, password_hash from users where email='${email}'`
    );

    return user;
  }

  async hashPassword(password) {
    const password_hash = await bcrypt.hash(password, 8);

    return password_hash;
  }

  async checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }

  async update(json) {
    const { id, name, email, phone, password_hash } = json;

    if (name) {
      await db.query(`update users set name='${name}' where id=${id}`);
    }

    if (email) {
      await db.query(`update users set email='${email}' where id=${id}`);
    }

    if (phone) {
      await db.query(`update users set phone='${phone}' where id=${id}`);
    }

    if (password_hash) {
      await db.query(
        `update users set password_hash='${password_hash}' where id=${id}`
      );
    }

    const user = await db.query(
      `select id, name, email, phone, admin from users where id=${id}`
    );

    return user;
  }
}

export default new User();
