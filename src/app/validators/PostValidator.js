import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            legenda: Yup.string().required('O campo legenda é obrigatário'),
            urlImagem: Yup.string().required('O campo urlImagem é obrigatório'),
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({errors: err.errors});
    }
};