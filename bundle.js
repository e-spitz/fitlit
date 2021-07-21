/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Montserrat', 'sans-serif';\n  color: #ffffff;\n}\n\nhtml {\n  height: 100vh;\n  width: 100vw;\n}\n\nbody, html {\n  background-color: #161C23;\n  padding-bottom: 4%;\n}\n\nh1 {\n  text-align: center;\n}\n\nh2, h3 {\n  color: #3cba9f;\n  font-size: 2em;\n  margin-left: 1%;\n  padding-top: 1%;\n}\n\nh3{\n  margin-top: 6%;\n}\n\n.fas {\n  margin-right: 1%;\n}\n\nheader {\n  background-color: #3c3e3c;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n\n.greeting {\n  font-size: 3em;\n  font-weight: bold;\n  margin-left: 6%;\n  margin-bottom: 0;\n  padding-bottom: 6%;\n}\n\n.user-stride, .user-step-goal, .user-address, .user-email {\n  font-size: 1.2em;\n  margin-right: .5em;\n  margin-top: -1em;\n}\n\n.profile-sections {\n  color: #3cba9f;\n  font-weight: bold;\n  font-size: 1.5em;\n}\n\n.step-info {\n  border: 1px solid #3cba9f;\n  border-radius: 2%;\n  font-size: 1.5em;\n  padding: 1%;\n  text-align: center;\n  height: 100%;\n  width: 20%;\n}\n\n.steps-goal, .average-steps {\n  font-weight: 500;\n  margin: 0;\n  padding: 5%;\n}\n\n.steps, .avg-user-steps {\n  font-size: 1.75em;\n  font-weight: lighter;\n  padding: 2.5%;\n}\n\n.steps-goal {\n  color: #3e95cd;\n}\n\n.average-steps {\n  color: #8e5ea2;\n}\n\n.hydration-section, .sleep-section {\n  height: 75%;\n  width: 100%;\n  margin-bottom: -5%;\n  margin-left: 1%;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  justify-content: space-around;\n  align-items: center;\n  gap: 1em;\n}\n\n.info-card {\n  background-color: #3c3e3c;\n  border-radius: 2.5%;\n  height: 100%;\n  width: 90%;\n  display: flex;\n  justify-content: center;\n}\n\n.user-profile-info {\n  display: flex;\n  justify-content: space-evenly;\n  margin-left: 4%;\n}\n\n.water-stat {\n  display: flex;\n  flex-direction: column;\n}\n\n.steps-chart {\n  float: right;\n  height: 25%;\n  width: 25%;\n}\n\n.weekly-hydration-chart,\n.weekly-sleep-chart,\n.daily-water-chart {\n  height: 70%;\n  width: 70%;\n  padding: 1em;\n}\n\nh4, h5, h6 {\n  font-size: 1.8em;\n  font-weight: lighter;\n  margin: 5%;\n  text-align: center;\n}\n\n.display-number {\n  font-size: 4em;\n}\n\n.water-text-styling {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.sleep-card-styling {\n  display: flex;\n  flex-direction: column;\n}\n\n.adjacent-stats {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.sleep-word-alignment {\n  display: flex;\n  flex-direction:column;\n  align-items:center;\n}\n\n/* small screen or tablet */\n@media screen and (max-width: 1050px) {\n\n  .step-info {\n    font-size: 1.5em;\n    height: 50%;\n    width: 50%;\n    margin-bottom: 1em;\n  }\n\n  .steps-goal, .average-steps {\n    font-weight: 500;\n    padding: 3%;\n  }\n\n  .steps-chart {\n    height: 40%;\n    width: 40%;\n  }\n}\n\n/* iPad */\n@media screen and (max-width: 768px) {\n\n  .greeting {\n    font-weight: 500;\n    margin: 0;\n    margin-top: 1em;\n    padding-bottom: .5em;\n    text-align: center;\n  }\n\n  header {\n    height: 20%;\n    width: 100%;\n  }\n\n  .user-stride, .user-step-goal, .user-address, .user-email {\n    font-size: 1.5em;\n    margin-top: -1em;\n  }\n\n  .step-info {\n    font-size: 1.5em;\n    height: 40%;\n    width: 40%;\n    padding-top: .5em;\n    padding-bottom: .5em;\n  }\n\n  .steps-goal, .average-steps {\n    font-size: .8em;\n    font-weight: 500;\n    padding: 2%;\n  }\n\n  .steps, .avg-user-steps {\n    font-size: 1.8em;\n  }\n\n  .steps-chart {\n    height: 40%;\n    width: 40%;\n    margin-right: 1em;\n  }\n\n  h2, h3 {\n    border-bottom: 3px solid #3e95cd;\n    font-size: 2.25em;\n    padding-bottom: .25em;\n  }\n\n  h4, h5, h6 {\n    margin-top: 0;\n  }\n\n  .display-number {\n    font-size: 3.8em;\n  }\n\n  .hydration-section, .sleep-section {\n    grid-template-columns: repeat(1, 1fr);\n    gap: .4em;\n    margin-left: 15%;\n  }\n\n  .info-card {\n    height: 85%;\n    width: 70%;\n    margin-bottom: 5%;\n    margin-top: 5%;\n  }\n\n  .weekly-hydration-chart, .weekly-sleep-chart {\n    height: 50%;\n    width: 70%;\n  }\n}\n\n/* mobile device */\n@media screen and (max-width: 480px) {\n\n  .greeting {\n    font-size: 2em;\n    font-weight: 500;\n    text-align: center;\n  }\n\n  .user-profile-info {\n    height: 50%;\n    width: 100%;\n    margin: 0;\n    padding-bottom: 1em;\n  }\n\n  .profile-sections {\n    color: #3cba9f;\n    font-weight: 400;\n    font-size: 1em;\n  }\n\n  .user-stride, .user-step-goal, .user-address, .user-email {\n    font-size: .7em;\n  }\n\n  .step-info {\n    font-size: .7em;\n    padding: 1%;\n    height: 50%;\n    width: 60%;\n    border: 1px solid #3cba9f;\n    text-align: center;\n    border-radius: 2%;\n  }\n\n  .steps-chart {\n    height: 70%;\n    width: 70%;\n  }\n\n  h4, h5, h6 {\n    font-size: 1.5em;\n  }\n\n  .display-number {\n    font-size: 3em;\n  }\n\n  .weekly-hydration-chart,\n  .weekly-sleep-chart,\n  .daily-water-chart {\n    height: 90%;\n    width: 90%;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["* {\n  font-family: 'Montserrat', 'sans-serif';\n  color: #ffffff;\n}\n\nhtml {\n  height: 100vh;\n  width: 100vw;\n}\n\nbody, html {\n  background-color: #161C23;\n  padding-bottom: 4%;\n}\n\nh1 {\n  text-align: center;\n}\n\nh2, h3 {\n  color: #3cba9f;\n  font-size: 2em;\n  margin-left: 1%;\n  padding-top: 1%;\n}\n\nh3{\n  margin-top: 6%;\n}\n\n.fas {\n  margin-right: 1%;\n}\n\nheader {\n  background-color: #3c3e3c;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n\n.greeting {\n  font-size: 3em;\n  font-weight: bold;\n  margin-left: 6%;\n  margin-bottom: 0;\n  padding-bottom: 6%;\n}\n\n.user-stride, .user-step-goal, .user-address, .user-email {\n  font-size: 1.2em;\n  margin-right: .5em;\n  margin-top: -1em;\n}\n\n.profile-sections {\n  color: #3cba9f;\n  font-weight: bold;\n  font-size: 1.5em;\n}\n\n.step-info {\n  border: 1px solid #3cba9f;\n  border-radius: 2%;\n  font-size: 1.5em;\n  padding: 1%;\n  text-align: center;\n  height: 100%;\n  width: 20%;\n}\n\n.steps-goal, .average-steps {\n  font-weight: 500;\n  margin: 0;\n  padding: 5%;\n}\n\n.steps, .avg-user-steps {\n  font-size: 1.75em;\n  font-weight: lighter;\n  padding: 2.5%;\n}\n\n.steps-goal {\n  color: #3e95cd;\n}\n\n.average-steps {\n  color: #8e5ea2;\n}\n\n.hydration-section, .sleep-section {\n  height: 75%;\n  width: 100%;\n  margin-bottom: -5%;\n  margin-left: 1%;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  justify-content: space-around;\n  align-items: center;\n  gap: 1em;\n}\n\n.info-card {\n  background-color: #3c3e3c;\n  border-radius: 2.5%;\n  height: 100%;\n  width: 90%;\n  display: flex;\n  justify-content: center;\n}\n\n.user-profile-info {\n  display: flex;\n  justify-content: space-evenly;\n  margin-left: 4%;\n}\n\n.water-stat {\n  display: flex;\n  flex-direction: column;\n}\n\n.steps-chart {\n  float: right;\n  height: 25%;\n  width: 25%;\n}\n\n.weekly-hydration-chart,\n.weekly-sleep-chart,\n.daily-water-chart {\n  height: 70%;\n  width: 70%;\n  padding: 1em;\n}\n\nh4, h5, h6 {\n  font-size: 1.8em;\n  font-weight: lighter;\n  margin: 5%;\n  text-align: center;\n}\n\n.display-number {\n  font-size: 4em;\n}\n\n.water-text-styling {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.sleep-card-styling {\n  display: flex;\n  flex-direction: column;\n}\n\n.adjacent-stats {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.sleep-word-alignment {\n  display: flex;\n  flex-direction:column;\n  align-items:center;\n}\n\n/* small screen or tablet */\n@media screen and (max-width: 1050px) {\n\n  .step-info {\n    font-size: 1.5em;\n    height: 50%;\n    width: 50%;\n    margin-bottom: 1em;\n  }\n\n  .steps-goal, .average-steps {\n    font-weight: 500;\n    padding: 3%;\n  }\n\n  .steps-chart {\n    height: 40%;\n    width: 40%;\n  }\n}\n\n/* iPad */\n@media screen and (max-width: 768px) {\n\n  .greeting {\n    font-weight: 500;\n    margin: 0;\n    margin-top: 1em;\n    padding-bottom: .5em;\n    text-align: center;\n  }\n\n  header {\n    height: 20%;\n    width: 100%;\n  }\n\n  .user-stride, .user-step-goal, .user-address, .user-email {\n    font-size: 1.5em;\n    margin-top: -1em;\n  }\n\n  .step-info {\n    font-size: 1.5em;\n    height: 40%;\n    width: 40%;\n    padding-top: .5em;\n    padding-bottom: .5em;\n  }\n\n  .steps-goal, .average-steps {\n    font-size: .8em;\n    font-weight: 500;\n    padding: 2%;\n  }\n\n  .steps, .avg-user-steps {\n    font-size: 1.8em;\n  }\n\n  .steps-chart {\n    height: 40%;\n    width: 40%;\n    margin-right: 1em;\n  }\n\n  h2, h3 {\n    border-bottom: 3px solid #3e95cd;\n    font-size: 2.25em;\n    padding-bottom: .25em;\n  }\n\n  h4, h5, h6 {\n    margin-top: 0;\n  }\n\n  .display-number {\n    font-size: 3.8em;\n  }\n\n  .hydration-section, .sleep-section {\n    grid-template-columns: repeat(1, 1fr);\n    gap: .4em;\n    margin-left: 15%;\n  }\n\n  .info-card {\n    height: 85%;\n    width: 70%;\n    margin-bottom: 5%;\n    margin-top: 5%;\n  }\n\n  .weekly-hydration-chart, .weekly-sleep-chart {\n    height: 50%;\n    width: 70%;\n  }\n}\n\n/* mobile device */\n@media screen and (max-width: 480px) {\n\n  .greeting {\n    font-size: 2em;\n    font-weight: 500;\n    text-align: center;\n  }\n\n  .user-profile-info {\n    height: 50%;\n    width: 100%;\n    margin: 0;\n    padding-bottom: 1em;\n  }\n\n  .profile-sections {\n    color: #3cba9f;\n    font-weight: 400;\n    font-size: 1em;\n  }\n\n  .user-stride, .user-step-goal, .user-address, .user-email {\n    font-size: .7em;\n  }\n\n  .step-info {\n    font-size: .7em;\n    padding: 1%;\n    height: 50%;\n    width: 60%;\n    border: 1px solid #3cba9f;\n    text-align: center;\n    border-radius: 2%;\n  }\n\n  .steps-chart {\n    height: 70%;\n    width: 70%;\n  }\n\n  h4, h5, h6 {\n    font-size: 1.5em;\n  }\n\n  .display-number {\n    font-size: 3em;\n  }\n\n  .weekly-hydration-chart,\n  .weekly-sleep-chart,\n  .daily-water-chart {\n    height: 90%;\n    width: 90%;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAPIData": () => (/* binding */ fetchAPIData)
/* harmony export */ });
const fetchAPIData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(error => console.log('error: ', error))
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Hydration {
  constructor(hydrationData) {
    this.userID = hydrationData.userID;
    this.date = hydrationData.date;
    this.numOunces = hydrationData.numOunces;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hydration);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class HydrationRepo {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getHydrationById(id) {
    return this.hydrationData.filter(hydration => hydration.userID === id)
  }

  calculateAvgOuncesPerDay(id) {
    let userHydrationData = this.getHydrationById(id);
    let totalUserOunces = userHydrationData.reduce((sum, hydration) => {
      sum += hydration.numOunces;
      return sum;
    }, 0);
    let roundedOunces = Math.round(totalUserOunces / userHydrationData.length);
    return roundedOunces;
  }

  getOuncesByDate(id, date) {
    let userHydrationData = this.getHydrationById(id);
    let ouncesByDate = userHydrationData.find(hydration => hydration.date === date);
    return ouncesByDate.numOunces;
  }

  getOuncesByWeek(id, date) {
    let userHydrationData = this.getHydrationById(id);
    let hydrationDates = userHydrationData.map(hydration => hydration.date);
    let indexOfDate = hydrationDates.indexOf(date);
    let hydrationByDate = userHydrationData.slice(indexOfDate - 6, indexOfDate + 1);
    return hydrationByDate.reduce((obj, hydration) => {
      obj[hydration.date] = hydration.numOunces;
      return obj;
    }, {});
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HydrationRepo);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Sleep {
  constructor(sleepData) {
    this.userID = sleepData.userID;
    this.date = sleepData.date;
    this.hoursSlept = sleepData.hoursSlept;
    this.sleepQuality = sleepData.sleepQuality;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sleep);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getSleepById(id) {
    return this.sleepData.filter(sleep => sleep.userID === id);
  }

  calculateAvgSleepStatPerDay(id, stat) {
    let userSleepData = this.getSleepById(id);
    let totalStatSum = userSleepData.reduce((sum, sleep) => {
      sum += sleep[stat];
      return sum;
    }, 0);
    let roundedStatNum = parseInt((totalStatSum / userSleepData.length).toFixed(1));
    return roundedStatNum;
  }

  getSleepStatByDate(id, date, stat) {
    let userSleepData = this.getSleepById(id);
    let hoursByDate = userSleepData.find(sleep => sleep.date === date);
    return hoursByDate[stat];
  }

  getSleepStatsByWeek(id, date, stat) {
    let userSleepData = this.getSleepById(id);
    let sleepDates = userSleepData.map(sleep => sleep.date);
    let indexOfDate = sleepDates.indexOf(date);
    let sleepByDate = userSleepData.slice(indexOfDate - 6, indexOfDate + 1)
    return sleepByDate.reduce((obj, sleep) => {
      obj[sleep.date] = sleep[stat];
      return obj;
    }, {});
  }

  getAvgSleepStatsByWeek(id, date, stats) {
    const statsPerWeek = this.getSleepStatsByWeek(id, date, stats);
    const weeklyStatsSum = Object.values(statsPerWeek).reduce((sum, stat) => {
      sum += stat
      return sum
    }, 0)
    const roundedAvg = (weeklyStatsSum / 7).toFixed(1)
    return roundedAvg;
  }

  getAvgSleepQualityForUsers() {
    let avgQuality = this.sleepData.reduce((sum, sleep) => {
      sum += sleep.sleepQuality;
      return sum;
    }, 0);
    let roundedAvg = Math.round(avgQuality / this.sleepData.length);
    return roundedAvg;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SleepRepo);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.friends = user.friends;
  }

  returnFirstName() {
    const splitName = this.name.split(' ');
    return splitName[0];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class UserRepository {
  constructor(userData) {
    this.userData = userData;
  }

  returnUserData(id) {
    return this.userData.find(user => user.id === id);
  }

  calculateAvgStepGoal() {
    let avgStepGoal = this.userData.reduce((sum, user) => {
      sum += user.dailyStepGoal;
      return sum;
    }, 0);

    let roundedAvg = Math.round(avgStepGoal / this.userData.length);
    return roundedAvg;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRepository);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Hydration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _HydrationRepository__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Sleep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _SleepRepository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _UserRepository__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
// IMPORTS










// QUERY SELECTORS
const address = document.getElementById('address');
const avgSteps = document.getElementById('avgSteps');
const dailySleepHours = document.getElementById('dailySleepHours');
const dailySleepQuality = document.getElementById('dailySleepQuality');
const dailyWater = document.getElementById('dailyWater');
const dailyWaterChart = document.getElementById('dailyWaterChart');
const email = document.getElementById('email');
const greeting = document.getElementById('greeting');
const stepsChart = document.getElementById('stepsChart');
const stepGoal = document.getElementById('stepGoal');
const stepGoal2 = document.getElementById('stepGoal2');
const strideLength = document.getElementById('strideLength');
const weeklyHydrationChart = document.getElementById('weeklyHydrationChart');
const weeklySleepChart = document.getElementById('weeklySleepChart');
const weeklySleepHours = document.getElementById('weeklySleepHours');
const weeklySleepQuality = document.getElementById('weeklySleepQuality');

let currentDate;
let hydration;
let hydrationRepo;
let sleep;
let sleepRepo;
let user;
let userRepo;

// EVENT LISTENERS
window.addEventListener('load', function() {
  generateUser();
  setUpUserRepo();
  generateHydration();
  setUpHydrationRepo();
  generateSleep();
  setUpSleepRepo();
});

// API CALLS
const generateUser = () => {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAPIData)('users')
    .then(data => user = new _User__WEBPACK_IMPORTED_MODULE_6__.default(data.userData[Math.floor(Math.random() * data.userData.length)]))
    .then(data => displayUserProfile(user))
}

const setUpUserRepo = () => {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAPIData)('users')
    .then(data => userRepo = new _UserRepository__WEBPACK_IMPORTED_MODULE_7__.default(data.userData))
    .then(data => displayStepGoals())
}

const generateHydration = () => {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAPIData)('hydration')
    .then(data => hydration = new _Hydration__WEBPACK_IMPORTED_MODULE_2__.default(data.hydrationData[user.id - 1]))
}

const setUpHydrationRepo = () => {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAPIData)('hydration')
    .then(data => hydrationRepo = new _HydrationRepository__WEBPACK_IMPORTED_MODULE_3__.default(data.hydrationData))
    .then(data => displayHydration())
}

