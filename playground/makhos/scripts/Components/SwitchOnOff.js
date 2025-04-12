import Create_new_element from "../utils/Create_new_element.js";

/**
 * DocsString
 * @param {*} font_awesome 
 * @param {*} switch_off_text : Default 'OFF'
 * @param {*} switch_on_text : Default 'ON'
 * @returns 
 */
const SwitchOnOff = (font_awesome, switch_off_text = 'OFF', switch_on_text = 'ON') => {
  if (!font_awesome || typeof font_awesome !== 'string') {
    throw 'Component SwitchOnOff Argument is not String or Argument is empty.';
  }
  // const is_autoplay = document.getElementById('sound').hasAttribute('autoplay');

  const switch_on_off = Create_new_element('div', 'switch-on-off', '', '', [{ 'data-use-for': font_awesome }]);
  const knob_btn = Create_new_element('div', 'knob-btn', '', '', [{ 'data-use-for': font_awesome }]);
  const icon_fa = Create_new_element('i', ['fa', `fa-${font_awesome}`]);
  const on_off = Create_new_element('div', 'on-off', '', '', [{ 'data-use-for': font_awesome }]);
  const text_on = Create_new_element('strong', 'text-on', '', switch_on_text, [{ 'data-use-for': font_awesome }]);
  const text_off = Create_new_element('strong', 'text-off', '', switch_off_text, [{ 'data-use-for': font_awesome }]);
  const inp_checkbox = Create_new_element('input', '', `use${font_awesome}`, '', [{ 'type': 'checkbox' }, { 'data-use-for': `use${font_awesome}` }]);
  if (font_awesome === 'pawns') {
    inp_checkbox.setAttribute('value', 'black');
  }
  // if (is_autoplay && font_awesome === 'music') {
  //   switch_on_off.classList.add('active');
  // }


  on_off.appendChild(text_on);
  on_off.appendChild(text_off);
  knob_btn.appendChild(icon_fa);
  switch_on_off.appendChild(knob_btn);
  switch_on_off.appendChild(on_off);
  switch_on_off.appendChild(inp_checkbox);

  return switch_on_off;
}

export default SwitchOnOff;
