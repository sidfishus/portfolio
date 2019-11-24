/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ClientApp/boot-client.tsx":
/*!***********************************!*\
  !*** ./ClientApp/boot-client.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nInvariant Violation: [BABEL] C:\\\\code\\\\react spa\\\\ClientApp\\\\boot-client.tsx: Invalid Option: The 'useBuiltIns' option must be either\\n    'false' (default) to indicate no polyfill,\\n    '\\\"entry\\\"' to indicate replacing the entry polyfill, or\\n    '\\\"usage\\\"' to import only used polyfills per file (While processing: \\\"C:\\\\\\\\code\\\\\\\\react spa\\\\\\\\node_modules\\\\\\\\@babel\\\\\\\\preset-env\\\\\\\\lib\\\\\\\\index.js\\\")\\n    at invariant (C:\\\\code\\\\react spa\\\\node_modules\\\\invariant\\\\invariant.js:40:15)\\n    at validateUseBuiltInsOption (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\preset-env\\\\lib\\\\normalize-options.js:126:26)\\n    at normalizeOptions (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\preset-env\\\\lib\\\\normalize-options.js:167:23)\\n    at _default (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\preset-env\\\\lib\\\\index.js:206:37)\\n    at C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\helper-plugin-utils\\\\lib\\\\index.js:19:12\\n    at loadDescriptor (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\full.js:167:14)\\n    at cachedFunction (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\caching.js:33:19)\\n    at loadPresetDescriptor (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\full.js:257:36)\\n    at config.presets.reduce (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\full.js:79:21)\\n    at Array.reduce (<anonymous>)\\n    at recurseDescriptors (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\full.js:76:38)\\n    at loadFullConfig (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\full.js:110:6)\\n    at process.nextTick (C:\\\\code\\\\react spa\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transform.js:28:33)\\n    at process._tickCallback (internal/process/next_tick.js:61:11)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL0NsaWVudEFwcC9ib290LWNsaWVudC50c3guanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ClientApp/boot-client.tsx\n");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./ClientApp/boot-client.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./ClientApp/boot-client.tsx */"./ClientApp/boot-client.tsx");


/***/ })

/******/ });