const generateSleep = () => {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAPIData)('sleep')
    .then(data => sleep = new _Sleep__WEBPACK_IMPORTED_MODULE_4__.default(data.sleepData[user.id - 1]))
}

const setUpSleepRepo = () => {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAPIData)('sleep')
    .then(data => sleepRepo = new _SleepRepository__WEBPACK_IMPORTED_MODULE_5__.default(data.sleepData))
    .then(data => displayDailySleepStats())
    .then(data => displayWeeklySleepAvgs())
}

// FUNCTIONS
const displayUserProfile = (user) => {
  strideLength.insertAdjacentHTML('afterend', `<p class='user-stride'>${user.strideLength}</p>`);
  email.insertAdjacentHTML('afterend', `<p class='user-email'>${user.email}</p>`);
  stepGoal.insertAdjacentHTML('afterend', `<p class='user-step-goal'>${user.dailyStepGoal}</p>`);
  changeAddressFormat();
  displayGreeting(user);
}

const changeAddressFormat = () => {
  let split = user.address.split(', ')
  let street = split[0];
  let cityStateZip = split[1];
  address.insertAdjacentHTML('afterend', `<p class='user-address'>${street},<br>${cityStateZip}</p>`);
}

const displayGreeting = (user) => {
  const firstName = user.returnFirstName();
  greeting.innerText = `Welcome, ${firstName}!`;
}

