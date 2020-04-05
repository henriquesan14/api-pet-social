import FileRepository from '../repositories/FileRepository';

class FileController {
    async store(req, res){
        const { key: name, location: path } = req.file;
        const file = await FileRepository.save({
            name,
            path
        });
        return res.json({
            id: file.id,
            path: file.path
        });
    }
}

export default new FileController();