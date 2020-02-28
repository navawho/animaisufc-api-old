const db = require('../client');

async function createTables() {
  await db.connect();

  await db.query(`set timezone = 'UTC+3'`);

  await db.query(`create table files (
    id serial primary key not null,
    name varchar not null,
    path varchar not null unique,
    url varchar unique,
    created_at timestamptz default current_timestamp not null,
    updated_at timestamptz default null
    );`);

  await db.query(`create table animals (
    id serial primary key not null,
    file_id integer references files(id) on update cascade on delete set null,
    type varchar(1) not null check (type ILIKE 'c' or type ILIKE 'g'),
    name varchar not null,
    description varchar not null,
    sex varchar(1) not null check (sex ILIKE 'm' or sex ILIKE 'f'),
    adopted bool default false not null,
    birth date,
    age varchar,
    color varchar,
    port varchar,
    created_at timestamptz default current_timestamp not null,
    updated_at timestamptz default null
    );`);

  await db.query(`create table users (
      id serial primary key not null,
      name varchar not null,
      email varchar not null unique,
      phone varchar,
      password_hash varchar not null,
      admin bool default false not null,
      created_at timestamptz default current_timestamp not null,
      updated_at timestamptz default null
      );`);

  await db.end();
}

createTables();
