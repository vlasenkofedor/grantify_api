"use strict";

const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
const getAvatar = (avatar, id) =>
  avatar ? `${Math.ceil(id / 1000)}/${avatar}` : "avatars/avatar.svg";
const reformatDate = (str) =>
  str ? new Date(str).toISOString().replace(/T/, " ").slice(0, 19) : "";
const appearance = (user) => {
  ["lastLogin", "createdAt", "updatedAt"].forEach((v) => {
    user[v] = reformatDate(user[v]);
  });
  user.avatar = getAvatar(user.avatar, user.id);
  return user;
};
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models["UserGroupMap"], {
        //through: 'user_group',
        onDelete: "cascade",
        foreignKey: "userId",
        as: "groups",
      });
    }

    get avatar() {
      return getAvatar(this.avatar, this.id);
    }

    get lastLogin() {
      return reformatDate(this.last_login);
    }

    get createdAt() {
      return reformatDate(this.createdAt);
    }

    get updatedAt() {
      return reformatDate(this.updatedAt);
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      firstName: {
        default: "",
        type: DataTypes.STRING,
      },
      lastName: {
        default: "",
        type: DataTypes.STRING,
      },
      description: {
        default: "",
        type: DataTypes.STRING,
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
      lastLoginIp: {
        default: "",
        type: DataTypes.STRING(15),
      },
      lastDevice: {
        default: "",
        type: DataTypes.STRING(1024),
      },
      isActive: {
        default: false,
        type: DataTypes.BOOLEAN,
      },
      isVerified: {
        default: false,
        type: DataTypes.BOOLEAN,
      },
      verifiedCode: {
        type: DataTypes.STRING(32),
        defaultValue: () => User.verifiedCode(),
      },
      avatar: {
        default: "",
        type: DataTypes.STRING,
      },
      birthDate: {
        default: null,
        type: DataTypes.DATEONLY,
      },
      phone: {
        default: "",
        type: DataTypes.STRING,
      },
      rememberToken: {
        default: "",
        type: DataTypes.STRING,
      },
      blocked: {
        default: false,
        type: DataTypes.BOOLEAN,
      },
      passwordResetHash: {
        default: "",
        type: DataTypes.STRING,
      },
      createdBy: {
        default: null,
        type: DataTypes.INTEGER,
      },
      editedBy: {
        default: null,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      indexes: [
        {
          fields: ["email"],
          unique: true,
        },
        {
          fields: ["rememberToken"],
          unique: true,
        },
        {
          fields: ["passwordResetHash"],
        },
        {
          fields: ["isActive"],
        },
        {
          fields: ["blocked"],
        },
        {
          fields: ["isVerified"],
        },
      ],
    }
  );
  User.login = (email, password) =>
    User.findOne({ where: { email } }).then((user) =>
      user && bcrypt.compareSync(password, user.password) ? user : null
    );

  User.updateVerified = (userId, verifiedCode) =>
    User.findOne({
      where: { id: userId },
      attributes: ["id", "verified_code"],
    }).then((u) => {
      if (u && u.verified_code === verifiedCode) {
        return u.update({
          verified_code: "",
          is_verified: true,
        });
      } else {
        throw Error("Incorrect verified code");
      }
    });
  User.verifiedCode = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();
  User.generateHash = (password) =>
    bcrypt.hashSync(String(password), bcrypt.genSaltSync(8));
  User.prototype.toJSON = function () {
    return appearance(this.get());
  };
  return User;
};
