import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const userExists = await User.getUserByEmail(email);

    if (userExists.rowCount === 1) {
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

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const { rows } = await User.getUserById(req.userId);

    const user = rows[0];

    if (email !== user.email) {
      const userExists = await User.getUserByEmail(email);

      if (userExists.rowCount === 1) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }

    if (
      oldPassword &&
      !(await User.checkPassword(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ error: 'As senhas não correspondem.' });
    }

    const { id, name, admin } = await User.update(req.userId, req.body.name);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
