import Create_new_element from '../utils/Create_new_element.js';

/**
 * DocsString
 * @param {*} menu_label 
 * @param {*} icon_fa 
 * @param {*} elem 
 * @returns 
 */
const MenuOption = (menu_label, elem) => {
  const menu_option = Create_new_element('div', 'menu-option');
  if (menu_label) {
    const label_menu_option = Create_new_element('div', 'label-menu-option', '', menu_label);
    menu_option.appendChild(label_menu_option);
  }
  menu_option.appendChild(elem);
  return menu_option;
}

export default MenuOption;
