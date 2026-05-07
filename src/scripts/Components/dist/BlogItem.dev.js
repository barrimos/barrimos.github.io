"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * DocsString
 * @param {*} item 
 * @returns 
 */
var BlogItem = function BlogItem(item) {
  return "<div class=\"topic-item\" data-item=".concat(item.number, ">\n        <a ").concat(item.online ? "href=".concat("./blog/".concat(item.name, "/")) : "", " class=\"topic-link\">\n            <div class=\"topic-l\">\n                <img src=\"./src/img/cover/").concat(item.name, ".jpg\" alt=\"").concat(item.name, "\" class=\"topic-cover\">\n            </div>\n            <div class=\"topic-r\">\n                <h1>").concat(item.title, "</h1>\n                <p class=\"topic-detail\">").concat(item.info, "</p>\n                <small class=\"topic-date\">1 Jan 2025 : Prapas k, Writer</small>\n            </div>\n        </a>\n    </div>");
};

var _default = BlogItem;
exports["default"] = _default;