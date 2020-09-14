import Ocurrence from '../models/Ocurrence';

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

    const OcurrenceCreate = await Ocurrence.create(req.body);

    // console.log(req.userId)

    return res.status(200).json();
  }

  async show(req, res) {
    const ocurrence = await Ocurrence.find({user_id: req.userId}, {user_id: 0});

    //convertendo model de ocorrencias para JSON 
    // para remover e adicionar campos
    const ocurrenceAux = JSON.stringify(ocurrence);

    const ocurrenceJson = JSON.parse(ocurrenceAux);

    for(var key in ocurrenceJson){

      if (ocurrenceJson[key].anonymous == false) {
        ocurrenceJson[key].user_name = req.userName;
        ocurrenceJson[key].user_id = req.userId;
        delete ocurrenceJson[key].anonymous;
        delete ocurrenceJson[key].__v;
      }
      ocurrenceJson[key].ocurred_at = Date.parse(ocurrenceJson[key].ocurred_at);
    }

    if (!ocurrence) {
      return res.status(400).json();
    }

    return res.status(200).json(ocurrenceJson);
  }
}

export default new OcurrenceController;