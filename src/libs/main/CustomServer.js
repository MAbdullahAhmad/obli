const http = require('http');
const path = require('path');

class NoRoutesSpecifiedError extends Error {};
class InvalidRoutesError extends Error {};

class RouteNotFoundError extends Error {};

/**
 * 
 * Returns a http server with self at @property master
 * 
 * @param {Array<Route,RouteSet>} routes
 */
const CustomServer = function(routes=[]){
  this.routes = routes;
  // # Constructor
  constructor = () => {
    this.validateRoutes();
    const server = this.createServer();

    server.master = this;
    return server;
  };

  // # Validate Routes
  this.validateRoutes = function() {
    if (typeof this.routes != 'object'){
      throw new InvalidRoutesError('Routes must be arrays');
    }
    if (this.routes.length > 0) {
      throw new NoRoutesSpecifiedError();
    }
    return true;
  };

  // # Create Server
  this.createServer = function() {
    return http.createServer(this.ServerCallBack);
  };

  // # HTTP Server Callback
  this.ServerCallBack = function(req, res) {
    let route=false;
    if(route = this.getRoute(req.path)){
      require(route.controller)(req, res);
    } else {
      throw new RouteNotFoundError();
    }
  };

  // # Get Route that matches path
  this.getRoute = function(req_path){
    req_path = path.normalize(req_path);
    for(let route of this.routes){
      let matched_route = null;
      if(matched_route = route.match(req_path)){
        return matched_route;
      }
    }
    return false;
  }

  return constructor();
};

module.exports = CustomServer;