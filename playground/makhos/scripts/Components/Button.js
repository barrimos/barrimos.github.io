import Create_new_element from "../utils/Create_new_element.js";

/**
 * DocsString
 * @param {*} className 
 * @param {*} id 
 * @param {*} text 
 * @param {Array<'key:value'>} data_attr 
 * @param {*} value 
 * @param {*} type 
 * @param {*} callback 
 * @returns 
 */
const Button = (className = '', id = '', text = '', data_attr = undefined, value = '', type = 'button', callback) => {
  let attr = [];
  if (data_attr !== undefined) {
    attr = [{ 'type': type }, { 'value': value }, ...data_attr];
  }
  const button = Create_new_element('button', className, id, text, attr);
  if (typeof callback === 'function') {
    button.addEventListener('click', callback);
  }

  return button;
}

export default Button;
