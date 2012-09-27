
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

### Upload#to(path)

  __POST__ the multipart upload to `path`.

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

