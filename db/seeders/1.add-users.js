"use strict";
const bcrypt = require("bcryptjs");
const generateHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8));
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    email: "admin@admin-monday.devxqa.com",
                    password: generateHash("Re4j!xno9zB"),
                    firstName: "Admin",
                    lastName: "Grantify",
                    description: "About Admin Grantify",
                    lastLogin: new Date(),
                    lastLoginIp: "192.168.0.1",
                    isActive: true,
                    isVerified: true,
                    avatar: "",
                    birthDate: "2010/12/03",
                    rememberToken: null,
                    blocked: false,
                    passwordResetHash: null,
                    createdBy: 1,
                    editedBy: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {
                logging: console.log,
            }
        );
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {truncate: true});
    },
};
