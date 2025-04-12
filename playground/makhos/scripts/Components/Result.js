import Create_new_element from "../utils/Create_new_element.js";
import Button from "./Button.js";

const result = () => {
  const result_box = Create_new_element('div', 'result-box', 'result-box', 'WIN');
  const accept_btn = Button('accept-result-btn', 'accept-result-btn', 'OK',)
  return result_box;
}

export default result;
