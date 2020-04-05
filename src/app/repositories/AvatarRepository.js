import Avatar from '../models/Avatar';

class AvatarRepository {

    async save(avatar){
        return await Avatar.create(avatar);
    }
}

export default new AvatarRepository();