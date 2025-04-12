/**
 * DocsString
 * @param {string} elem_tag 
 * @param {string} class_name 
 * @param {string} id_name 
 * @param {string} text 
 * @param {Array<'key:value'>} data_attr [{ 'key': 'value' }]
 * @returns 
 */
const Create_new_element = (elem_tag = 'div', class_name = undefined, id_name = undefined, text = undefined, data_attr = [{}]) => {

  const new_element = document.createElement(elem_tag);
  if (class_name) {
    if (Array.isArray(class_name)) {
      class_name.forEach(c => {
        new_element.classList.add(c);
      });
    } else {
      new_element.classList.add(class_name);
    }
  }

  if (id_name) {
    new_element.setAttribute('id', id_name);
  }

  if (text) {
    new_element.innerText = text;
  }

  let key, value;
  data_attr.forEach(obj_data => {
    if (Object.keys(obj_data).length > 0) {
      key = Object.keys(obj_data);
      value = Object.values(obj_data);
      new_element.setAttribute(key, value);
    }
  });

  return new_element;
}

export default Create_new_element;
