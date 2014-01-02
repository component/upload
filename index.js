
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
 *   - `abort` upload was aborted
 *   - `progress` upload in progress (`e.percent` etc)
 *   - `end` upload is complete
 *
 * @param {File} file
 * @api private
 */

function Upload(file) {
  if (!(this instanceof Upload)) return new Upload(file);
  Emitter.call(this);
  this.file = file;
  file.slice = file.slice || file.webkitSlice;
}

/**
 * Mixin emitter.
 */

Emitter(Upload.prototype);

/**
 * Upload to the given `path`.
 *
 * @param {String} path
 * @param {Object} [payload]
 * @param {Object} [headers]
 * @param {Function} [fn]
 * @api public
 */

Upload.prototype.to = function(path, payload, headers, fn){
  // TODO: x-browser
  var self = this;

  // callback is the last argument
  if (typeof payload === 'function') {
    payload = {};
    fn = payload;
  }
  if (typeof headers === 'function') {
    headers = {};
    fn = headers;
  }

  fn = fn || function(){};
  var req = this.req = new XMLHttpRequest;
  req.open('POST', path);

  // Add extra headers
  headers = headers || {};
  Object.keys(headers).forEach(function(key) {
    var value = headers[key];
    if (typeof value === 'function') {
      value = value();
    }
    req.setRequestHeader(key, value);
  });

  req.onload = this.onload.bind(this);
  req.onerror = this.onerror.bind(this);
  req.upload.onprogress = this.onprogress.bind(this);
  req.onreadystatechange = function(){
    if (4 == req.readyState) {
      var type = req.status / 100 | 0;
      if (2 == type) return fn(null, req);
      var err = new Error(req.statusText + ': ' + req.response);
      err.status = req.status;
      fn(err);
    }
  };
  var body = new FormData;
  body.append('file', this.file);

  // Add extra payload
  payload = payload || {};
  Object.keys(payload).forEach(function(key) {
    var value = payload[key];
    if (typeof value === 'function') {
      value = value();
    }
    body.append(key, value);
  });

  req.send(body);
};

/**
 * Abort the XHR.
 *
 * @api public
 */

Upload.prototype.abort = function(){
  this.emit('abort');
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
