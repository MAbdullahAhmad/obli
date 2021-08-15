const http = require('http');
const path = require('path');

// # Extended Errors
class NoRoutesSpecifiedError extends Error {};
class InvalidRoutesError extends Error {};
class RouteNotFoundError extends Error {};

/**
 * 
 * Returns a http server with self at @property master
 * 
 * @param {Array<Route,RouteSet>} routes
 * 
 * @returns {http.Server}
 *  * @property {CustomServer} master
 * 
 */
const CustomServer = function(routes){
  // - Properties
  this.routes = routes;

  // # Constructor
  constructor = () => {
    this.validateRoutes();
    const server = this.createServer();

    server.master = this;
    return server;
  };

  // # Validate Routes
  this.validateRoutes = () => {
    if (typeof this.routes != 'object'){
      throw new InvalidRoutesError('Routes must be arrays');
    }
    if (this.routes.length == 0) {
      throw new NoRoutesSpecifiedError();
    }
    return true;
  };

  // # Create Server
  this.createServer = () => {
    return http.createServer(this.ServerCallBack);
  };

  // # Get Route that matches path
  this.getRoute = (req_path) => {
    req_path = path.normalize(req_path);

    for(let route of this.routes){
      let matched_route = null;
      if(matched_route = route.match(req_path)){
        return matched_route;
      }
    }
    return false;
  }

  // # HTTP Server Callback
  this.ServerCallBack = (request, response) => {
    let route=false;
    if(route = this.getRoute(request.url)){
      route.controller(request, response, route);
    } else {
      throw new RouteNotFoundError();
    }
  };

  // - Call constructor
  return constructor();
};

module.exports = CustomServer;