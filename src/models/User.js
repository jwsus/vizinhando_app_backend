import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  zip_code: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  city: {
    type: String,
  },
  neighborhod: {
    type: String,
  },
  street: {
    type: String,
  },
  number: {
    type: Number,
  },
  telefone: {
    type: String,
  },
  complement: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String
  }
},{
  timeStamps: true,
});

export default model('User', UserSchema)
