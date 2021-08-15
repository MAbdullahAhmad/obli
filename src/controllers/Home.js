module.exports = (request, response, route) => {
  response.statusCode = 200;
  response.end('Welcome to Homepage');

  console.log('Homepage Request Completed');
}