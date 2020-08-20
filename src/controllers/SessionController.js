import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const pass = await User.findOne({ password });

    if (!user) {
      return res.status(401).json();
    }

    if (!pass) {
      return res.status(401).json();
    }

    const { id, name} = user;

    return res.json({
      // user: {
      //   _id,
      //   name,
      //   email
      // },
      //1 parametro payload, 2 hash, 3 expiração
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, 
      }),
    })
  }
}

export default new SessionController;
