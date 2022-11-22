"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("user_group_map", [
      { userId: 1, groupId: 1 },
      { userId: 1, groupId: 2 },
    ]);
  },

  down: async (queryInterface) => {
     await queryInterface.bulkDelete('user_group_map', null, {truncate: true});
  },
};
