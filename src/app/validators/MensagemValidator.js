import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            message: Yup.string().required('O campo message é obrigatório'),
            pet2_id: Yup.number().required('O campo pet2_id é obrigatório')
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({errors: err.errors});
    }
};
