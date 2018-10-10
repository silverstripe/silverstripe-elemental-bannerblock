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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_boot_registerComponents__ = __webpack_require__(3);




window.document.addEventListener('DOMContentLoaded', function () {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_boot_registerComponents__["a" /* default */])();
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_BlockLinkField_BlockLinkFieldComponent__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_BlockLinkFieldActions_BlockLinkFieldActions__ = __webpack_require__(6);




/* harmony default export */ __webpack_exports__["a"] = (function () {
  __WEBPACK_IMPORTED_MODULE_0_lib_Injector___default.a.component.registerMany({
    BlockLinkFieldComponent: __WEBPACK_IMPORTED_MODULE_1_components_BlockLinkField_BlockLinkFieldComponent__["a" /* default */],
    BlockLinkFieldActions: __WEBPACK_IMPORTED_MODULE_2_components_BlockLinkFieldActions_BlockLinkFieldActions__["a" /* default */]
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Component */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_FieldHolder_FieldHolder__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_FieldHolder_FieldHolder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_FieldHolder_FieldHolder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lib_Injector__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var BlockLinkFieldComponent = function (_Component) {
  _inherits(BlockLinkFieldComponent, _Component);

  function BlockLinkFieldComponent(props) {
    _classCallCheck(this, BlockLinkFieldComponent);

    var _this = _possibleConstructorReturn(this, (BlockLinkFieldComponent.__proto__ || Object.getPrototypeOf(BlockLinkFieldComponent)).call(this, props));

    _this.renderActionsMenu = _this.renderActionsMenubind(_this);
    _this.renderModal = _this.renderModal(_this);
    _this.handleLinkEdit = _this.handleLinkEdit.bind(_this);

    _this.state = {
      value: {
        PageID: null,
        Text: '',
        Description: '',
        TargetBlank: false
      }
    };

    return _this;
  }

  _createClass(BlockLinkFieldComponent, [{
    key: 'handleLinkEdit',
    value: function handleLinkEdit() {
      this.setState({
        value: {
          PageID: null,
          Text: '',
          Description: '',
          TargetBlank: false
        }
      });
    }
  }, {
    key: 'renderModal',
    value: function renderModal() {
      {}
    }
  }, {
    key: 'renderActionsMenu',
    value: function renderActionsMenu() {
      {}
      {}
      {}
      {}
      {}
      {}
    }
  }, {
    key: 'render',
    value: function render() {
      var id = 3;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          name: 'CallToActionLink',
          className: 'form-control block-link-field',
          onClick: this.renderModal
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'font-icon-link', id: 'banner-block-action-link__icon' + id }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          {
            className: 'block-link-field__content' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            {
              className: 'block-link-field__content--message' },
            'Changes will be visible upon save'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'block-link-field__actions' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'hidden', name: 'CallToActionLink', className: 'block-link-field',
          id: 'Form_ItemEditForm_CallToActionLink', value: 'null', onChange: this.handleLinkEdit }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'hidden', id: 'CallToActionLink_Title', value: 'Call To Action Link' })
      );
    }
  }]);

  return BlockLinkFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);



/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_lib_Injector__["inject"])(['BlockLinkFieldActions'], function (BlockLinkFieldActionsComponent) {
  return {
    BlockLinkFieldActionsComponent: BlockLinkFieldActionsComponent
  };
}, function () {
  return 'ElementEditor.BlockLinkFieldComponent';
}))(__WEBPACK_IMPORTED_MODULE_1_components_FieldHolder_FieldHolder___default()(BlockLinkFieldComponent)));

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Component */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_Injector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_Injector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lib_Injector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var BlockLinkFieldActions = function (_Component) {
  _inherits(BlockLinkFieldActions, _Component);

  function BlockLinkFieldActions(props) {
    _classCallCheck(this, BlockLinkFieldActions);

    var _this = _possibleConstructorReturn(this, (BlockLinkFieldActions.__proto__ || Object.getPrototypeOf(BlockLinkFieldActions)).call(this, props));

    _this.handleChangeValue = _this.handleChangeValue.bind(_this);
    return _this;
  }

  _createClass(BlockLinkFieldActions, [{
    key: 'getOptionByValue',
    value: function getOptionByValue(value) {
      return this.props.actions.find(function (action) {
        return action.value === value;
      });
    }
  }, {
    key: 'handleChangeValue',
    value: function handleChangeValue(event) {
      var promise = null;

      var option = this.getOptionByValue(event.target.value);
      if (typeof option === 'undefined') {
        return null;
      }

      if (typeof option.confirm === 'function') {
        promise = option.confirm().then(function () {
          return option.callback();
        }).catch(function (reason) {
          if (reason !== 'cancelled') {
            throw reason;
          }
        });
      } else {
        promise = option.callback() || Promise.resolve();
      }

      return promise;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = this.props.actions.map(function (action) {
        var className = __WEBPACK_IMPORTED_MODULE_2_classnames___default()('block-link-field__action', 'dropdown-item', action.className || '');

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          {
            type: 'button',
            className: className,
            key: action.value,
            onClick: _this2.handleChangeValue,
            value: action.value
          },
          action.label
        );
      }).filter(function (item) {
        return item;
      });

      if (!children.length) {
        return null;
      }
      var ActionMenu = this.props.ActionMenu;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'block-link-field-actions fieldholder-small input-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          ActionMenu,
          {
            id: this.props.id,
            className: 'block-link-field-actions__menu',
            container: this.props.container
          },
          children
        )
      );
    }
  }]);

  return BlockLinkFieldActions;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

BlockLinkFieldActions.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired,
  actions: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.arrayOf(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.shape({
    value: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired,
    label: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired,
    className: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
    destructive: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool,
    callback: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func,
    canApply: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func,
    confirm: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func
  })),
  ActionMenu: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.oneOfType([__WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.node, __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func])
};

BlockLinkFieldActions.defaultProps = {
  id: '',
  actions: [],
  ActionMenu: null
};



/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lib_Injector__["inject"])(['ActionMenu'], function (ActionMenu) {
  return { ActionMenu: ActionMenu };
}, function () {
  return 'BlockLinkFieldActions';
})(BlockLinkFieldActions));

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = FieldHolder;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = classnames;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map