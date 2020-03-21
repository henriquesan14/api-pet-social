import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import Pet from '../models/Pet';

import * as Yup from 'yup';

class AuthController {
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }
        const { email, password } = req.body;

        const pet = await Pet.findOne({
            where: {
                email
            }
        });

        if(!pet){
            return res.status(401).json({error: 'Email/Senha inválido(s)'});
        }
        if(!(await pet.checkPassword(password))){
            return res.status(401).json({error: 'Email/Senha inválido(s)'});
        }

        const { id, firstName, perfil } = pet;
        return res.json({
            user: {
                id,
                firstName,
                email,
                perfil
            },
            token: jwt.sign({ id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new AuthController();
