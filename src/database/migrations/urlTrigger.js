const db = require('../client');

async function urlTrigger() {
  await db.connect();

  await db.query(`create function url() returns trigger as $$
  begin
  update file set url = concat('${process.env.API_URL}', path) where id=new.id;
  return new;
  end; $$
  language plpgsql;`);

  await db.query(`create trigger url_insert
  after insert on file
  for each row
  execute procedure url();`);

  await db.query(`create trigger url_update
  after update of path on file
  for each row
	execute procedure url();`);

  await db.end();
}

urlTrigger();
