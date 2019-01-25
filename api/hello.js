var thrift = require('thrift');
var HelloSvc = require('./gen-nodejs/HelloSvc.js');

var helloHandler = {
	hello_func: function(result) {
		this.call_counter = this.call_counter || 0;
		console.log("Client call: " + (++this.call_counter));
		result(null, "Hello Thrift! request number: " + this.call_counter);
	}
}

var helloService = {
	transport: thrift.TBufferedTransport,
	protocol: thrift.TJSONProtocol,
	processor: HelloSvc,
	handler: helloHandler
};

var cors = []
cors["http://localhost:8000"] = true;

var ServerOptions = {
  cors: cors,
	files: ".",
	services: {
		"/hello": helloService,
	}
}

var server = thrift.createWebServer(ServerOptions);
var port = 8585;
server.listen(port);
console.log("Http/Thrift Server running on port: " + port);
