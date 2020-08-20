import User from '../models/User';

class UserController {
  async store(req, res) {

    //checa se ja existe o email cadastrado
    const userExists = await User.findOne({email: req.body.email});

    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado'});
    }

    const userModel = new User(req.body).validateSync();

    if (userModel) {
      return res.status(500).json({ error: "Campos obrigatórios não preenchidos"})
    }

    const { id, nome, email, privilegios } = await User.create(req.body);

    return res.json({
      id,
      nome,
      email,
      privilegios
    });
  }

  async update(req, res) {
    const { email, password } = req.body;

    const user = await User.findById(req.userId);

    //caso esteja logado com o token de um user excluído
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado'});
    }

    //caso Oldpass esteja preenchido compara com a senha antiga
    // if (oldPassword) {
    //   if (oldPassword !== user.senha) {
    //     return res.status(401).json({ error: 'Senhas não batem'});
    //   }
    // }
    
    //caso o email esteja sendo alterado
    //checa se ja nao existe outro user com o mesmo email
    if (email !== user.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'E-mail ja cadastrado, ímpossivel alterar'});
      }
    }

    try {
      await user.updateOne(req.body);
    } catch (error) {
      res.status(500).send(err)
    }

    return res.json({id: req.userId});
  };

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.userId);
  
      if (!user) res.status(404).send("No item found")
        res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  }
};

export default new UserController;
