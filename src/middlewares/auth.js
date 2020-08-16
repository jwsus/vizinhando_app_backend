import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

export default async (req, res, next) => {
  //token é passado junto ao header na variavel authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não encontrado'})
  };

  //o retorno do token é bearer token
  //desse modo separamos a string pelo espaço e pegamos apenas o token
  const [, token] = authHeader.split(' ');

  try {

    //decodifica o token usando a chave secreta "authConfig.secret"
    //extraindo o que tinha sido passado no payload do token, nesse caso o "id"
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();

  } catch (error) {
    return res.status(401).json({ error: 'Token inválido'})
  }
};