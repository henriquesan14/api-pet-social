import Conversa from '../models/Conversa';
import Pet from '../models/Pet';
import { Op } from 'sequelize';

class ConversaRepository {
    async getConversas(idUserLogado){
        const conversas = await Conversa.findAll({
            where: {
                [Op.or]: [{pet1_id: idUserLogado}, {pet2_id: idUserLogado}],
            },
            order: [['created_at', 'DESC']],
            attributes: ['id', 'lastMessage', 'created_at'],
            include: [
                {
                    model: Pet,
                    as: 'pet1',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Pet,
                    as: 'pet2',
                    attributes: ['id', 'firstName', 'lastName']
                },
            ]
        });
        return conversas;
    }

    async save(conversa){
        return await Conversa.create(conversa);
    }

    async getById(id){
        return await Conversa.findByPk(id);
    }
}

export default new ConversaRepository();