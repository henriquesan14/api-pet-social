import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            email: Yup.string().required('O campo email é obrigatório'),
            password: Yup.string().required('O campo password é obrigatório')
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({errors: err.errors});
    }
};