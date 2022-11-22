"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_group_map", {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      groupId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
    });
    await queryInterface.addIndex("user_group_map", ["groupId"]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("user_group_map");
  },
};
