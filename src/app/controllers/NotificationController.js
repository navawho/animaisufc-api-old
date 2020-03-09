import Notification from '../schemas/Notification';

import User from '../models/User';

import Mail from '../../lib/Mail';

class NotificationController {
  async store(req, res) {
    const { subject, content } = req.body;

    const user = req.params.id;

    const notification = await Notification.create({
      content,
      user,
      subject,
    });

    const { rows } = await User.getUserById(user);

    await Mail.sendMail({
      to: `${rows[0].name} <${rows[0].email}>`,
      subject: `${subject}`,
      text: `${content}`,
    });

    return res.json(notification);
  }

  async indexById(req, res) {
    const notifications = await Notification.find({
      user: req.userId,
    }).sort({ createdAt: 'desc' });

    return res.json(notifications);
  }

  async index(req, res) {
    const notifications = await Notification.find().sort({ createdAt: 'desc' });

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }

  async remove(req, res) {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    return res.json(notification);
  }
}

export default new NotificationController();
