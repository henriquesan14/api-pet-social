import Amizade from '../models/Amizade';

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
}

export default new SolicitacaoRepository();