
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Expose `Upload`.
 */

module.exports = Upload;

/**
 * Initialize a new `Upload` file`.
 * This represents a single file upload.
 *
 * Events:
 *
 *   - `error` an error occurred
 *   - `progress` upload in progress (`e.percent` etc)
 *   - `end` upload is complete
 *
 * @param {File} file
 * @api private
 */

function Upload(file) {
  Emitter.call(this);
  this.file = file;
}

/**
 * Mixin emitter.
 */

Emitter(Upload.prototype);

/**
 * Upload to the given `path`.
 *
 * @param {String} path
 * @api public
 */

Upload.prototype.to = function(path){
  // TODO: x-browser
  var req = this.req = new XMLHttpRequest;
  req.open('POST', path);
  req.onload = this.onload.bind(this);
  req.onerror = this.onerror.bind(this);
  req.upload.onprogress = this.onprogress.bind(this);
  var body = new FormData;
  body.append('file', this.file);
  req.send(body);
};

/**
 * Abort the XHR.
 *
 * @api public
 */

Upload.prototype.abort = function(){
  this.req.abort();
};

/**
 * Error handler.
 *
 * @api private
 */

Upload.prototype.onerror = function(e){
  this.emit('error', e);
};

/**
 * Onload handler.
 *
 * @api private
 */

Upload.prototype.onload = function(e){
  this.emit('end', this.req);
};

/**
 * Progress handler.
 *
 * @api private
 */

Upload.prototype.onprogress = function(e){
  e.percent = e.loaded / e.total * 100;
  this.emit('progress', e);
};
