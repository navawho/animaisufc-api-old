const db = require('../client');

async function ageTrigger() {
  await db.connect();

  await db.query(`create function age_animal() returns trigger as $$
  begin
  update animal set age = age(current_date, birth) where id=new.id;
  return new;
  end; $$
  language plpgsql;`);

  await db.query(`create trigger age_animal_insert
  after insert on animal
  for each row
  execute procedure age_animal();`);

  await db.query(`create trigger age_animal_update
  after update of birth on animal
  for each row
  execute procedure age_animal();`);

  await db.end();
}

ageTrigger();
