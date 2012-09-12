
var Upload = require('upload');

var input = document.getElementById('file');

function assert(expr, msg) {
  if (!expr) throw new Error(msg || 'assertion failed');
}

describe('Upload', function(){
  it('should be an emitter', function(done){
    var upload = new Upload;
    upload.on('something', done);
    upload.emit('something');
  })
})

describe('Upload#to(path)', function(){
  it('should POST to the given path', function(done){
    this.timeout(0);
    input.addEventListener('change', function(){
      var file = input.files[0];
      var upload = new Upload(file);
      assert(file == upload.file, '.file');
      upload.to('/upload');
      upload.on('end', function(res){
        assert(200 == res.status, '200 response');
        done();
      });
    }, false);
  })
})