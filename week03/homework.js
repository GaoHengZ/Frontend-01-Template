/**
 * 
 * @param {String} string 
 * @param {Number} scale  进制
 */
function convertStringToNumber(string, scale) {
	if (!scale) {
		scale = 10;
	}
	var chars = string.split("");
	var number = 0;

	// 整数
	var i = 0;
	while (i < chars.length && chars[i] !== ".") {
		number = number * scale;
		number += chars[i].codePointAt(0) - "0".codePointAt(0);
		i++;
	}
	if (chars[i] === ".") {
		i++;
	}

	// 小数
	var fraction = 1;
	while (i < chars.length) {
		fraction = fraction / scale;
		number += (chars[i].codePointAt(0) - "0".codePointAt(0)) * fraction;
		i++;
	}
	return number;
} 

/**
 * 
 * @param {Number} number 
 * @param {Number} scale 进制
 */
function convertNumberToString(number, scale) {
	if (!scale) {
		scale = 10;
	}

	var FRACTION_INDEX = 1;
	var fractionLength = 0;

	var splitArray = (number + "").split(".");
	if (splitArray[FRACTION_INDEX]) {
		fractionLength = splitArray[FRACTION_INDEX].length;
	}
	
	var integer = Math.floor(number);
	var fraction = (number - integer).toFixed(fractionLength);
	var string = "";

	while (integer > 0) {
		string = integer % scale + string;
		integer = Math.floor(integer / scale);
	}
	if (fraction > 0) {
		string += ".";
	}
	var i = 0;
	var int = 0;
	while (i < fractionLength) {
		fraction = fraction * scale;
		int = i === fractionLength - 1 ? Math.round(fraction) : Math.floor(fraction);
		string += int;
		fraction -= int;
		i++;
	}
	return string;
}