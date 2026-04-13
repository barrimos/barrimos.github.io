"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Sidemenu = _interopRequireDefault(require("./Sidemenu.js"));

var _Footer = _interopRequireDefault(require("./Footer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var layout = function layout(children) {
  var rootSrc,
      _args = arguments;
  return regeneratorRuntime.async(function layout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rootSrc = _args.length > 1 && _args[1] !== undefined ? _args[1] : './';
          _context.t0 = "<div class=\"wrapper\">\n        <nav class=\"sideMenu noSelect\" id=\"sideMenu\">\n            ";
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _Sidemenu["default"])(rootSrc).then(function (html) {
            return html;
          }));

        case 4:
          _context.t1 = _context.sent;
          _context.t2 = children;
          _context.t3 = (0, _Footer["default"])();
          return _context.abrupt("return", _context.t0.concat.call(_context.t0, _context.t1, "\n        </nav>\n        \n        <main class=\"main\">\n            <div class=\"topNav-section\" id=\"topNav-section\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"nav-menu\">\n                                <div class=\"topLogo\">\n                                    <img src=\"./src/img/icon/zmlogo-page-15.png\" alt=\"logo zixma\">\n                                </div>\n                                <div class=\"btn d-none d-md-block\">\n                                    <a href=\"./src/download/Prapas_CV_2026_EN.pdf\" class=\"DownloadCV\" download>Download CV</a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            ").concat(_context.t2, "\n        </main>\n        <div class=\"push\"></div>\n    </div>\n    <footer id=\"footer\">").concat(_context.t3, "</footer>"));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = layout;
exports["default"] = _default;