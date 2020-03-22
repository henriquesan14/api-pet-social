import Conversa from '../models/Conversa';
import Mensagen from '../models/Mensagen';
import Pet from '../models/Pet';
import * as Yup from 'yup';

class MensagemController {
    async index(req, res){
        const conversa = await Conversa.findByPk(req.params.id);
        if(!conversa){
            return res.status(404).json({error: `Conversa de id ${req.params.id} não foi encontrada`});
        }
        const mensagens = await Mensagen.findAll({
            where: {
                conversa_id: conversa.id
            },
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Pet,
                    as: 'pet',
                    attributes: ['id', 'firstName', 'lastName', 'avatar']
                }
            ],
            attributes: ['id', 'message', 'created_at']
        });

        return res.json(mensagens);
    }


    async store(req, res){
        const schema = Yup.object().shape({
            message: Yup.string().required(),
            pet2_id: Yup.number().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Message é obrigatório'});
        }
        if(req.userId == req.body.pet2_id){
            return res.status(400).json({error: 'Mensagem não pode ser enviada para o mesmo pet'});
        }
        let conversa = await Conversa.findByPk(req.body.conversa_id);
        if(!conversa){
            conversa = await Conversa.create({
                lastMessage: req.body.message,
                pet1_id: req.userId,
                pet2_id: req.body.pet2_id
            });
        }
        const mensagem = await Mensagen.create({
            message: req.body.message,
            pet_id: req.userId,
            conversa_id: conversa.id
        });
        return res.json(mensagem);
    }
}

export default new MensagemController();
