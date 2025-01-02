import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LMS API",
      version: "1.0.0",
      description: "LMS API DOCS",
    },
    servers: [
      {
        url: "http://localhost:8003",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // apis: ["./src/app/**/*.ts"],
  apis: [
    "./src/app/auth/auth.swagger.ts",
    "./src/app/dashboard/dashboard.swagger.ts",
    "./src/app/categories/categories-and-courses.swagger.ts",
    "./src/app/courses/courses.swagger.ts",
    "./src/app/chapters/chapter.swagger.ts",
  ],
  // apis: [
  // path.join(__dirname, "./src/app/auth/auth.swagger.ts"), // Include your Swagger files here
  // ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
