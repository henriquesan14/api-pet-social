import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import PetRepository from '../repositories/PetRepository';

class AuthController {
    async store(req, res){

        const { email, password } = req.body;

        const pet = await PetRepository.getPetByEmail(email);

        if(!pet){
            return res.status(401).json({error: 'Email/Senha inválido(s)'});
        }
        if(!(await pet.checkPassword(password))){
            return res.status(401).json({error: 'Email/Senha inválido(s)'});
        }

        const {id, firstName, sexo, raca, tipo, cidade, estado, telefone, avatar} = pet;
        return res.json({
            user: {
                id,
                email,
                firstName,
                sexo,
                raca,
                tipo,
                cidade,
                estado,
                telefone,
                avatar
            },
            token: jwt.sign({ id: pet.id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new AuthController();
