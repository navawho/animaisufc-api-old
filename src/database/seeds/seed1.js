const db = require('../client');

async function seedTables() {
  await db.connect();

  await db.query(`insert into File (name, path) values ('rick.jpeg', '78f93667ccba2aa91df065118968a795.jpeg')`);

  await db.query(`insert into animal (file_id, name, type, description, sex, birth) values
  (1, 'Xana', 'g', 'top', 'f', '2007-04-19'),
  (1, 'Oreo', 'g', 'top', 'm', '2009-02-14'),
  (1, 'Zara', 'g', 'top', 'f', '2019-10-25'),
  (1, 'Loki', 'g', 'top', 'm', '2019-02-01'),
  (1, 'Rick', 'c', 'top', 'm', '2013-04-19'),
  (1, 'Rex', 'c', 'top', 'm', '2003-02-14'),
  (1, 'Luna', 'c', 'top', 'f', '2019-11-25'),
  (1, 'Luke', 'c', 'top', 'm', '2019-02-01');`);

  await db.end();
}

seedTables();
