// 1:1 duplicate from KGrabber. This way Tampermonkey correctly enforces @connect rules
/**
 * @typedef {Object} Response
 * @property {String} response
 */

/**
 * Makes an HTTP request
 * @param {String} method
 * @param {String} url
 * @param {Object} obj
 * @param {any} obj.data
 * @param {Object} obj.headers
 * @returns {Promise<Response>} Response
 * @private
 */
function request(method, url, { data, headers } = {}) {
	return new Promise((resolve, reject) => {
		GM_xmlhttpRequest({
			method,
			url,
			data,
			headers,
			onload: resolve,
			onerror: reject,
		});
	});
}

/**
 * Makes a HTTP GET request
 * @param {String} url
 * @param {Object} headers
 * @returns {Promise<Response>} Response
 */
exports.get = (url, headers) => {
	return request("GET", url, { headers });
};

/**
 * Makes a HTTP POST request
 * @param {String} url
 * @param {Object} headers
 * @param {Object} data
 * @returns {Promise<Response>} Response
 */
exports.post = (url, data, headers) => {
	return request("POST", url, { data, headers });
};

/**
 * Makes a HTTP HEAD request
 * @param {String} url
 * @param {Object} headers
 * @returns {Promise<Response>} Response
 */
exports.head = (url, headers) => {
	return request("HEAD", url, { headers });
};
