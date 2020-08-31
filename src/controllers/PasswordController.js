import User from '../models/User';

import nodemailer from 'nodemailer';

class PasswordController {
  async store(req, res) {

    const email = req.query.email;

    const userExists = await User.findOne({email: email});

    if (userExists){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'd.e.v.email.use@gmail.com',
          pass: 'dev12345678email'
        }
      });
  
      var mailOptions = {
        from: 'd.e.v.email.use@gmail.com',
        to: email,
        subject: 'Recuperação de senha',
        text: userExists.password
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado');
        }
      });
    }
   
    return res.status(200).json();
  }
}

export default new PasswordController;