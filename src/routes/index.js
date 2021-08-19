const Route = require('../libs/main/Route');
const Route404 = require('../libs/main/Route404');
const StaticFilesRoute = require('../libs/main/StaticFilesRoute');

const homeController = require('../controllers/home');
const controller404 = require('../controllers/404');

const routes = [
  new Route('/', homeController),
  new StaticFilesRoute(),
  new Route404(controller404),
];

module.exports = routes;