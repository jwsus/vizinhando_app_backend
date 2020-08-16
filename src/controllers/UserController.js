import User from '../models/User';

export default {
  async store(req, res) {
    const { 
      nome, 
      email, 
      cep, 
      coordenada, 
      cidade, 
      bairro,
      rua,
      numero,
      complemento,
      telefone,
      status,
      privilegios,
    } = req.body;

    const user = await User.create({
      nome: nome,
      email: email,
      cep: cep,
      coordenada: coordenada,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: numero,
      complemento: complemento,
      telefone: telefone,
      status: status,
      privilegios: privilegios
    });

    return res.json(user);
  }
}
