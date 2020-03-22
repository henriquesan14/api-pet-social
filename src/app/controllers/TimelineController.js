import Post from '../models/Post';
import Pet from '../models/Pet';
import Comentario from '../models/Comentario';
import Like from '../models/Like';
import Amizade from '../models/Amizade';
import * as Yup from 'yup';
import { Op } from 'sequelize';

class TimelineController {
    async index(req, res){
        const amizades = await Amizade.findAll({
            where: {
                [Op.or]: [{pet_id: req.userId}, {pet2_id: req.userId}],
                aceite: true
            },
            attributes: ['id', 'pet_id', 'pet2_id']
        });
        let listSetAmizades = new Set;
        amizades.forEach(a => {
            listSetAmizades.add(a.pet2_id);
            listSetAmizades.add(a.pet_id);
        });
        listSetAmizades.add(req.userId);
        const posts = await Post.findAndCountAll({
            limit: req.query.size || 1,
            offset: req.query.page || 0,
            where: {
                pet_id : Array.from(listSetAmizades)
            },
            include: [
                {
                    model: Pet,
                    as: 'pet',
                    attributes: ['id', 'firstName', 'lastName', 'avatar']
                },
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
                            attributes: ['id', 'firstName','lastName']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']],
            attributes: ['id', 'legenda', 'urlImagem', 'created_at']
        });
        return res.json(posts);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            legenda: Yup.string().required(),
            urlImagem: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }

        const {id, legenda, urlImagem, pet_id, created_at } = await Post.create({
            pet_id: req.userId,
            legenda: req.body.legenda,
            urlImagem: req.body.urlImagem
        });

        return res.status(201).json({
            id,
            legenda,
            urlImagem,
            pet_id,
            created_at
        });
    }

    async remove(req, res){
        const post = await Post.findByPk(req.params.id);
        if(!post){
            return res.status(404).json({error: `Post de id ${req.params.id} não encontrado`});
        }
        if(req.userId != post.pet_id){
            return res.status(400).json({error: 'Post só pode ser removido pelo dono'});
        }
        await post.destroy();
        return res.status(204).json();
    }
}

export default new TimelineController();
