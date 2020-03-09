import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string()
        .required()
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      phone: Yup.string().min(11),
      admin: Yup.bool(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, phone, admin, email, password } = req.body;

    const userExists = await User.getUserByEmail(email);

    if (userExists.rowCount === 1) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (admin === true) {
      return res.status(400).json({ error: 'Insuficient permissions' });
    }

    const password_hash = await User.hashPassword(password);

    const { rows } = await User.create({
      name,
      email,
      phone,
      admin,
      password_hash,
    });

    const { id } = rows[0];

    return res.json({
      id,
      name,
      phone,
      email,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.number().min(10),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const { userId } = req;

    const { rows: userRows } = await User.getUserById(userId);

    const user = userRows[0];

    if (email && email !== user.email) {
      const userExists = await User.getUserByEmail(email);

      if (userExists.rowCount >= 1) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }

    if (
      oldPassword &&
      !(await User.checkPassword(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ error: 'As senhas não correspondem.' });
    }

    const { name, admin, phone, password } = req.body;

    if (admin) {
      return res.status(400).json({ error: 'Insuficient permissions' });
    }

    const { rows } = await User.update({
      id: userId,
      password_hash: User.hashPassword(password),
      name,
      email,
      phone,
    });

    const userUpdated = rows[0];

    return res.json({
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
      phone: userUpdated.phone,
      admin: userUpdated.admin,
    });
  }

  async index(req, res) {
    const { rows } = await User.getUsers();

    return res.json(rows);
  }

  async indexById(req, res) {
    const { rows } = await User.getUserById(req.userId);

    return res.json(rows[0]);
  }

  async remove(req, res) {
    const { rows } = await User.deleteUserById(req.userId);

    return res.json(rows[0]);
  }
}

export default new UserController();
