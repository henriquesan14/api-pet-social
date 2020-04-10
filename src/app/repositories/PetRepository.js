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
    async getPets(idPetLogado, nome){
        const pets = await Pet.findAll({
            where: {
                id: {
                    [Op.not]: idPetLogado
                },
                firstName: {
                    [Op.iLike] : `%${nome}%`
                }
            },
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
                'id', 'firstName', 'email', 'lastName',
                'tipo','raca', 'dataNascimento', 'cidade', 'estado', 'telefone'
            ],
            include: [
                {
                    model: Post,
                    as: 'posts',
                    attributes: ['id', 'legenda', 'created_at'],
                    include: [
                        {
                            model: File,
                            as: 'image',
                            attributes: ['id', 'path']
                        },
                        {
                            model: Comentario,
                            as: 'comentarios',
                            attributes: ['id', 'mensagem', 'created_at'],
                            include: [
                                {
                                    model: Pet,
                                    as: 'pet',
                                    attributes: ['id', 'firstName', 'lastName']
                                }
                            ]
                        },
                        {
                            model: Like,
                            as: 'likes',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Pet,
                                    as: 'pet',
                                    attributes: ['id', 'firstName', 'lastName',]
                                }
                            ]
                        }
                    ]
                },
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