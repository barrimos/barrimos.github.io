import Create_new_element from "./Create_new_element.js";

const Spinner = () => {
  const wrapper = Create_new_element('div', '', 'loading-spinner');
  const spinner = Create_new_element('div', 'spinner');

  wrapper.appendChild(spinner);
  return wrapper;
}

export default Spinner;