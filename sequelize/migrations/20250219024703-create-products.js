'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(254),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      currency_name: {
        type: Sequelize.STRING('10'),
        allowNull: false,
        defaultValue: 'MXN',
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products')
  },
}
