import Sequelize from 'sequelize';

import Pet from '../app/models/Pet';
import Amizade from '../app/models/Amizade';
import Post from '../app/models/Post';
import Comentario from '../app/models/Comentario';
import Like from '../app/models/Like';
import Conversa from '../app/models/Conversa';
import Mensagen from '../app/models/Mensagen';
import databaseConfig from '../config/database';

const models = [Pet, Amizade, Post, Comentario, Like, Conversa, Mensagen];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
