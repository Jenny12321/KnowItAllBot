const request = require('request');

var jsonBody = {'params': 'what is the longest word?'};

  // 		request.post({
		//   url:     'http://127.0.0.1:5000/postmethod',
		//   headers: {'content-type' : 'application/json'},
		//   body:    jsonBody,
		// }, function(error, response, body){
		//   console.log(response);
		// });
if (!(1 === 3)) {
	console.log("asdf")
}
request({
		url: "http://127.0.0.1:5000/postmethod",
	 method: "POST",
	 json: {
	 	params: {'resolvedQuery': 'what is the longest word?'},
	 }}, function(error, response, body) {
	 	console.error("ASFDF");
	 	console.error(body.toString());
})
