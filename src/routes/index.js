const Route = require('../libs/main/Route');
const Route404 = require('../libs/main/Route404');

const HomeController = require('../controllers/Home');
const Controller404 = require('../controllers/404');

const routes = [
  new Route('/', HomeController),
  new Route404(Controller404),
];

module.exports = routes;