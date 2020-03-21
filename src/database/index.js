import Sequelize from 'sequelize';

import Pet from '../app/models/Pet';
import databaseConfig from '../config/database';

const models = [Pet];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
