import ConversaRepository from '../repositories/ConversaRepository';

class ConversaController {
    async index(req, res){
        const conversas = await ConversaRepository.getConversas(req.userId);
        return res.json(conversas);
    }

    async remove(req, res){
        const conversa = await ConversaRepository.getById(req.params.id);
        if(!conversa){
            return res.status(404).json({error: `Conversa de id ${req.params.id} não encontrada`});
        }
        await conversa.destroy();
        return res.status(204).json();
    }
}

export default new ConversaController();
