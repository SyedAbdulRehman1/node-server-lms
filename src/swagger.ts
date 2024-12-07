import swaggerJsdoc from "swagger-jsdoc";
// import "../src/app"
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Name",
      version: "1.0.0",
      description: "Your API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8003", // Update with your server's base URL
      },
    ],
  },
  apis: ["./src/app/**/*.ts"], // Ensure this path matches your folder structure
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
