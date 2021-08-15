/**
 * Route404 Constructor
 * 
 * @param {Function} controller
 * 
 */
const Route404 = function(controller){
  this.path = '*';
  this.controller = controller;
  this.placeholder_path = false;
  this.path_struct = null;
  this.placeholders = {};

  // # Returns self
  this.match = () => this;
};

module.exports = Route404;