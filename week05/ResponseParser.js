class ResponseParser {
	constructor() {
		this.content = "";
		this.isFinished = false;
		this.WAITING_SATUTE_LINE = 1;
		this.WAITING_SATUTE_LINE_END = 2;
		this.WAITING_HEAD_LINE = 3;
		this.WAITING_HEAD_LINE_END = 4;
		this.WAITING_BODY = 5;
		this.WAITING_CHUNK_LINE = 6;
		this.WAITING_CHUNK_LINE_END = 7;
		this.READING_CHUNK = 8;
		this.current = this.WAITING_SATUTE_LINE;
		this.statusLine = "";
		this.headers = {};
		this.headerLine = "";
		this.bodyText = [];
	}
	get response() {
		this.resolveContent();
		this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
		return {
			statusCode : RegExp.$1,
			statusText : RegExp.$2,
			headers : this.headers,
			body : this.bodyText.join("").replace("\r\n0\r\n\r\n", "")
		};
	}
	resolveContent() {
		for (let i = 0; i < this.content.length; i++) {
			this.resolveChar(this.content.charAt(i));
		}
	}
	resolveChar(char) {
		if (this.current === this.WAITING_SATUTE_LINE) {
			if (char === "\r") {
				this.current = this.WAITING_SATUTE_LINE_END;
			} else {
				this.statusLine += char;
			}
		} else if (this.current === this.WAITING_SATUTE_LINE_END) {
			if (char === "\n") {
				this.current = this.WAITING_HEAD_LINE;
			}
		} else if (this.current === this.WAITING_HEAD_LINE) {
			if (char === "\r" && this.headerLine === "") {
				this.current = this.WAITING_BODY;
			} else if (char === "\r") {
				this.current = this.WAITING_HEAD_LINE_END;
				const objects = this.headerLine.split(":");
				this.headers[objects[0]] = objects[1];
				this.headerLine = "";
			} else {
				this.headerLine += char;
			}
		} else if (this.current === this.WAITING_HEAD_LINE_END) {
			if (char === "\n") {
				this.current = this.WAITING_HEAD_LINE;
			}
		} else if (this.current === this.WAITING_BODY) {
			if (char === "\n") {
				this.current = this.WAITING_CHUNK_LINE;
			}
		} else if (this.current === this.WAITING_CHUNK_LINE) {
			if (char === "\r") {
				this.current = this.WAITING_CHUNK_LINE_END;
			}
		} else if (this.current === this.WAITING_CHUNK_LINE_END) {
			if (char === "\n") {
				this.current = this.READING_CHUNK;
			}
		} else if (this.current === this.READING_CHUNK) {
			this.bodyText.push(char);
		}
	}
	receive(string) {
		this.content += string;
		if (string.substr(-7) === "\r\n0\r\n\r\n") {
			this.isFinished = true;
		}
	}
}
module.exports = ResponseParser;