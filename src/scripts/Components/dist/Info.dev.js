"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Info = function Info() {
  var html = "\n        <div class=\"infoWrapper\">\n            <input type=\"checkbox\" name=\"checkboxToggleInfo\" class=\"checkboxToggleInfo\" checked>\n            <div class=\"infoBox\">\n                <p>- swip right to open menu</p>\n                <p>- swip left to close menu</p>\n            </div>\n        </div>\n    ";
  setTimeout(function () {
    document.querySelector('.checkboxToggleInfo').checked = false;
  }, 5000);
  return html;
};

var _default = Info;
exports["default"] = _default;