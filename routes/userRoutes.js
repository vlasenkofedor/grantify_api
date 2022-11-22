"use strict";

const { msg, user } = require("../responses/index");
const { checkAccessToken } = require("../services/tokens");
const controller = require("../controllers/userController");
const routes = [
  {
    method: "GET",
    url: "/user",
    preValidation: checkAccessToken,
    handler: controller.info,
    schema: {
      description: "User info",
      tags: ["User"],
      summary: "Get current user info",
      security: [{ bearerAuth: [] }],
      response: {
        400: msg[400],
        401: msg[401],
        403: msg[403],
        404: msg[404],
        422: msg[422],
        200: {
          description: "Object User",
          type: "object",
          properties: user.properties,
        },
      },
    },
  },
];

module.exports = routes;
