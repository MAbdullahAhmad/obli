/**
 * Route Constructor
 * 
 * @param {String} path Path of route
 * @param {Function} controller
 * 
 * @method genPathStruct
 *  * @returns a structure that it matches in @method match
 * 
 * @method match
 *  * @param path_to_match
 *  * @returns {Route} instance if matched otherwise false
 */
const Route = function(path='/', controller){
  this.path = path;
  this.controller = controller;
  this.placeholder_path = false;
  this.path_struct = null;
  this.placeholders = {};

  // # Constructor
  const constructor = () => {
    this.genPathStruct();
  };

  // # Generate Path Structure (to match)
  this.genPathStruct = () => {
    const parts = this.path.split('/');
    let path_struct = [];

    for(let part of parts){
      // - Placeholder Path
      if (part[0]=='<' && part[part.length-1]=='>'){
        path_struct.push({
          name: part.slice(1, part.length-1)
        });

        if(!this.placeholder_path){
          this.placeholder_path = true;
        }
        continue;
      }
      // - Non-Placeholder with \< at start in a part
      else if (part.slice(1, 3) == '\\<'){
        part = part.slice(3);
      }

      path_struct.push(part);
    }

    this.path_struct = path_struct;
  };

  // # Returns self if path matched with route-path
  this.match = (path_to_match) => {

    // - If Simple String Path
    if(!this.placeholder_path){
      if(this.path == path_to_match){
        return this;
      }
      return false;
    }

    // - Convert path_to_match to this.path_struct format
    const query_struct = path_to_match.split('/');

    // - if different on-of-parts
    if(query_struct.length != this.path_struct.length){
      return false;
    }

    const placeholders = {};

    // - match and extract placeholders
    for(let key of this.path_struct){
      let value = this.path_struct[key];

      if(typeof value == 'string'){
        if(value ==  query_struct[key]){
          continue;
        }
        return false;
      }
      else if(typeof value == 'object'){
        placeholders[value.name] = query_struct[key];
        continue;
      }
      else {
        throw new Error(`Unexpected type ${typeof value}`);
      }
    }

    this.placeholders = placeholders;
    return this;
  };

  // - Call Constructor
  return constructor();
};

module.exports = Route;