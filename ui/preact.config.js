const path = require('path');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
	// Configure require aliases 

	// DO NOT OVERRIDE THE ENTIRE alias!!!
	// If you do that, then preact itself fails
	// config.resolve.alias = {
	// };
	config.resolve.alias['root'] = path.resolve(__dirname, 'src');
    config.resolve.alias['api'] = path.resolve(__dirname, 'src', 'services', 'api.js');
	
	config.devServer = {
		historyApiFallback: {
			index: 'index.html'
		},
        proxy: [{
		    path: '/api/**',
            target: 'http://localhost:3000',
            pathRewrite: {"^/api" : ""}
        }]
	};
}
