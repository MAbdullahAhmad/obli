const controller404 =  (request, response, route) => {
  response.statusCode = 404;
  response.end('<h1>404 Not Found!</h1>');
  console.log('404');
};

module.exports =controller404;