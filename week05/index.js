const HttpRequest = require("./Request");

const request = new HttpRequest({
	port : "8880",
	host : "127.0.0.1",
	method : "GET",
	body : {
		name : "custom"
	}
});
request.send().then(res => {
	console.log(res.body);
}).catch(err => {
	console.log(err);
});