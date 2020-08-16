import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cep: {
    type: String
  },
  cordenada: {
    type: String,
  },
  cidade: {
    type: String,
  },
  bairro: {
    type: String,
  },
  rua: {
    type: String,
  },
  numero: {
    type: String,
  },
  telefone: {
    type: String,
  },
  status: {
    type: String,
  },
  privilegios: {
    type: String,
  },
},{
  timeStamps: true,
});

export default model('User', UserSchema)
