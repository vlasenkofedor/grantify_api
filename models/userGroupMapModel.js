"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroupMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //UserGroup.belongsToMany(models['User'], {through: 'users'});
      // UserGroup.belongsToMany(models['Group'], {through: 'groups'});
    }
  }

  UserGroupMap.init(
    {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      group_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      sequelize,
      modelName: "UserGroupMap",
      tableName: "user_group_map",
      createdAt: false,
      updatedAt: false,
      indexes: [
        {
          fields: ["group_id"],
        },
      ],
    }
  );

  return UserGroupMap;
};
