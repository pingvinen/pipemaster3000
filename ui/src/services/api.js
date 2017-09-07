/**
 * @param {Response} response
 * @returns {Promise} Resolves with an object like { response: .., json: ... }
 */
async function getJsonFromResponse(response) {
    return await response.json();
}

/**
 * Get url from server and make a pretty response
 * @param {string} url
 * @returns {Promise} Resolves with the parsed response body
 */
async function get(url) {
    const response = await fetch(url, { method: 'GET' });
    return await getJsonFromResponse(response);
}

export default {
    get
}