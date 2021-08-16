const Stream = require('stream');

const writableStream = new Stream.Writable({
  write(chunk, enc, next) {
    console.log(chunk.toString());
    next();
  }
});
const readableStream = new Stream.Readable({
  read() {}
});

readableStream.pipe(writableStream);

readableStream.push('Alpha');
// writableStream.end();