import SolicitacaoRepository from '../repositories/SolicitacaoRepository'; 
import AmizadeRepository from '../repositories/AmizadeRepository'; 

class SolicitacaoAmizadeController {
    async index(req, res){
        const solicitacoes = await SolicitacaoRepository.getSolicitacoes(req.userId);
        return res.json(solicitacoes);
    }

    async store(req, res){
        if(!req.body.pet2_id){
            return res.status(400).json({error: 'Id do pet é obrigatório'});
        }
        if(req.userId == req.body.pet2_id){
            return res.status(400).json({error: 'Você não pode enviar solicitação para você mesmo'});
        }
        const checkAmizade = await  AmizadeRepository.checkAmizadeOrSolitacao(req.body.pet2_id, req.userId);
        if(checkAmizade){
            return res.status(400).json({error: 'Você já é amigo deste Pet ou já solicitou amizade dele'});
        }
        const solicitacao = {
            pet_id: req.userId,
            pet2_id: req.body.pet2_id
        };
        const { pet_id, pet2_id, aceite } = await SolicitacaoRepository.sendSolicitacao(solicitacao);
        return res.status(201).json({
            pet_id,
            pet2_id,
            aceite
        });
    }


    async update(req, res){
        const amizade = await AmizadeRepository.findAmizadeById(req.params.id);
        if(!amizade){
            return res.status(404).json({error: `Solicitação de id ${req.params.id} não encontrada`});
        }
        if(amizade.pet2_id != req.userId){
            return res.status(400).json({error: 'Você não aceitar solicitações que não pertencem a você'});
        }
        amizade.update({
            aceite: true
        })
        return res.status(204).json();
    }

    async remove(req, res){
        const solicitacao = await SolicitacaoRepository.getById(req.params.id);
        if(!solicitacao){
            return res.status(404).json({error: `Solicitação de id ${req.params.id} não encontrada`});
        }
        if(req.userId != solicitacao.pet2_id){
            return res.status(400).json({error: 'Você não pode recusar solicitação que não pertencem a você'});
        }
        await solicitacao.destroy();
        return res.status(204).json();
    }

}

export default new SolicitacaoAmizadeController();
