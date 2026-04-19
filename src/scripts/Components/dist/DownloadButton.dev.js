"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var DownloadButton = function DownloadButton() {
  // render HTML
  var html = "\n        <div class=\"d-none d-md-flex justify-content-center align-items-center\">\n            <div class=\"dropdownDownloadCVBtn\">\n                <input type=\"checkbox\" class=\"dropdown-toggle\" id=\"dropdownMenuButton\">\n                <div class=\"btnDownload\">Download<i class=\"triangleDownIconBtnDownload fa fa-angle-down\"></i></div>\n                <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                    <a href=\"./src/download/Prapas_Resume_2026_EN.pdf\" class=\"dropdown-item download resume\" download>Resume</a>\n                    <a href=\"./src/download/Prapas_CV_2026_EN.pdf\" class=\"dropdown-item download cv\" download>CV</a>\n                </div>\n            </div>\n        </div>\n    "; // bind event หลัง DOM ถูก render

  setTimeout(function () {
    var checkbox = document.getElementById("dropdownMenuButton");

    if (checkbox) {
      checkbox.addEventListener("click", function (e) {
        document.body.addEventListener("click", function (ev) {
          if (checkbox.checked && ev.target !== checkbox) {
            checkbox.checked = false;
          }
        });
      });
    }
  }, 0);
  return html;
};

var _default = DownloadButton;
exports["default"] = _default;