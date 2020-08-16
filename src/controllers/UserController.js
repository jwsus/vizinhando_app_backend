import User from '../models/User';

class UserController {
  async store(req, res) {

    //checa se ja existe o email cadastrado
    const userExists = await User.findOne({email: req.body.email});

    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado'});
    }

    //passa todo o body pois o model ja define os campos a serem usados
    //++caso adicione um campo extra não sera cadastrado
    //--caso não coloque um campo este não sera cadastrado
    const { id, nome, email, privilegios } = await User.create(req.body);

    return res.json({
      id,
      nome,
      email,
      privilegios
    });
  }
};

export default new UserController;
