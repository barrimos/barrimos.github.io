import Create_new_element from "./Create_new_element.js"

/**
 * DocsString
 * @param {*} new_text 
 * @returns 
 */
const Log = (new_text) => {
  // if wrapper is exist get that element
  // if wrapper is not exist create new element
  const wrapper = document.getElementById('display-log') || Create_new_element('div', ['log', 'mty'], 'display-log')

  // create new element for text
  const dom_new_text = Create_new_element('span', ['log-text', 'curr'])

  // create new elemnt
  const element_last_text = Create_new_element('span', 'log-text')


  if (typeof new_text === 'string' && new_text && !/^ *$/.test(new_text)) {

    // for log get all children
    const wrapper_children = wrapper.children

    // for log count children
    const len_wrapper_children = wrapper_children.length

    // get element from log-text
    const array_text_elems = document.querySelectorAll('.log-text')
    const len_array_text_elems = array_text_elems.length
    const text_curr = document.querySelector('.log-text.curr')

    // determind an old text and last text for log
    // if has an old text
    if (len_wrapper_children !== 0) {
      let old_text_curr = ''

      // if last text class "curr" not exist
      if (!text_curr) {
        old_text_curr = array_text_elems[len_array_text_elems - 1].innerText.trim()
      } else {
        old_text_curr = text_curr.innerText.trim()
      }

      // delete last element
      wrapper_children[len_wrapper_children - 1].remove()

      // add last text to new element
      element_last_text.innerText = old_text_curr

      if (!new_text || !/\w/gi.test(new_text)) {
        element_last_text.classList.add('curr')
      }
      // append to wrapper
      wrapper.appendChild(element_last_text)
    } else {
      element_last_text.innerText = new_text
    }

    // for add last text both log and chat
    if (new_text && !/-^ *$/.test(new_text)) {
      dom_new_text.innerText = new_text
      dom_new_text.setAttribute('data-log-timestamp', new Date().getTime())

      wrapper.appendChild(dom_new_text)

      // Automatically scroll to the bottom after adding a new log message
      wrapper.scrollTop = wrapper.scrollHeight
      
      wrapper.classList.remove('mty')
    }
  }
  return wrapper
}

export default Log
