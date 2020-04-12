import Mensagen from '../models/Mensagen';
import Pet from '../models/Pet';
import File from '../models/File';

class MensagemRepository {
    async getMensagens(size, page, idConversa){
        const mensagens = await Mensagen.findAndCountAll({
            distinct: true,
            limit: size || 20,
            offset: page || 0,
            where: {
                conversa_id: idConversa
            },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path']
                }
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Pet,
                    as: 'pet',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            attributes: ['id', 'message', 'created_at']
        });
        return mensagens;
    }

    async save(mensagem){
        return await Mensagen.create(mensagem);
    }
}

export default new MensagemRepository();