'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'comentarios',
        'post_id',
        {
            type: Sequelize.INTEGER,
            references: {model: 'posts', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('comentarios', 'post_id');
  }
};
