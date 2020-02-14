import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (user.rowCount === 1) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const password_hash = await User.hashPassword(password);

    const { rows } = await User.create(name, email, password_hash);

    const { id, admin } = rows[0];

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
