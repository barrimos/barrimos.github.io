"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TopButton = _interopRequireDefault(require("./TopButton.js"));

var _migrationListProjects = _interopRequireDefault(require("./migrationListProjects.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 
 * @param {*} rootSrc default--> ./
 * @returns 
 */
var Sidemenu = function Sidemenu() {
  var rootSrc,
      _args = arguments;
  return regeneratorRuntime.async(function Sidemenu$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rootSrc = _args.length > 0 && _args[0] !== undefined ? _args[0] : './';
          _context.t0 = "<div class=\"hamburger\">\n    <input type=\"checkbox\" class=\"toggler\" id=\"btnToggle\" autocomplete=\"off\">\n    <div class=\"bars\">\n        <div class=\"ham-icon\" id=\"ham-icon\"></div>\n    </div>\n    </div>\n    <div class=\"nav-side-menu\" id=\"sideNav-left\">\n    <ul class=\"underlist\">\n        <li class=\"list-item data-list-url\">\n            <a href=\"/\" class=\"nav-link\" title=\"Home\" id=\"index\">\n                <div class=\"nav-icon\" data-icon=\"index\">\n                    <img src=\"".concat(rootSrc, "src/img/icon/social-23.svg\" alt=\"Home\">\n                </div>\n                <span class=\"nav-text\" data-text=\"index\">HOME</span>\n            </a>\n        </li>\n        <li class=\"list-item data-list-url\">\n            <a href=\"../../profile.html\" class=\"nav-link\" title=\"Profile\" id=\"profile\">\n                <div class=\"nav-icon\" data-icon=\"profile\">\n                    <img src=\"").concat(rootSrc, "src/img/icon/social-09.svg\" alt=\"Profile\">\n                </div>\n                <span class=\"nav-text\" data-text=\"profile\">PROFILE</span>\n            </a>\n        </li>\n        <li class=\"list-item data-list-url\">\n            <a href=\"../../portfolio.html\" class=\"nav-link\" title=\"portfolio\" id=\"portfolio\">\n                <div class=\"nav-icon\" data-icon=\"portfolio\">\n                    <img src=\"").concat(rootSrc, "src/img/icon/social-29.svg\" alt=\"portfolio\">\n                </div>\n                <span class=\"nav-text\" data-text=\"portfolio\">PORTFOLIO</span>\n            </a>\n        </li>\n        <li class=\"list-item has-treeview data-list-url\">\n            <a href=\"javascript:void(0)\" class=\"nav-link btnDropmenu\" title=\"Zxsandbox\" id=\"zxsandbox\">\n                <div class=\"nav-icon\" data-icon=\"zxsandbox\">\n                    <img src=\"").concat(rootSrc, "src/img/icon/social-37.svg\" alt=\"Service\">\n                </div>\n                <span class=\"nav-text\" data-text=\"zxsandbox\">ZXSANDBOX</span>\n                <div class=\"iconArrowdrop\">\n                    <svg viewbox=\"0 0 40 40\" width=\"15\" heigth=\"15\">\n                        <path \n                            d = \"M0.5 10 L19 30 L35 10\"\n                            fill = \"none\"\n                            stroke-width = \"4\"\n                        />\n                    </svg>\n                </div>\n            </a>\n            <ul class=\"underlist\" id=\"projectLists\">\n                ");
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _migrationListProjects["default"])(rootSrc).then(function (html) {
            return html;
          }));

        case 4:
          _context.t1 = _context.sent;
          _context.t2 = rootSrc;
          _context.t3 = rootSrc;
          _context.t4 = rootSrc;
          _context.t5 = rootSrc;
          _context.t6 = rootSrc;
          _context.t7 = rootSrc;
          _context.t8 = (0, _TopButton["default"])();
          return _context.abrupt("return", _context.t0.concat.call(_context.t0, _context.t1, "\n            </ul>\n        </li>\n        <li class=\"list-item data-list-url\">\n            <a href=\"../../blog.html\" class=\"nav-link\" title=\"Blog\" id=\"blog\">\n                <div class=\"nav-icon\" data-icon=\"blog\">\n                    <img src=\"").concat(_context.t2, "src/img/icon/social-33.svg\" alt=\"Blog\">\n                </div>\n                <span class=\"nav-text\" data-text=\"blog\">BLOG</span>\n            </a>\n        </li>\n        <li class=\"list-item has-treeview data-list-url\">\n            <a href=\"javascript:void(0)\" class=\"nav-link btnDropmenu\" title=\"CV\">\n                <div class=\"nav-icon\">\n                    <img src=\"").concat(_context.t3, "src/img/icon/social-31.svg\" alt=\"Service\">\n                </div>\n                <span class=\"nav-text\">DOWNLOAD CV</span>\n                <div class=\"iconArrowdrop\">\n                    <svg viewbox=\"0 0 40 40\" width=\"15\" heigth=\"15\">\n                        <path \n                            d = \"M0.5 10 L19 30 L35 10\"\n                            fill = \"none\"\n                            stroke-width = \"4\"\n                        />\n                    </svg>\n                </div>\n            </a>\n            <ul class=\"underlist\">\n                <li class=\"list-item list-treeview\">\n                    <a href=\"").concat(_context.t4, "src/download/Prapas_CV_2026_EN.pdf\" title=\"Download CV\" class=\"nav-link dlbtn-wraper\" download>\n                        <div class=\"nav-icon\">\n                            <img src=\"").concat(_context.t5, "src/img/icon/zmlogo-page-03.png\" alt=\"CV EN\">\n                        </div>\n                        <span class=\"nav-text\">CV EN</span>\n                    </a>\n                </li>\n                <li class=\"list-item list-treeview\">\n                    <a href=\"").concat(_context.t6, "src/download/Prapas_CV_2026_TH.pdf\" title=\"Download CV\" class=\"nav-link dlbtn-wraper\" download>\n                        <div class=\"nav-icon\">\n                            <img src=\"").concat(_context.t7, "src/img/icon/zmlogo-page-03.png\" alt=\"CV TH\">\n                        </div>\n                        <span class=\"nav-text\">CV TH</span>\n                    </a>\n                </li>\n            </ul>\n        </li>\n    </ul>\n    ").concat(_context.t8, "\n    </div>"));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = Sidemenu;
exports["default"] = _default;