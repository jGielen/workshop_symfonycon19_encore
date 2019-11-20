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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/assets/js/RepLogApp.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/js/RepLogApp.js":
/*!***************************************!*\
  !*** ./public/assets/js/RepLogApp.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\n\n(function(window, $, Routing, Swal) {\n\n    let HelperInstances = new WeakMap();\n\n    const Helper = __webpack_require__(/*! ./RepLogAppHelper */ \"./public/assets/js/RepLogAppHelper.js\");\n\n    //const Helper = new RepLogAppHelpers([]);\n    class RepLogApp {\n        constructor($wrapper) {\n            this.$wrapper = $wrapper;\n            this.repLogs = [];\n\n            HelperInstances.set(this, new Helper(this.repLogs));\n\n            this.loadRepLogs();\n\n            this.$wrapper.on(\n                'click',\n                '.js-delete-rep-log',\n                this.handleRepLogDelete.bind(this)\n            );\n            this.$wrapper.on(\n                'click',\n                'tbody tr',\n                this.handleRowClick.bind(this)\n            );\n            this.$wrapper.on(\n                'submit',\n                RepLogApp._selectors.newRepForm,\n                this.handleNewFormSubmit.bind(this)\n            );\n        }\n\n        /**\n         * Call like this.selectors\n         */\n        static get _selectors() {\n            return {\n                newRepForm: '.js-new-rep-log-form'\n            }\n        }\n\n        loadRepLogs() {\n            $.ajax({\n                url: Routing.generate('rep_log_list'),\n            }).then(data => {\n                for (let repLog of data.items) {\n                    this._addRow(repLog);\n                }\n            })\n        }\n\n        updateTotalWeightLifted() {\n            this.$wrapper.find('.js-total-weight').html(\n                HelperInstances.get(this).getTotalWeightString()\n            );\n        }\n\n        handleRepLogDelete(e) {\n            e.preventDefault();\n\n            const $link = $(e.currentTarget);\n\n            Swal.fire({\n                title: 'Delete this log?',\n                text: 'What? Did you not actually lift this?',\n                showCancelButton: true,\n                showLoaderOnConfirm: true,\n                preConfirm: () => this._deleteRepLog($link)\n            });\n        }\n\n        _deleteRepLog($link) {\n            $link.addClass('text-danger');\n            $link.find('.fa')\n                .removeClass('fa-trash')\n                .addClass('fa-spinner')\n                .addClass('fa-spin');\n\n            const deleteUrl = $link.data('url');\n            const $row = $link.closest('tr');\n\n            return $.ajax({\n                url: deleteUrl,\n                method: 'DELETE'\n            }).then(() => {\n                $row.fadeOut('normal', () => {\n                    // we need to remove the repLog from this.repLogs\n                    // the \"key\" is the index to this repLog on this.repLogs\n                    this.repLogs.splice(\n                        $row.data('key'),\n                        1\n                    );\n\n                    $row.remove();\n\n                    this.updateTotalWeightLifted();\n                });\n            })\n        }\n\n        handleRowClick() {\n            console.log('row clicked!');\n        }\n\n        handleNewFormSubmit(e) {\n            e.preventDefault();\n\n            const $form = $(e.currentTarget);\n            const formData = {};\n\n            for (let fieldData of $form.serializeArray()) {\n                formData[fieldData.name] = fieldData.value\n            }\n\n            this._saveRepLog(formData)\n            .then((data) => {\n                this._clearForm();\n                this._addRow(data);\n            }).catch((errorData) => {\n                this._mapErrorsToForm(errorData.errors);\n            });\n        }\n\n        _saveRepLog(data) {\n            return new Promise((resolve, reject) => {\n                const url = Routing.generate('rep_log_new');\n\n                $.ajax({\n                    url,\n                    method: 'POST',\n                    data: JSON.stringify(data)\n                }).then((data, textStatus, jqXHR) => {\n                    $.ajax({\n                        url: jqXHR.getResponseHeader('Location')\n                    }).then((data) => {\n                        // we're finally done!\n                        resolve(data);\n                    });\n                }).catch((jqXHR) => {\n                    const errorData = JSON.parse(jqXHR.responseText);\n\n                    reject(errorData);\n                });\n            });\n        }\n\n        _mapErrorsToForm(errorData) {\n            this._removeFormErrors();\n            const $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);\n\n            for (let element of $form.find(':input')) {\n                const fieldName = $(element).attr('name');\n                const $wrapper = $(element).closest('.form-group');\n                if (!errorData[fieldName]) {\n                    // no error!\n                    continue;\n                }\n\n                $(element).addClass('is-invalid');\n                const $error = $('<span class=\"js-field-error invalid-feedback\"></span>');\n                $error.html(errorData[fieldName]);\n                $wrapper.append($error);\n            }\n        }\n\n        _removeFormErrors() {\n            const $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);\n            $form.find('.js-field-error').remove();\n            $form.find('.is-invalid').removeClass('is-invalid');\n        }\n\n        _clearForm() {\n            this._removeFormErrors();\n\n            const $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);\n            $form[0].reset();\n        }\n\n        _addRow(repLog) {\n            this.repLogs.push(repLog);\n            // destructuring example\n            // let {id, itemLabel, reps, totallyMadeUpKey = 'whatever!'} = repLog;\n            // console.log(id, itemLabel, reps, totallyMadeUpKey);\n\n            const html = rowTemplate(repLog);\n            const $row = $($.parseHTML(html));\n            // store the repLogs index\n            $row.data('key', this.repLogs.length - 1);\n            this.$wrapper.find('tbody').append($row);\n\n            this.updateTotalWeightLifted();\n        }\n    }\n\n    const rowTemplate = (repLog) => `\n<tr data-weight=\"${repLog.totalWeightLifted}\">\n    <td>${repLog.itemLabel}</td>\n    <td>${repLog.reps}</td>\n    <td>${repLog.totalWeightLifted}</td>\n    <td>\n        <a href=\"#\"\n           class=\"js-delete-rep-log\"\n           data-url=\"${repLog.links._self}\"\n        >\n            <span class=\"fa fa-trash\"></span>\n        </a>\n    </td>\n</tr>\n`;\n\n    window.RepLogApp = RepLogApp;\n})(window, jQuery, Routing, Swal);\n\n\n//# sourceURL=webpack:///./public/assets/js/RepLogApp.js?");

/***/ }),

/***/ "./public/assets/js/RepLogAppHelper.js":
/*!*********************************************!*\
  !*** ./public/assets/js/RepLogAppHelper.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class Helper {\n    constructor(repLogs) {\n        this.repLogs = repLogs;\n    }\n\n    calculateTotalWeight() {\n        return Helper._calculateWeights(\n            this.repLogs\n        );\n    }\n\n    getTotalWeightString(maxWeight = 500) {\n        let weight = this.calculateTotalWeight();\n\n        if (weight > maxWeight) {\n            weight = maxWeight + '+';\n        }\n\n        return weight + ' lbs';\n    }\n\n    static _calculateWeights(repLogs) {\n        let totalWeight = 0;\n        for (let repLog of repLogs) {\n            totalWeight += repLog.totalWeightLifted;\n        }\n\n        return totalWeight;\n    }\n}\n\n//# sourceURL=webpack:///./public/assets/js/RepLogAppHelper.js?");

/***/ })

/******/ });