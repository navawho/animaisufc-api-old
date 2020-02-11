const db = require('../client');

async function seedTables() {
  await db.connect();

  await db.query(`insert into File (name, path) values ('rick.jpeg', '78f93667ccba2aa91df065118968a795.jpeg')`);

  await db.query(`insert into animal (file_id, type, name, description, sex, birth, color) values
  (1, 'Xana', 'g', 'top', 'f', '2007-04-19', 'Preto e branco'),
  (1, 'Oreo', 'g', 'top', 'm', '2009-02-14', 'Preto e branco'),
  (1, 'Zara', 'g', 'top', 'f', '2019-10-25', 'Siamês'),
  (1, 'Loki', 'g', 'top', 'm', '2019-02-01', 'Pintado'),
  (1, 'Rick', 'c', 'top', 'm', '2013-04-19', 'Pequeno', 'Branco e marrom'),
  (1, 'Rex', 'c', 'top', 'm', '2003-02-14', 'Pequeno', 'Marrom'),
  (1, 'Luna', 'c', 'top', 'f', '2019-11-25', 'Grande', 'Preto e branco'),
  (1, 'Luke', 'c', 'top', 'm', '2019-02-01', 'Médio', 'Branco');`);

  await db.end();
}

seedTables();
