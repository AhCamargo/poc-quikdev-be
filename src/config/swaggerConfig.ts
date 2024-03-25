module.exports = {
  info: {
    version: "1.0.0",
    title: "QuikDev API",
    description: "Documentação da API da QuikDev",
  },
  host: "localhost:3123",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    JWT: {
      description: "JWT token",
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
  definitions: {},
};
