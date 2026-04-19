"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 
 * @param {*} item 
 * @returns 
 */
var WhatIveLearned = function WhatIveLearned(item) {
  return "<div class=\"col-12 col-md-4 col-xl-3 mt-10\">\n        <div class=\"blog-item\">\n            <a ".concat(item.online ? "href=".concat("./blog/".concat(item.name, "/")) : "", ">\n                <img class=\"blogCover\" src=\"./src/img/cover/").concat(item.name, ".jpg\" alt=\"").concat(item.name, "\">\n                <div class=\"blog-info\">\n                    <h4 class=\"blog-title\">").concat(item.title, "</h4>\n                    <small class=\"blog-brief\">").concat(item.info, "</small>\n                </div>\n            </a>\n            <span class=\"tagLists\">").concat(item.tags, "</li></span>\n        </div>\n    </div>");
};

var _default = WhatIveLearned;
exports["default"] = _default;