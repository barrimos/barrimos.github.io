"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * DocsString
 * @param {*} strokeColor 
 * @param {*} strokeWidth 
 * @returns 
 */
var TopButton = function TopButton() {
  var strokeColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#666';
  var strokeWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return "<div class=\"buttonToTop\" id=\"buttonToTop\" onclick=\"topFunction()\">\n  <div style=\"position: relative; width: 35px; height: 35px;\">\n  <input type=\"button\" class=\"toTopBtn\" id=\"toTopBtn\" style=\"position: absolute; top: 0; left: 0;\">\n  <svg class=\"arrowTop\" viewbox=\"0 0 35 35\" aria-hidden=\"true\" alt=\"backTop\" style=\"position: absolute; top: 0; left: 0;\">\n      <path \n          d = \"M10 22 L 18 13 L 25 22\"\n          fill = \"none\"\n          stroke = \"".concat(strokeColor, "\"\n          stroke-width = \"").concat(strokeWidth, "\"\n      />\n  </svg>\n  </div>\n</div>");
};

var _default = TopButton;
exports["default"] = _default;