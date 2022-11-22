"use strict";

const { msg } = require("../responses/index");
const { checkAccessToken } = require("../services/tokens");
const controller = require("../controllers/boardController");
const routes = [
  {
    method: "GET",
    url: "/board",
    preValidation: checkAccessToken,
    handler: controller.list,
    schema: {
      description: "Board info",
      tags: ["Board"],
      summary: "Get all boards",
      security: [{ bearerAuth: [] }],
      response: {
        400: msg[400],
        401: msg[401],
        403: msg[403],
        404: msg[404],
        422: msg[422],
        200: {
          description: "Object Board",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "number",
                example: 123,
              },
              name: {
                type: "string",
                example: "Board name",
              },
            },
          }
        },
      },
    },
  },
];

module.exports = routes;
