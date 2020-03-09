const db = require('../client');

async function ageTrigger() {
  await db.connect();

  await db.query(`create or replace function age_animal() returns trigger as $$
	declare
  	ageinterval interval :=	age(current_date, new.birth);
  	years double precision := EXTRACT(years FROM ageinterval);
    months double precision := EXTRACT(months FROM ageinterval);
  begin
  case
  	when years = 0 then
    	case
      	when months = 1 then
      		update animals set age = concat(months, ' mês') where id=new.id;
      	else
      		update animals set age = concat(months, ' meses') where id=new.id;
       end case;
  	when years = 1 then
    	case
      	when months = 0 then
      		update animals set age = concat(years, ' ano') where id=new.id;
      	when months = 1 then
      		update animals set age = concat(years, ' ano e ', months, ' mês') where id=new.id;
        else
        	update animals set age = concat(years, ' ano e ', months, ' meses') where id=new.id;
      end case;
    else
    	case
      	when months = 0 then
        	update animals set age = concat(years, ' anos') where id=new.id;
        when months = 1 then
        	update animals set age = concat(years, ' anos e ', months, ' mês') where id=new.id;
        else
        	update animals set age = concat(years, ' anos e ', months, ' meses') where id=new.id;
      end case;
  end case;
  return new;
  end; $$
  language plpgsql;`);

  await db.query(`create trigger age_animal_insert
  after insert on animals
  for each row
  execute procedure age_animal();`);

  await db.query(`create trigger age_animal_update
  after update of birth on animals
  for each row
  execute procedure age_animal();`);

  await db.end();
}

ageTrigger();
