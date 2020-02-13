const db = require('../client');

async function createTables() {
  await db.connect();

  await db.query(`set timezone = 'UTC+3'`);

  await db.query(`create table File (
    id serial primary key not null,
    name varchar not null,
    path varchar not null unique,
    url varchar unique,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default null
    );`);

  await db.query(`create table Animal (
    id serial primary key not null,
    file_id integer references File(id) on update cascade on delete set null,
    type varchar(1) not null check (type ILIKE 'c' or type ILIKE 'g'),
    name varchar not null,
    description varchar not null,
    sex varchar(1) not null check (sex ILIKE 'm' or sex ILIKE 'f'),
    adopted bool default false,
    birth date,
    age varchar,
    color varchar,
    port varchar,
    created_at timestamptz default current_timestamp,
    updated_at timestamptz default null
    );`);

  await db.end();
}

createTables();
