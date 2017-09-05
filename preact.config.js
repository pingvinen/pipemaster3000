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
	
	// Configure the webpack dev server to proxy all /api/* requests to the dotnet backend
	config.devServer = {
		historyApiFallback: {
			index: 'index.html'
		}
	};
}
