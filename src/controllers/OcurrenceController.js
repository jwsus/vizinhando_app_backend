import Ocurrence from '../models/Ocurrence';

import User from '../models/User';

class OcurrenceController {
  async store(req, res) {
   
    const OcurrenceOk = new Ocurrence(req.body);

    const invalidSchema = new Array();

    if(OcurrenceOk.description == '' || OcurrenceOk.description == null ){
      invalidSchema.push('description');
    }
    if(OcurrenceOk.zip_code == '' || OcurrenceOk.zip_code == null ){
      invalidSchema.push('zip_code');
    }
    if(OcurrenceOk.street == '' || OcurrenceOk.street == null ){
      invalidSchema.push('street');
    }
    if(OcurrenceOk.neighborhood == '' || OcurrenceOk.neighborhood == null ){
      invalidSchema.push('neighborhood');
    }
    if(OcurrenceOk.city == '' || OcurrenceOk.city == null ){
      invalidSchema.push('city');
    }
    if(OcurrenceOk.type == '' || OcurrenceOk.type == null ){
      invalidSchema.push('type');
    }
    if(OcurrenceOk.ocurred_at == '' || OcurrenceOk.ocurred_at == null ){
      invalidSchema.push('ocurred_at');
    }
    if(OcurrenceOk.latitude == '' || OcurrenceOk.latitude == null ){
      invalidSchema.push('latitude');
    }
    if(OcurrenceOk.longitude == '' || OcurrenceOk.longitude == null ){
      invalidSchema.push('longitude');
    }
    if(OcurrenceOk.anonymous == null){
      invalidSchema.push('anonymous');
    }

    if(invalidSchema.length > 0){
      return res.status(400).json({error: `Campos obrigatórios não preenchidos :${invalidSchema}`});
    }
    
    req.body.user_id = req.userId;
    // req.body.user_name = req.userName;

    const OcurrenceCreate = await Ocurrence.create(req.body);

    return res.status(200).json();
  }

  async show(req, res) {
    if (req.query.id) {

      try {

        const ocurrence = await Ocurrence.find({_id: req.query.id});

        if (!ocurrence) {
          return res.status(200).json();
        }

        if (req.userId  !== ocurrence[0].user_id){
          console.log(ocurrence[0].user_id);
          console.log(req.userId);
          return res.status(401).json();
        }

        return res.status(200).json(ocurrence);

      } catch (error) {
        return res.status(501).json();
      }
    }
    else {
      const ocurrence = await Ocurrence.find();
      if (!ocurrence) {
        return res.status(400).json();
      }
  
      //convertendo model de ocorrencias para JSON 
      // para remover e adicionar campos
      const ocurrenceAux = JSON.stringify(ocurrence);
      const ocurrenceJson = JSON.parse(ocurrenceAux);
  
      for(var key in ocurrenceJson){
        const { name } = await User.findOne({_id: ocurrence[key].user_id});
    
        if (ocurrenceJson[key].anonymous == false) {
          ocurrenceJson[key].user_name = name;
        }
  
        if (ocurrenceJson[key].anonymous == true) {
          delete ocurrenceJson[key].user_id;
          delete ocurrenceJson[key].user_name;
        }
  
        delete ocurrenceJson[key].__v;
        ocurrenceJson[key].ocurred_at = Date.parse(ocurrenceJson[key].ocurred_at);
      }
  
      return res.status(200).json(ocurrenceJson);
    };

  };

  //retorna todas as ocorrencias do usuário
  async me(req, res) {
    const ocurrence = await Ocurrence.find({user_id: req.userId });

    if (ocurrence.length == 0) {
      return res.status(404).json({message: 'nenhuma ocorrencia encontrada'})
    }
    console.log(ocurrence.length)
  
    return res.status(200).json(ocurrence);
  }
}

export default new OcurrenceController;