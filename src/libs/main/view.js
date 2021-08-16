const fs = require('fs');
const stream = require('stream');

class TemplateReadError extends Error {};
class TemplateProcessError extends Error {};

/**
 * Embed data in view template and return
 */
function view(template_path, data){
  let dataset = [];

  // - Streams Setup
  const fileStream = fs.createReadStream(template_path, 'utf-8');
  const resultStream = new stream.Readable({
    read() {}
  });
  fileStream.on('error', err => {
    throw new TemplateReadError(err.message);
  });
  resultStream.on('error', err => {
    throw new TemplateProcessError(err.message);
  });

  // # Pupulate Data in string with placeholders
  const populateData = (string, placeholders_data) => {
    for(
      let placeholder_name in
      placeholders_data
    ){
      string = string.replaceAll(
        `[[${placeholder_name}]]`,
        placeholders_data[placeholder_name]
      );
    }
    return string;
  }

  // - On Data Read
  fileStream.on('data', buffer => {
    buffer = buffer.toString();
    if(dataset.length < 2){
      dataset.push(buffer);
    } else {
      resultStream.push(populateData(dataset.join(''), data));
      dataset=[];
    }
  });
  // - On Close
  fileStream.on('close', () => {
    resultStream.push(populateData(dataset.join(''), data));
    resultStream.push(null); // End witl null
    dataset=[];
  });

  // - Return Stream
  return resultStream;
}

module.exports = view;