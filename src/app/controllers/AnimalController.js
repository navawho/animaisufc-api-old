import Animal from '../models/Animal';

const animal = new Animal();

class AnimalController {
  async index(req, res) {
    const { rows } = await animal.getAnimals();

    return res.json(rows);
  }

  async indexDogs(req, res) {
    const { rows } = await animal.getDogs();

    return res.json(rows);
  }

  async indexCats(req, res) {
    const { rows } = await animal.getCats();

    return res.json(rows);
  }

  async indexById(req, res) {
    const { id } = req.params;

    const { rows } = await animal.getAnimalById(id);

    return res.json(rows[0]);
  }

  async store(req, res) {
    const { name, description, sex } = req.body;

    const { rows } = await animal.createAnimal(type, name, description, sex);

    return res.json(rows[0]);
  }
}

export default new AnimalController();