const displayStepGoals = () => {
  const userAvg = userRepo.calculateAvgStepGoal();
  stepGoal2.insertAdjacentHTML('afterend', `<div class='steps'> ${user.dailyStepGoal}</div>`);
  avgSteps.insertAdjacentHTML('afterend', `<div class='avg-user-steps'> ${userAvg}</div>`);
  displayStepChart();
}


const findCurrentDate = () => {
  currentDate = hydrationRepo.hydrationData.map(hydration => hydration.date).pop();
  return currentDate;
};

const findDailyHydration = () => {
  return hydrationRepo.getOuncesByDate(user.id, currentDate);
}

const displayHydration = () => {
  findCurrentDate();
  findDailyHydration();
  dailyWater.innerText = `${findDailyHydration()}`;
  displayWeeklyHydration();
  displayDailyWater();
}

const findDailyHoursOfSleep = () => {
  return sleepRepo.getSleepStatByDate(user.id, currentDate, 'hoursSlept');
}

const findDailySleepQuality = () => {
  return sleepRepo.getSleepStatByDate(user.id, currentDate, 'sleepQuality');
}

const displayDailySleepStats = () => {
  dailySleepHours.innerText = `${findDailyHoursOfSleep()}`;
  dailySleepQuality.innerText = `${findDailySleepQuality()}`;
}

