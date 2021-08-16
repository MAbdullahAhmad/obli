const path = require('path');
const view = require('../libs/main/view');

const template = path.resolve('views/index.green.html');
const data = {
  title: 'Welcome'
};

const home = (request, response, route) => {
  console.log('Homepage Request');
  response.statusCode = 200;
  
  const resultStream = view(template, data);
  resultStream.pipe(response);
};

module.exports = home;