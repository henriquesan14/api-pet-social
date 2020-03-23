import Pet from '../models/Pet';
import Post from '../models/Post';
import Comentario from '../models/Comentario';
import Like from '../models/Like';
import * as Yup from 'yup';
import { Op } from 'sequelize';

class PetController {
    async index(req, res){
        const nome = req.query.nome || "";
        const pets = await Pet.findAll({
            where: {
                id: {
                    [Op.not]: req.userId
                },
                firstName: {
                    [Op.like] : `%${nome}%`
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
            firstName: Yup.string().required('O campo firstName é obrigatório'),
            email: Yup.string().email('O campo email não é um email válido').required('O campo email é obrigatório'),
            password: Yup.string().required('O campo password é obrigatório').min(6, 'O campo password precisa de minimo 6 caracteres'),
            sexo: Yup.mixed().oneOf(['F', 'M'], 'O campo sexo deve ser [F ou M]')
        });
        try{
            await schema.validate(req.body);
        }catch(err){
            return res.status(400).json({errors: err.errors});
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
        return res.status(201).json({
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
            email:  Yup.string().email('O campo email não é um email válido'),
            oldPassword: Yup.string().min(6, 'O campo oldPassword precisa de minimo 6 caracteres'),
            password: Yup.string().min(6, 'O campo password precisa de minimo 6 caracteres')
            .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required('Para atualizar password, é necessário informar o um novo password') : field),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        });
        
        try{
            await schema.validate(req.body);
        }catch(err){
            return res.status(400).json({errors: err.errors});
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
