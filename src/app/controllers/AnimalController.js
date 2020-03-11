import Animal from '../models/Animal';

class AnimalController {
  async index(req, res) {
    const { rows } = await Animal.getAnimals();

    return res.json(rows);
  }

  async indexDogs(req, res) {
    const { rows } = await Animal.getDogs();

    return res.json(rows);
  }

  async indexCats(req, res) {
    const { rows } = await Animal.getCats();

    return res.json(rows);
  }

  async indexById(req, res) {
    const { id } = req.params;

    const { rows } = await Animal.getAnimalById(id);

    return res.json(rows[0]);
  }

  async store(req, res) {
    const { rows } = await Animal.createAnimal(req.body);

    return res.json(rows[0]);
  }

  async update(req, res) {
    const { rows } = await Animal.update(req.params.id, req.body);

    return res.json(rows[0]);
  }

  async delete(req, res) {
    const { rows } = await Animal.delete(req.params.id);

    return res.json(rows[0]);
  }
}

export default new AnimalController();
