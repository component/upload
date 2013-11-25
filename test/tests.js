
var Upload = require('upload');

var file = new Blob(['blob'], {type: 'text/blob'});

function assert(expr, msg) {
  if (!expr) throw new Error(msg || 'assertion failed');
}

describe('Upload', function(){
  it('should be an emitter', function(done){
    var upload = new Upload('something');
    upload.on('something', done);
    upload.emit('something');
  })

  it('should work without new', function(){
    assert('something' == Upload('something').file);
  })

  describe('#to(path)', function(){
    it('should POST to the given path', function(done){
      var upload = new Upload(file);
      assert(file == upload.file, '.file');
      upload.to('/upload');
      upload.on('end', function(res){
        assert(200 == res.status, '200 response');
        done();
      });
    })

    it('should emit "progress" events', function(done){
      var upload = new Upload(file);
      upload.to('/upload');

      upload.on('progress', function(e){
        assert('progress' == e.type);
        assert(e.percent, 'e.percent');
      });

      upload.on('end', function(res){
        done();
      });
    })
  })

  describe('#to(path, [fn])', function(){
    it('should pass errors', function(done){
      var upload = new Upload(file);
      upload.to('/failure', function(err){
        assert('Internal Server Error: something blew up' == err.message);
        assert(500 == err.status);
        done();
      });
    })

    it('should upload in request body', function(done){
      var upload = new Upload(file, { type: 'body' });
      upload.to('/upload/body', function(err, res){
        var resLength = parseInt(res.getResponseHeader('content-length'), 10)
          , resType = res.getResponseHeader('content-type');
        assert(file.size == resLength);
        assert(file.type == resType);
        assert(!err);
        done();
      });
    })

    it('should pass responses', function(done){
      var upload = new Upload(file);
      upload.to('/upload', function(err, res){
        assert(!err);
        assert(200 == res.status);
        done();
      });
    })
  })
})
