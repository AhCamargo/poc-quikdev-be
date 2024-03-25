const swaggerAutogen = require("swagger-autogen")();
const doc = require("./swaggerConfig.ts");

const outputFile = "./swagger_documentation.json";
const endpoints = ["../app/routes/index.ts"];

swaggerAutogen(outputFile, endpoints, doc);
