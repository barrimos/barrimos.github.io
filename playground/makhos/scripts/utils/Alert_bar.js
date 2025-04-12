import Create_new_element from "./Create_new_element.js";

/**
 * DocsString
 * @param {*} text 
 * @param {*} success 
 */
const duration = 5000;
const move_up = duration - 500; // at 500 ms after error from beginning alert duration
const move_down = duration - move_up; // at last 500 ms before error end of alert duration

const Alert_bar = async (text, success = true) => {
  const alert_elem = Create_new_element('div', ['alert', `${success === true ? 'success' : success === false ? 'fail' : 'notice'}`], 'alert', text, [{ 'data-alert': success }]);
  document.querySelector('body').appendChild(alert_elem);
  const height = alert_elem.offsetHeight;
  alert_elem.style.top = -height + -5 + 'px';
  setTimeout(() => {
    alert_elem.style.top = 0;
  }, move_down);
  setTimeout(() => {
    alert_elem.style.top = -height + -5 + 'px';
  }, move_up);
  setTimeout(() => {
    document.querySelector(`.${alert_elem.getAttribute('id')}`).remove();
  }, duration);

  return Promise.resolve();
}

export default Alert_bar;
