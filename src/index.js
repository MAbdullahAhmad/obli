const CustomServer = require('./libs/main/CustomServer');
const routes = require('./routes');

const port = process.env.PORT ?? 3000;
const server = CustomServer(routes);

server.listen(port, () => {
  console.log(`Server Listening on Port ${port}`)
});