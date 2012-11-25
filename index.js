
/**
 * Module dependencies.
 */

var Submit = require('submit');

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
  this.file = file;
  var body = new FormData;
  body.append('file', this.file);
  Submit.call(this, body);
}

Upload.prototype = Submit.prototype;