import Amizade from '../models/Amizade';
import Pet from '../models/Pet';

class SolicitacaoRepository {
    async checkSolicitacao(idPet, idPetLogado){
        const solicitacao = await Amizade.findOne({
            where: {
                pet_id: idPetLogado,
                pet2_id: idPet,
                aceite: false
              }
        });
        return solicitacao;
    }

    async getSolicitacoes(idPetLogado){
        const solicitacoes = await Amizade.findAll({
            where: {
                pet2_id: idPetLogado,
                aceite: false
            },
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Pet,
                    as: 'pet',
                    attributes: [
                        'id', 'firstName', 'lastName', 'avatar'
                    ]
                },
                {
                    model: Pet,
                    as: 'pet2',
                    attributes: [
                        'id', 'firstName', 'lastName', 'avatar'
                    ]
                }
            ],
            attributes: ['id', 'aceite']
        });
        return solicitacoes
    }

    async getById(id){
        const solicitacao = await Amizade.findOne(
            {
                where: {
                    id: id,
                    aceite: false
                }
            }
        );
        return solicitacao;
    }

    async sendSolicitacao(solicitacao){
        return await Amizade.create(solicitacao);
    }

}

export default new SolicitacaoRepository();