
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

### Upload(file, options)

  Initialize an `Upload` with the given `file`, where `file`
  is a `File` object, for example from a `input.files[0]` `FileList`.

```js
var upload = new Upload(file, options);
var upload = Upload(file);
```

#### Options

  By default the file is uploaded as multipart/form-data.
  To upload it directly in the request body set `type` to `body`.
  
  - `type`            `form-data` or `body`
  - `method`          The used http method

### Upload#to(path, [fn])

  Upload to `path` and invoke `fn(err, res)`.

```js
upload.to('/upload');
upload.on('progress', reportProgress);
upload.on('end', done);
```

## Running tests

  Run the Express test server:

```
$ npm install
$ make test
```

# License

  MIT

