import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password_hash } = req.body;

    const user = await User.create(name, email, password_hash);

    return res.json(user);
  }
}

export default new UserController();
