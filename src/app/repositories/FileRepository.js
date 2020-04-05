import File from '../models/File';

class FileRepository {

    async save(file){
        return await File.create(file);
    }
}

export default new FileRepository();