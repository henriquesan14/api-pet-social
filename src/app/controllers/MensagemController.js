import ConversaRepository from '../repositories/ConversaRepository';
import MensagemRepository from '../repositories/MensagemRepository';

class MensagemController {
    async index(req, res){
        const conversa = await ConversaRepository.getById(req.params.id);
        if(!conversa){
            return res.status(404).json({error: `Conversa de id ${req.params.id} não foi encontrada`});
        }
        const mensagens = await MensagemRepository.getMensagens(req.query.size, req.query.page, conversa.id);
        return res.json(mensagens);
    }


    async store(req, res){
        if(req.userId == req.body.pet2_id){
            return res.status(400).json({error: 'Mensagem não pode ser enviada para o mesmo pet'});
        }
        let conversa = await ConversaRepository.getById(req.body.conversa_id);
        if(!conversa){
            conversa = await ConversaRepository.save({
                lastMessage: req.body.message,
                pet1_id: req.userId,
                pet2_id: req.body.pet2_id
            });
        }
        const mensagem = await MensagemRepository.save({
            message: req.body.message,
            pet_id: req.userId,
            conversa_id: conversa.id
        });
        return res.json(mensagem);
    }
}

export default new MensagemController();
