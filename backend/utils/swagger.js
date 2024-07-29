import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SocialNest API',
      version: '1.0.0',
      description: 'Social Nest social media application apis',
    },
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

export {
  specs,
  swaggerUi,
};