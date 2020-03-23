'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('pets', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            sexo: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            tipo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            raca: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            data_nascimento: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            estado: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            perfil: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'PET'
            },
            ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('pets');
  }
};
