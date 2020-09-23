
const merge = require("webpack-merge");
const path = require("path");

// Shared between both the server and client output
const sharedConfigStd = {
	module: {
		rules: [
			{
				test: /(\.ts|\.tsx|\.jsx)/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", {
									"targets": {
										"browsers": [
											"last 2 versions",
											"IE >= 11"
										]
									},
                                    "useBuiltIns": "entry",
                                    "corejs": "3"
                                }],
                                "@babel/preset-react"
                            ],
							plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"react-hot-loader/babel"
							]
						}
					},
					"ts-loader",
				]
			},
		]
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts', '.jsx'],
		alias: {
			"react-dom": "@hot-loader/react-dom"
		}
    },
	stats: { modules: false }, /* This changes the run webpack output */
};

// Client config settings which never change
const clientConfigStd = merge(sharedConfigStd, {
	entry: {
		"main-client": [
			"@hot-loader/react-dom",
            "@babel/polyfill",
            "core-js",
			"./ClientApp/boot-client.tsx"
		]
    },
    output: {
		path: path.join(__dirname,"/wwwroot/js"),
		// Key for hot module replacement (below). Corresponds to the
		// WebpackDevMiddlewareOptions.HotModuleReplacementEndpoint option directory
		publicPath: "/wwwroot/"
	},
});

// Server config settings which never change
const serverBundleConfigStd = merge(sharedConfigStd, {
	entry: {
		"main-server": [
			"@hot-loader/react-dom",
            "@babel/polyfill",
            "core-js",
			"./ClientApp/boot-server.tsx"
		]
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, "./Server")
	},
	target: "node"
});

const fMainFilename = (clientOrServer, isDev) => {
	return `main-${clientOrServer}${((isDev)?"-debug":"")}.js`;
};

module.exports = (env, argv) => {

	//console.log(argv);

	const isDev=(!argv || argv.mode === "development");

	const mode = {
		mode: ((isDev)?"development":"production")
	};

	const clientDevOptional = ((!isDev)?{}:{
		devtool: "eval-source-map",
	});

	const serverDevOptional = ((!isDev)?{}:{
		devtool: "inline-source-map",
	});
	
	const clientConfig={
		...clientConfigStd,
		...mode,
		...clientDevOptional,
		output: {
			...clientConfigStd.output,
			filename: fMainFilename("client", isDev)
		}
	};

	const serverConfig={
		...serverBundleConfigStd,
		...mode,
		...serverDevOptional,
		output: {
			...serverBundleConfigStd.output,
			filename: fMainFilename("server", isDev)
		}
	};

	return [clientConfig,serverConfig];
};