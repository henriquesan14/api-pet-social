import AvatarRepository from '../repositories/AvatarRepository';

class AvatarController {
    async store(req, res){
        const { key: name, location: path } = req.file;
        const avatar = await AvatarRepository.save({
            name,
            path
        });
        return res.json({
            id: avatar.id,
            path: avatar.path
        });
    }
}

export default new AvatarController();