/**
 * @param {Response} response
 * @returns {Promise} Resolves with the parsed body
 */
function getJsonFromResponse(response) {
    return response.json();
}

/**
 * Get url from server and make a pretty response
 * @param {string} url
 * @returns {Promise} Resolves with the parsed response body
 */
async function get(url) {
    fetch(url, { method: 'GET' })
        .then(response => {
            return getJsonFromResponse(response);
        });
}

export default {
    get
}