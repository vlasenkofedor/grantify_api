"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      parentId: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
    });
    await queryInterface.addIndex("user_groups", ["parentId"]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("user_groups");
  },
};
