const path = require('path');
const fs = require('fs');
const static_files_controller = require('./static_files_controller');


// # Extended Errors
class CannotAccessStaticDir extends Error {};

/**
 * Route Constructor
 * 
 * @param {String} static_dir Path of route directory for static files
 * @param {Function} controller
 * 
 * @method match
 *  * @param path_to_match
 *  * @returns {Route} instance if matched otherwise false
 */

const StaticFilesRoute = function(static_dir='./static', controller){
  this.static_dir = path.normalize(path.resolve(static_dir));
  this.controller = controller ?? static_files_controller;
  this.file_path = '/home/j/.bashrc';

  // # Constructor
  const constructor = () => {
    try {
      fs.accessSync(this.static_dir);
    } catch (err) {
      throw new CannotAccessStaticDir(err.message);
    }
  };

  // # Returns self if path is accessible file otherwise fales
  this.match = (path_to_match) => {
    if(path_to_match[0]=="/"){
      path_to_match = path_to_match.substring(1);
    }
    this.file_path = path.normalize(
      path.resolve(this.static_dir, path_to_match)
    );

    if((this.file_path.indexOf(this.static_dir)!=0)){
      return false;
    }
    try {
      fs.statSync(this.file_path).isFile();
    } catch (err) {
      return false;
    }


    return this;
  };

  // - Call Constructor
  constructor();
};

module.exports = StaticFilesRoute;