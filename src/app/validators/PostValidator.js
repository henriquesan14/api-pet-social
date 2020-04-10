import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            legenda: Yup.string().required('O campo legenda é obrigatário'),
            image_id: Yup.number().required('O campo image_id é obrigatário')
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({errors: err.errors});
    }
};