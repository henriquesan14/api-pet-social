import Conversa from '../models/Conversa';
import Pet from '../models/Pet';
import { Op } from 'sequelize';

class ConversaController {
    async index(req, res){
        const conversas = await Conversa.findAll({
            where: {
                [Op.or]: [{pet1_id: req.userId}, {pet2_id: req.userId}],
            },
            order: [['created_at', 'DESC']],
            attributes: ['id', 'lastMessage', 'created_at'],
            include: [
                {
                    model: Pet,
                    as: 'pet1',
                    attributes: ['id', 'firstName', 'lastName', 'avatar']
                },
                {
                    model: Pet,
                    as: 'pet2',
                    attributes: ['id', 'firstName', 'lastName', 'avatar']
                },
            ]
        });

        return res.json(conversas);
    }

    async remove(req, res){
        const conversa = await Conversa.findByPk(req.params.id);
        if(!conversa){
            return res.status(404).json({error: `Conversa de id ${req.params.id} não encontrada`});
        }
        await conversa.destroy();
        return res.status(204).json();
    }
}

export default new ConversaController();
