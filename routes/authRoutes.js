"use strict";

const { msg, user, tokens } = require("../responses/index");
const { checkRefreshToken } = require("../services/tokens");
const controller = require("../controllers/authController");
const routes = [
  {
    method: "POST",
    url: "/auth/login",
    handler: controller.login,
    schema: {
      description: "User login",
      tags: ["Auth"],
      summary: "Login user in email and password",
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            default: "admin@admin.com",
          },
          password: {
            type: "string",
            default: "123456",
            minLength: 6,
            maxLength: 64,
          },
        },
      },
      response: {
        400: msg[400],
        401: msg[401],
        403: msg[403],
        404: msg[404],
        422: msg[422],
        200: {
          description: "Object User, access, refresh token",
          type: "object",
          properties: {
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        },
      },
    },
  },
  {
    method: "GET",
    url: "/auth/refresh-token",
    preValidation: checkRefreshToken,
    handler: controller.refreshToken,
    schema: {
      description: "Get new refresh token",
      tags: ["Auth"],
      summary: "Get new access and refresh token using refresh token in header",
      security: [{ bearerAuth: [] }],
      response: {
        400: msg[400],
        401: msg[401],
        403: msg[403],
        404: msg[404],
        422: msg[422],
        200: {
          description: "Access and refresh token",
          type: "object",
          properties: tokens,
        },
      },
    },
  },
];

module.exports = routes;
