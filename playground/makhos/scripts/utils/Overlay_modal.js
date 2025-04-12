import InsertAfter from "./InsertAfter.js"
const BOUNCE_CLOSE = 'bounce_close'
const NAME_DATA_CLOSING = 'data-closing'
const NAME_DATA_MODAL_OPEN = 'data-modal-open'
let modal, overlay_elem
const all_btns = document.querySelectorAll('.btn.menu-game')

export const disabled_all_btns = () => {
  all_btns.forEach(btn => {
    btn.setAttribute('disabled', true)
  })
}
export const able_all_btns = () => {
  all_btns.forEach(btn => {
    btn.removeAttribute('disabled')
  })
}


export const close_overlay_modal = modal_name => {
  if (document.querySelector(`.modal[${NAME_DATA_MODAL_OPEN}=${modal_name}]`).getAttribute('data-loading') === 'true') {
    return
  } else {
    modal.setAttribute(NAME_DATA_CLOSING, true)
    modal.style.webkitAnimationName = BOUNCE_CLOSE
    modal.style.mskitAnimationName = BOUNCE_CLOSE
    modal.style.mozAnimationName = BOUNCE_CLOSE
    modal.style.OAnimationName = BOUNCE_CLOSE
    modal.style.animationName = BOUNCE_CLOSE
    modal.style.animationDuration = '.6s'
  
    // close all data-info
    try {
      document.querySelectorAll('.open[data-info]').forEach(info => {
        info.classList.remove('open')
        if (info.dataset.info === 'friends-list') {
          document.getElementById('friends-list').style.height = '100px'
        }
      })
    } catch (err) {
      err
    }
    setTimeout(() => {
      modal.style = ''
      modal.classList.remove('active')
      overlay_elem.classList.remove('fade')
      overlay_elem.remove()
      setTimeout(() => {
        modal.removeAttribute('data-closing')
        able_all_btns()
        document.body.style = ''
      }, 1000)
    }, 600)
  }
}

export const add_overlay_modal = () => {
  const promise = new Promise((resolve, reject) => {
    modal = document.querySelector('.modal.active')
    if (modal || !modal.hasAttribute('data-closing')) {
      resolve()
    } else {
      reject()
    }
  })
  promise
    .then(() => {
      modal.setAttribute('data-loading', true)
  
      overlay_elem = document.createElement('div')
      overlay_elem.classList.add('overlay')
      InsertAfter(overlay_elem, modal)
    
      disabled_all_btns()
    
      setTimeout(() => {
        // delay available to close modal after opened
        modal.removeAttribute('data-loading')
      }, 1000)
    })
    .catch(() => {
      return
    })
}