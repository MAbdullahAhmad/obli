const fs = require('fs');
const stream = require('stream');

class TemplateReadError extends Error {};
class TemplateProcessError extends Error {};

/**
 * Embed data in view template and return
 */
function view(template_path, data){
  let dataset = [];
  // const pupulatedDataStream = stream.Duplex();

  // - Streams Setup
  const fileStream = fs.createReadStream(template_path, 'utf-8');
  const resultStream = new stream.Readable({
    read() {
      this.push('alpha');
    }
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
    // if(dataset.length>0){
    //   pupulatedDataStream.write(populateData(dataset.join(''), data));
    //   dataset=[];
    // }
    resultStream.push(populateData(dataset.join(''), data));
    dataset=[];
  });

  // resultStream.on('close', () => {
  //   console.log('closed');
  // });

  // return pupulatedDataStream;
  return resultStream;
}

module.exports = view;