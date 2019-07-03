import User from '../models/User';
import File from '../models/File';

class Providers {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new Providers();
