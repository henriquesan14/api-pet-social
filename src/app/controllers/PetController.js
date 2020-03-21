import Pet from '../models/Pet';
import * as Yup from 'yup';

class PetController {
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
