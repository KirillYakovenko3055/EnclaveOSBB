const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  // Обработчик ответа
  const response = awsServerlessExpress.proxy(server, event, context);

  // Добавление заголовков CORS
  response.headers['Access-Control-Allow-Origin'] = 'https://3c8hcd6ma6.execute-api.eu-central-1.amazonaws.com/dev'; // Замените на ваш домен
  response.headers['Access-Control-Allow-Credentials'] = 'true';
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'; // Укажите необходимые методы
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'; // Укажите необходимые заголовки

  return response;
};