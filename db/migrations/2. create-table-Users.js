"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      firstName: {
        defaultValue: "",
        type: Sequelize.STRING,
      },
      lastName: {
        defaultValue: "",
        type: Sequelize.STRING,
      },
      description: {
        defaultValue: "",
        type: Sequelize.STRING,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      lastLoginIp: {
        defaultValue: "",
        type: Sequelize.STRING(15),
      },
      lastDevice: {
        default: "",
        type: Sequelize.STRING(1024),
      },
      isActive: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isVerified: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      verifiedCode: {
        defaultValue: "",
        type: Sequelize.STRING(32),
      },
      avatar: {
        defaultValue: "",
        type: Sequelize.STRING,
      },
      birthDate: {
        defaultValue: null,
        type: Sequelize.DATEONLY,
      },
      phone: {
        default: "",
        type: Sequelize.STRING,
      },
      rememberToken: {
        defaultValue: "",
        type: Sequelize.STRING,
      },
      blocked: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      passwordResetHash: {
        defaultValue: "",
        type: Sequelize.STRING,
      },
      createdBy: {
        defaultValue: null,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      editedBy: {
        defaultValue: null,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("users", ["email"], {
      unique: true,
    });
    await queryInterface.addIndex("users", ["rememberToken"], {
      unique: true,
    });
    await queryInterface.addIndex("users", ["blocked"]);
    await queryInterface.addIndex("users", ["isActive"]);
    await queryInterface.addIndex("users", ["isVerified"]);
    await queryInterface.addIndex("users", ["passwordResetHash"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
