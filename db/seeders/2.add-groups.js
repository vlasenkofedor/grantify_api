"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("user_groups", [
      { id: 1, title: "Administrator" },
      { id: 2, title: "Application users" },
      { id: 3, title: "Managers", parentId: 1 },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("user_groups", null, { truncate: true });
  },
};
