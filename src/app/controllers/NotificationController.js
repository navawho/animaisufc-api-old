import Notification from '../schemas/Notification';

class NotificationController {
  async store(req, res) {
    const { content } = req.body;

    const notification = await Notification.create({
      content,
    });

    return res.json(notification);
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
