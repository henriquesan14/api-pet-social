import Pet from '../models/Pet';
import Post from '../models/Post';
import Comentario from '../models/Comentario';
import Like from '../models/Like';
import Pet from '../models/Pet';
import File from '../models/File';
import AmizadeRepository from '../repositories/AmizadeRepository';
import { Op } from 'sequelize';
import SolicitacaoRepository from './SolicitacaoRepository';

class PetRepository {
    async getPets(idPetLogado, size, page, nome){
        const pets = await Pet.findAndCountAll({
            limit: size || 20,
            offset: page || 0,
            where: {
                id: {
                    [Op.not]: idPetLogado
                },
                firstName: {
                    [Op.iLike] : `%${nome}%`
                }
            },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path']
                }
            ],
            attributes: ['id', 'firstName', 'lastName']
        });
        return pets;
    }

    async getPetBydId(id){
        const pet = await Pet.findByPk(id);
        return pet;
    }

    async getPetBydIdInclude(id, idPetLogado){
        const pet = await Pet.findByPk(id, {
            attributes: [
                'id', 'firstName', 'email', 'lastName', 'sexo',
                'tipo','raca', 'dataNascimento', 'cidade', 'estado', 'telefone'
            ],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path']
                }
            ]
        });
        pet.isFriend = await AmizadeRepository.checkAmizade(id, idPetLogado) != null;
        pet.isSolicited = await SolicitacaoRepository.checkSolicitacao(id, idPetLogado) != null;
        return pet;
    }

    async getPetByEmail(email){
        const pet = await Pet.findOne({
            where: {
                email: email
            },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path']
                }
            ]
        });
        return pet;
    }

    async savePet(pet){
        return await Pet.create(pet);
    }
}

export default new PetRepository();