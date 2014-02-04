
# upload

  file upload and progress api

## Installation

    $ component install component/upload

## Events

  - `error` an error occurred
  - `abort` upload was aborted
  - `progress` (e) upload in progress (`e.percent`, `e.totalSize` etc)
  - `end` upload is complete

## API

### Upload(file)

  Initialize an `Upload` with the given `file`, where `file`
  is a `File` object, for example from a `input.files[0]` `FileList`.

```js
var upload = new Upload(file);
var upload = Upload(file);
```

### Upload#to(path, [fn])

  __POST__ the multipart upload to `path` and invoke `fn(err, res)`.

```js
upload.to('/upload');
upload.on('progress', reportProgress);
upload.on('end', done);
```

### Upload#setPath(path)

  Creates the xhr for the given path.  Calling `setPath` will setup the following:

  * `upload.req` - xhr object
  * `upload.body` - FormData

### Upload#setParamName(name)

  Use a parameter name other than `file` for your file.

### Upload#start(fn)

  Start the upload.

## Custom example

  If the defaults are not correct for you use case, you can modify your upload before starting:
  In this example we have to include some extra information with our upload:

  * the parameter name for the file is `audio` instead of `file`
  * `upload.req` (the xhr) is accessed to set an Authorization header
  * `upload.body` (the FormData) is accessed to append an additional form field

```js
var upload = new Upload(file);
upload.setPath('https://uploads.example.com/');
upload.setParamName('audio');
upload.req.setRequestHeader('Authorization', myAuth);
upload.body.append('templateId', 'some-uuid');
upload.start(function() {
  console.log('hooray!');
});
```

## Running tests

  Run the Express test server:

```
$ npm install
$ make test
```

# License

  MIT

