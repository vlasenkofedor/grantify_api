module.exports = {
  400: {
    description: "Bad Request",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "400" },
      error: { type: "string", example: "Bad Request" },
    },
  },
  401: {
    description: "Unauthorized",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "401" },
      error: { type: "string", example: "Unauthorized" },
    },
  },
  403: {
    description: "Forbidden",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "403" },
      error: { type: "string", example: "Forbidden" },
    },
  },
  404: {
    description: "Not found",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "404" },
      error: { type: "string", example: "Not found" },
    },
  },
  409: {
    description: "Conflict",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "409" },
      error: { type: "string", example: "Conflict" },
    },
  },
  422: {
    description: "Unprocessable Entity",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "422" },
      error: { type: "string", example: "Unprocessable Entity" },
    },
  },
  431: {
    description: "Request Header Fields Too Large",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "431" },
      error: { type: "string", example: "Request Header Fields Too Large" },
    },
  },
  200: {
    description: "OK",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "200" },
      message: { type: "string", example: "OK" },
    },
  },
  201: {
    description: "Created",
    type: "object",
    properties: {
      statusCode: { type: "string", example: "201" },
      message: { type: "string", example: "Created" },
    },
  },
};
