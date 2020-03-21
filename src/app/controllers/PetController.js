import Pet from '../models/Pet';
import Post from '../models/Post';
import Comentario from '../models/Comentario';
import Like from '../models/Like';
import * as Yup from 'yup';
import { Op } from 'sequelize';

class PetController {
    async index(req, res){
        const pets = await Pet.findAll({
            where: {
                id: {
                    [Op.not]: req.userId
                }
            },
            attributes: ['id', 'firstName', 'lastName', 'avatar']
        });
        return res.json(pets);
    }

    async getById(req, res){
        const pet = await Pet.findByPk(req.params.id, {
            attributes: [
                'id', 'firstName', 'email', 'lastName', 'avatar',
                'tipo','raca', 'dataNascimento', 'cidade', 'estado', 'telefone'
            ],
            include: [
                {
                    model: Post,
                    as: 'posts',
                    attributes: ['id', 'legenda', 'urlImagem', 'created_at'],
                    include: [
                        {
                            model: Comentario,
                            as: 'comentarios',
                            attributes: ['id', 'mensagem', 'created_at'],
                            include: [
                                {
                                    model: Pet,
                                    as: 'pet',
                                    attributes: ['id', 'firstName', 'lastName', 'avatar']
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
        if(!pet){
            return res.status(404).json({error: `Pet de id ${req.params.id} não encontrado`});
        }
        return res.json(pet);
    }


    async store(req, res){
        const schema = Yup.object().shape({
            firstName: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }
        const petExists = await Pet.findOne({
            where: {
                email: req.body.email
            }
        });
        if(petExists){
            return res.status(400).json({error: 'Já existe um pet com este e-mail'});
        }
        const {id, firstName, email, raca, tipo} = await Pet.create(req.body);
        return res.json({
            id,
            firstName,
            email,
            raca,
            tipo
        });
    }

    async update(req, res){
        const schema = Yup.object().shape({
            firstName: Yup.string(),
            email:  Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6)
            .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }

        const { email, oldPassword } = req.body;

        const pet = await Pet.findByPk(req.userId);
        if(email != pet.email){
            const petExists = await Pet.findOne({
                where: {
                    email: email
                }
            });
            if(petExists){
                return res.status(400).json({error: 'Já existe um pet com este e-mail'});
            }
        }

        if(oldPassword && !(await pet.checkPassword(oldPassword))){
            return res.status(401).json({error: 'A senha não confere com sua senha atual'})
        }
        const {id, firstName, raca, tipo} = await pet.update(req.body);

        return res.json({
            id,
            firstName,
            email,
            raca,
            tipo
        });
    }
}

export default new PetController();
