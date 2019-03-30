var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../app');
  });
  afterEach(function () {
    var serverclose = server.listen(3000);
    serverclose.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('responds to /test', function testSlash(done) {
    request(server)
      .get('/test')
      .expect(200, done);
    });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});