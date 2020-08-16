import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({  email });

    const pass = await User.findOne({ senha });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado'});
    }

    if (!pass) {
      return res.status(401).json({ error: 'Senha não bate'});
    }

    const { id, nome} = user;

    return res.json({
      user: {
        id,
        nome,
        email
      },
      //1 parametro payload, 2 hash, 3 expiração
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, 
      }),
    })
  }
}

export default new SessionController;
