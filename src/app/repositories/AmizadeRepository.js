import Amizade from '../models/Amizade'
import Pet from '../models/Pet';
import { Op } from 'sequelize';

class AmizadeRepository {
    async getAmizades(idPetLogado){
        const amizades = await Amizade.findAll({
            where: {
                [Op.or]: [{pet_id: idPetLogado}, {pet2_id: idPetLogado}],
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
        });
        amizades.map((a) => {
            a.amizade = idPetLogado != a.pet.id ? a.pet : a.pet2;
            return a;
        });
        return amizades;
    }

    async getAmizadesByPet(idPet){
        const amizades = await Amizade.findAll({
            where: {
                [Op.or]: [{pet_id: idPet}, {pet2_id: idPet}],
                aceite: true
            },
            attributes: ['id', 'pet_id', 'pet2_id']
        });
        return amizades;
    }

    async checkAmizade(idPet, idPetLogado){
        const checkAmizade = await Amizade.findOne({
            where: {
                pet_id: {
                    [Op.or]: [idPetLogado, idPet]
                },
                pet2_id: {
                    [Op.or]: [idPetLogado, idPet]
                },
                aceite: true
              }
        });
        return checkAmizade;
    }

    async checkAmizadeOrSolitacao(idPet, idPetLogado){
        const checkAmizade = await Amizade.findOne({
            where: {
                pet_id: {
                    [Op.or]: [idPetLogado, idPet]
                },
                pet2_id: {
                    [Op.or]: [idPetLogado, idPet]
                }
              }
        });
        return checkAmizade;
    }

    async findAmizadeById(id){
        const amizade = await Amizade.findByPk(id);
        return amizade;
    }
}

export default new AmizadeRepository();