import Create_new_element from "../utils/Create_new_element.js";

const elem = () => {
  return '<div class="container">' +
  '<div class="row align-items-center">' +
    '<div class="col-8">' +
      '<span class="cookie-text">' +
        'เว็บไซต์นี้ใช้คุ๊กกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์นี้ เท่านั้น' +
      '</span>' +
    '</div>' +
    '<div class="col-4 d-md-flex justify-content-md-center align-content-md-center">' +
      '<button type="button" class="cookie-btn allow" value="allow" name="allow">ยอมรับ</button>' +
      '<button type="button" class="cookie-btn disallow" value="disallow" name="disallow">ปิด</button>' +
    '</div>' +
    '</div>' +
'</div>';
}

const PopupCookie = () => {
  const cookie = document.cookie.split(';');
  const accept_cookie = cookie.filter(ck => ck.startsWith('req_cookie'))[0];

  const div = Create_new_element('div', '', 'cookie-banner');
  div.innerHTML = elem();

  div.querySelectorAll('button.cookie-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.cookie = 'req_cookie = true; path = /';
      document.querySelector('#cookie-banner').remove();
    });
  });

  if (accept_cookie) {
    if (document.querySelector('#cookie-banner')) {
      document.querySelector('#cookie-banner').remove();
    }
  } else {
    document.querySelector('footer').appendChild(div);
  }
}

PopupCookie();