const findWeeklySleepAvg = (stats) => {
  findDailyHoursOfSleep();
  displayDailySleepStats();
  return sleepRepo.getAvgSleepStatsByWeek(user.id, currentDate, stats);
}

const displayWeeklySleepAvgs = () => {
  findWeeklySleepAvg();
  weeklySleepHours.innerText = `${findWeeklySleepAvg('hoursSlept')}`;
  weeklySleepQuality.innerText = `${findWeeklySleepAvg('sleepQuality')}`;
  displayWeeklySleep();
}

// CHARTS
const displayStepChart = () => {
  let stepChart = new Chart(stepsChart, {
    type: 'bar',
    data: {
      labels: ['Daily Step Goal', 'Average User Goal'],
      datasets: [
        {
          label: 'Steps',
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [user.dailyStepGoal, userRepo.calculateAvgStepGoal()]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: false,
        text: ''
      }
    }
  });
}

const displayWeeklyHydration = () => {
  let weeklyHydration = new Chart(weeklyHydrationChart, {
    type: 'line',
    data: {
      labels: Object.keys(hydrationRepo.getOuncesByWeek(user.id, currentDate)),
      datasets: [{
        data: Object.values(hydrationRepo.getOuncesByWeek(user.id, currentDate)),
        label: "Ounces",
        borderColor: "#3e95cd",
        fill: false
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Hydration'
      }
    }
  });
}

const displayWeeklySleep = () => {
  let weeklySleep = new Chart(weeklySleepChart, {
    type: 'line',
    data: {
      labels: Object.keys(sleepRepo.getSleepStatsByWeek(user.id, currentDate, 'hoursSlept')),
      datasets: [{
        data: Object.values(sleepRepo.getSleepStatsByWeek(user.id, currentDate, 'hoursSlept')),
        label: "Hours Slept",
        borderColor: "#3e95cd",
        fill: false
      },
      {
        data: Object.values(sleepRepo.getSleepStatsByWeek(user.id, currentDate, 'sleepQuality')),
        label: "Sleep Quality",
        borderColor: "#3e95cd",
        fill: false
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Sleep Stats',
      }
    }
  });
}

const displayDailyWater = () => {
  let dailyWaterComp = new Chart(dailyWaterChart, {
    type: 'doughnut',
    data: {
      labels: ['Daily Water Consumption', 'Recommended Consumption'],
      datasets: [
        {
          label: 'Ounces of Water',
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [hydration.numOunces, 75]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Daily Water Consumption (in ounces)'
      }
    }
  });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map