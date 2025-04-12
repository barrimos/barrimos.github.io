import Create_new_element from "../utils/Create_new_element.js";

const check_type = time => {
  if (typeof parseInt(time) === 'number' && isNaN(time)) {
    throw new ReferenceError(`Expected turn timer in type of number, duration in seconds, but "${time}" provided type ${typeof time}`);
  }
}
/**
 * DocsString
 * @param {[*]} options 
 * @returns 
 */
const SelectOption = options => {
  const select = Create_new_element('select', 'game-time', 'game-time');
  let m, t;
  for (let opt of options) {
    check_type(opt)

    m = Math.floor(parseInt(opt) / 60);

    const option = Create_new_element('option', '', '', `${m} mins`, [{ 'value': opt / 60 }]);
    if (parseInt(opt) === 180) {
      option.setAttribute('selected', '');
    }

    select.appendChild(option);
  }

  return select;
}

export default SelectOption;