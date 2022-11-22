module.exports = {
  description: "Object User",
  type: "object",
  properties: {
    id: {
      type: "number",
      example: 1,
    },
    email: {
      type: "string",
      example: "admin@admin.com",
    },
    firstName: {
      type: "string",
      example: "Ivan",
    },
    lastName: {
      type: "string",
      example: "Petrov",
    },
    description: {
      type: "string",
      example: "About Ivan Petrov text",
    },
    lastLogin: {
      type: "string",
      format: "date-time",
      example: "2020-12-01 16:37:37",
    },
    lastLoginIp: {
      type: "string",
      example: "127.0.0.1",
    },
    isVerified: {
      type: "boolean",
      example: true,
    },
    avatar: {
      type: "string",
      example: "/avatars/1/1.png",
    },
    birthDate: {
      type: "string",
      format: "date",
      example: "2020-12-01",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2020-12-01 09:54:57",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2020-12-01 09:54:57",
    },
    groups: {
      type: "array",
      items: {
        type: "number",
        example: 1,
      },
    },
  },
};
