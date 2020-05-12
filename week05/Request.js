const net = require("net");
const ResponseParser = require("./ResponseParser");
class Request {
	constructor(props) {
		this.method = props.method || "GET";
		this.host = props.host;
		this.port = props.port || 80;
		this.headers = props.headers || {};
		this.path = props.path || "/";
		this.body = props.body || {};
		this.bodyText = "";
		this.init();
	}
	init() {
		this.initHeaders();
	}
	initHeaders() {
		let contentType = this.headers["Content-Type"] || "application/x-www-urlencoded";
		if (contentType === "application/x-www-urlencoded") {
			this.bodyText = Object.keys(this.body).map((key) => {
				return `${key}=${encodeURIComponent(this.body[key])}`;
			}).join("&");
		}
		if (contentType === "text/json") {
			this.bodyText = JSON.stringify(this.body);
		}
		this.headers["Content-Type"] = contentType;
		this.headers["Content-Length"] = this.bodyText.length;
	}
	get Message() {
		const {method, path, headers, bodyText} = this;
		const CRLF = "\r\n";
		const REQUEST_LINE = `${method} ${path} HTTP/1.1` + CRLF;
		const REQUEST_HEAD = Object.keys(headers).map((key) => {
			return `${key}: ${headers[key]}` + CRLF;
		}).join("");
		return REQUEST_LINE + REQUEST_HEAD + CRLF + bodyText;
	}

	send(connection) {
		const {port, host, Message} = this;
		const parser = new ResponseParser();
		return new Promise((resolve, reject) => {
			if (connection) {
				console.info("------connected to server!------------");
				connection.write(Message);
			} else {
				connection = net.createConnection({host, port}, () => {
					console.info("------connected to server!------------");
					connection.write(Message);
				});
			}
			connection.on("data", (data) => {
				parser.receive(data.toString());
				if (parser.isFinished) {
					resolve(parser.response);
					connection.end();
				}
			});
			connection.on("end", () => {
				console.info("-------disconnected from server----------");
			});
			connection.on("error", err => {
				console.error("err", err);
				reject(err);
				connection.end();
			});
		});
	}
}


module.exports = Request;