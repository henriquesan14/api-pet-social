import Amizade from '../models/Amizade';
import Pet from '../models/Pet';
import * as Yup from 'yup';
import { Op } from 'sequelize';

class SolicitacaoAmizadeController {
    async index(req, res){
        const amizades = await Amizade.findAll({
            where: {
                pet2_id: req.userId,
                aceite: false
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
        return res.json(amizades);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            pet2_id: Yup.number().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Id do pet é obrigatório'});
        }
        if(req.userId == req.body.pet2_id){
            return res.status(400).json({error: 'Você não pode enviar solicitação para você mesmo'});
        }
        const checkAmizade = await Amizade.findOne({
            where: {
                pet_id: {
                    [Op.or]: [req.userId, req.body.pet2_id]
                },
                pet2_id: {
                    [Op.or]: [req.userId, req.body.pet2_id]
                }
              }
        });
        if(checkAmizade){
            return res.status(400).json({error: 'Você já é amigo deste Pet ou já solicitou amizade dele'});
        }
        const amizade = {
            pet_id: req.userId,
            pet2_id: req.body.pet2_id
        };
        const { pet_id, pet2_id, aceite } = await Amizade.create(amizade);
        return res.status(201).json({
            pet_id,
            pet2_id,
            aceite
        });
    }


    async update(req, res){
        const amizade = await Amizade.findByPk(req.params.id);
        if(!amizade){
            return res.status(404).json({error: `Amizade de id ${req.params.id} não encontrada`});
        }
        if(amizade.pet2_id != req.userId){
            return res.status(400).json({error: 'Você não aceitar solicitações que não pertencem a você'});
        }
        amizade.update({
            aceite: true
        })
        return res.status(204).json();
    }

    async remove(req, res){
        const solicitacao = await Amizade.findOne(
            {
                where: {
                    id: req.params.id,
                    aceite: false
                }
            }
        );
        if(!solicitacao){
            return res.status(404).json({error: `Solicitação de id ${req.params.id} não encontrada`});
        }
        if(req.userId != solicitacao.pet2_id){
            return res.status(400).json({error: 'Você não pode recusar solicitação que não pertencem a você'});
        }
        await solicitacao.destroy();
        return res.status(204).json();
    }

}

export default new SolicitacaoAmizadeController();
