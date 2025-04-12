import { Spinner } from "../Components/Spinner.js"
import Create_new_element from "./Create_new_element.js"

const is_confirm_cancel = (e, callback) => {
  const response = e.target.dataset.respond
  if (callback) callback(response)
  if (response === 'confirm') e.target.parentElement.innerHTML += Spinner()
  setTimeout(() => {
    document.querySelector('#popup-modal').remove()
  }, 500)
}

export const Alert_confirm_popup = (title, detail, callback) => {
  const popup_modal = Create_new_element('div', '', 'popup-modal')
  const popup_title = Create_new_element('div', 'popup-title', '', title ? title : 'Confirm ?')
  const popup_detail = Create_new_element('div', 'popup-detail', '', detail)
  const button_wrapper = Create_new_element('div', ['d-flex', 'justify-content-between', 'align-items-center'])
  const button_confirm = Create_new_element('button', 'popup-click-btn', '', 'Confirm', [{ 'type': 'button' }, { 'name': 'confirm' }, { 'data-respond': 'confirm' }])
  const button_cancel = Create_new_element('button', 'popup-click-btn', '', 'Cancel', [{ 'type': 'reset' }, { 'name': 'cancel' }, { 'data-respond': 'cancel' }])

  button_wrapper.appendChild(button_confirm)
  button_wrapper.appendChild(button_cancel)

  button_confirm.addEventListener('click', e => is_confirm_cancel(e, callback))
  button_cancel.addEventListener('click', e => is_confirm_cancel(e, callback))

  popup_modal.appendChild(popup_title)
  detail ? popup_modal.appendChild(popup_detail) : false
  popup_modal.appendChild(button_wrapper)

  document.querySelector('body').appendChild(popup_modal)

  return Promise.resolve()
}