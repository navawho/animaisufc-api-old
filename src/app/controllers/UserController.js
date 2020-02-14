import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const userExists = await User.getUserByEmail(email);

    if (userExists.rowCount === 1) {
      return res
        .status(400)
        .json({ error: 'O e-mail especificado já está cadastrado.' });
    }

    const password_hash = await bcrypt.hash(password, 8);

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
