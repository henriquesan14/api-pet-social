import Amizade from '../models/Amizade';
import Pet from '../models/Pet';
import { Op } from 'sequelize';

class AmizadeController {
    async index(req, res){
        const amizades = await Amizade.findAll({
            where: {
                [Op.or]: [{pet_id: req.userId}, {pet2_id: req.userId}],
                aceite: true
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
        })
        amizades.map((a) => {
            a.amizade = req.userId != a.pet.id ? a.pet : a.pet2;
            return a;
        });
        return res.json(amizades);
    }

    async remove(req, res){
        const amizade = await Amizade.findByPk(req.params.id);
        if(!amizade){
            return res.status(404).json({error: `Amizade de id ${req.params.id} não encontrada`});
        }
        if(req.userId != amizade.pet_id && req.userId != amizade.pet2_id){
            return res.status(400).json({error: 'Você não pode desfazer amizade que não pertencem a você'});
        }
        await amizade.destroy();
        return res.status(204).json();
    }

}

export default new AmizadeController();
