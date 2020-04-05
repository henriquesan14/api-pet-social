'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'posts',
        'image_id',
        {
            type: Sequelize.INTEGER,
            references: {model: 'files', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('posts', 'image_id');
  }
};
