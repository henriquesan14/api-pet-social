import * as Yup from 'yup';

export const validateCreatePet =  async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            firstName: Yup.string().required('O campo firstName é obrigatório'),
            email: Yup.string().email('O campo email não é um email válido').required('O campo email é obrigatório'),
            password: Yup.string().required('O campo password é obrigatório').min(6, 'O campo password precisa de minimo 6 caracteres'),
            sexo: Yup.mixed().oneOf(['F', 'M'], 'O campo sexo deve ser [F ou M]')
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({errors: err.errors});
    }
};

export const validateUpdatePet = async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            firstName: Yup.string(),
            email:  Yup.string().email('O campo email não é um email válido').required('O campo email é obrigatório'),
            oldPassword: Yup.string().min(6, 'O campo oldPassword precisa de minimo 6 caracteres'),
            password: Yup.string().min(6, 'O campo password precisa de minimo 6 caracteres')
            .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required('Para atualizar password, é necessário informar o um novo password') : field),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({errors: err.errors});
    }
};