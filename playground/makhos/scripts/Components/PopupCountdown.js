const PopupCountdown = cd => {
  const min = String(Math.floor(cd / 60000));
  const sec = String(Math.floor((cd % 60000) / 1000));
  const wrapper_popup = document.createElement('div');
  wrapper_popup.id = 'wrapper-popup';
  const popup = `<h4 id="popup-cd" data-ms="${cd}">` +
      `<span class="cd-time minutes" data-m="${min}">${min.padStart(2, '0')}</span>` +
      `<span class="cd-time seconds" data-s="${sec}">${sec.padStart(2, '0')}</span>` +
  `</h4>` +
  `<div class="d-flex justify-content-between align-self-center">` +
      `<button type="button" name="accept" id="accept">accept</button>` +
      `<button type="button" name="reject" id="reject">reject</button>` +
  `</div>`;

  wrapper_popup.innerHTML += popup;

  return wrapper_popup;
}

export default PopupCountdown;