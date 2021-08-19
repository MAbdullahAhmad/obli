const fs = require('fs');

const static_files_controller = (request, response, route) => {
  let file_stream;
  try {
    file_stream = fs.createReadStream(route.file_path);
  } catch (err) {
    console.log(err.message);
  }
  response.statusCode = 200;
  file_stream.pipe(response);
  console.log("STATIC: " + route.file_path);
};

module.exports = static_files_controller;