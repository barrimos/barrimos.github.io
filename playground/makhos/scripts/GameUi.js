'use strict'

// components
import Log from './utils/Log.js'
import { Board } from './Components/Board.js'

// utils
import { add_overlay_modal, close_overlay_modal, disabled_all_btns, able_all_btns } from './utils/Overlay_modal.js'
import Alert_bar from './utils/Alert_bar.js'
import { Versus, Declaration } from './utils/AnimationScene.js'
import { Alert_confirm_popup } from './utils/Alert_confirm_popup.js'
import { Checker, Player } from './Checkers.js'

// name elements
const NAME_BOARDGAME = 'boardgame'
const LEVEL = ['easy', 'medium', 'hard']

const NAME_ACTIVE = 'active'

const NAME_MODAL = 'modal'
const NAME_CLOST_MODAL_BTN = 'close-modal-btn'

// settings modal
const NAME_OPERATIONS = 'operations'
const NAME_CONFIRM_BTN = 'confirm'
const NAME_RESET_BTN = 'reset'
const NAME_AI = 'ai'
const NAME_MUSIC = 'music'
const NAME_SOUND = 'sound'
const NAME_GAME_TIME = 'game-time'
const NAME_CHECKBOX_USE = 'checkbox-use-'
const NAME_RADIO_LEVEL_AI = 'radio-level-ai'
const NAME_LEVEL_AI_WRAPPER = 'level-ai-wrapper'

// top nav
const NAME_SETTINGS_MENU_BTN = 'settings-menu-btn'
const NAME_PLAY_GAME_BTN = 'play-game-btn'
const NAME_RESIGN_GAME_BTN = 'resign-game-btn'
const NAME_DRAW_GAME_BTN = 'draw-game-btn'

const NAME_CELL_ROWS = 'cell-rows'
const NAME_CELL_COLS = 'cell-cols'
const NAME_PAWNS_WRAPPER = 'pawns-wrapper'

const NAME_SWITCH_ON_OFF = 'switch-on-off'

const NAME_DISPLAY_LOG = 'display-log'

const NAME_STATUS_BAR = 'status-bar'
const NAME_MOVEABLE = 'moveable'
const NAME_PAWNS_SELECTED = 'pawns-selected'

const NAME_PREV_MOVED = 'prev-moved'

const NAME_BLACK = 'black'
const NAME_WHITE = 'white'

// event
const EVENT_CHANGE = 'change'
const EVENT_CLICK = 'click'

// data attribute
const NAME_DATA_USE_FOR = 'data-use-for'
const NAME_DATA_CELL = 'data-cell'
const NAME_DATA_PAWNS_SIDE = 'data-pawns-side'
const NAME_DATA_HOS = 'data-hos'
const NAME_DATA_ON_CELL = 'data-on-cell'
const NAME_DATA_MODAL_OPEN = 'data-modal-open'
const NAME_DATA_CONFIRM = 'data-confirm'
const NAME_DATA_INFO = 'data-info'
const NAME_DATA_PLAYER_BAR = 'data-player-bar'
const NAME_DATA_CAPTURED = 'data-captured'
const NAME_DATA_COLOR = 'data-color'
const NAME_DATA_LEVEL_AI = 'data-level-ai'
const NAME_DATA_LOG_TIMESTAMP = 'data-log-timestamp'

// query selector elements
// game
const SELECTOR_ID_BOARDGAME = `#${NAME_BOARDGAME}`
const SELECTOR_CLASSNAME_CELL_COLS = `.${NAME_CELL_COLS}`
const SELECTOR_CLASSNAME_OPS_NEW_GAME_BTN = `.${NAME_OPERATIONS}[${NAME_DATA_CONFIRM}=${NAME_CONFIRM_BTN}]`
const SELECTOR_CLASSNAME_OPS_RESET_BTN = `.${NAME_OPERATIONS}[${NAME_DATA_CONFIRM}=${NAME_RESET_BTN}]`
const SELECTOR_CLASSNAME_SWITCH_ON_OF = `.${NAME_SWITCH_ON_OFF}`
const SELECTOR_CLASSNAME_MODAL = `.${NAME_MODAL}`
const SELECTOR_CLASSNAME_CLOSE_MODAL_BTN = `.${NAME_CLOST_MODAL_BTN}`
const SELECTOR_CLASSNAME_RADIO_LEVEL_AI = `.${NAME_RADIO_LEVEL_AI}`
const SELECTOR_CLASSNAME_LEVEL_AI_WRAPPER = `.${NAME_LEVEL_AI_WRAPPER}`

const SELECTOR_CLASSNAME_MOVEABLE = `.${NAME_MOVEABLE}`
const SELECTOR_CLASSNAME_PREV_MOVED = `.${NAME_PREV_MOVED}`
const SELECTOR_CLASSNAME_PAWNS_SELECTED = `.${NAME_PAWNS_SELECTED}`
const SELECTOR_ID_PLAY_GAME_BTN = `#${NAME_PLAY_GAME_BTN}`
const SELECTOR_ID_RESIGN_GAME_BTN = `#${NAME_RESIGN_GAME_BTN}`
const SELECTOR_ID_DRAW_GAME_BTN = `#${NAME_DRAW_GAME_BTN}`
const SELECTOR_ID_GAME_TIME = `#${NAME_GAME_TIME}`
const SELECTOR_CLASSNAME_STATUS_BAR = `.${NAME_STATUS_BAR}`

const SELECTOR_CLASSNAME_PAWNS_WRAPPER = `.${NAME_PAWNS_WRAPPER}`
const SELECTOR_ID_SETTINGS_MENU_BTN = `#${NAME_SETTINGS_MENU_BTN}`
const SELECTOR_DATA_INFO = `[${NAME_DATA_INFO}]`
const SELECTOR_ID_SOUND = `#${NAME_SOUND}`

// some specific initial
let is_modal_settings_open = false
let settings_changes = false

// default setting
const Default = {
  // define navigator mobile or desktop
  isMobileDevice: /android|iphone|kindle|ipad/i.test(navigator.userAgent),
  // settings
  settings: {
    use_swap: false,
    use_ai: true,
    use_music: false,
    ai_level: 0,
    time_secs: 180,
    is_playing: false,
  },
  // game play
  first_player: NAME_BLACK,
  first_player_color: NAME_BLACK,
  second_player: NAME_WHITE,
  second_player_color: NAME_WHITE,
  // log
  game_log: []
}

// game play
let turn_for = 'p1'

// default selector environments
// first create modals to completely html page
const boardgame = document.querySelector(SELECTOR_ID_BOARDGAME)
const settings_modal_elem = document.querySelector(`${SELECTOR_CLASSNAME_MODAL}[${NAME_DATA_MODAL_OPEN}=settings]`)
const infos = document.querySelectorAll(SELECTOR_DATA_INFO)
const settings_menu_btn = document.querySelector(SELECTOR_ID_SETTINGS_MENU_BTN)
const start_play_game_btn = document.querySelector(SELECTOR_ID_PLAY_GAME_BTN)
const resign_game_btn = document.querySelector(SELECTOR_ID_RESIGN_GAME_BTN)
const draw_game_btn = document.querySelector(SELECTOR_ID_DRAW_GAME_BTN)
const sound = document.querySelector(SELECTOR_ID_SOUND)
const game_time_btn = document.querySelector(SELECTOR_ID_GAME_TIME)
const switch_buttons_name = [NAME_AI, NAME_MUSIC]
const select_level_ai_btn = document.querySelectorAll(SELECTOR_CLASSNAME_RADIO_LEVEL_AI)
const confirm_settings_btn = document.querySelector(SELECTOR_CLASSNAME_OPS_NEW_GAME_BTN)
const reset_settings_btn = document.querySelector(SELECTOR_CLASSNAME_OPS_RESET_BTN)
const close_modal_btn = document.querySelector(SELECTOR_CLASSNAME_CLOSE_MODAL_BTN)

const status_bar_elems = document.querySelectorAll(SELECTOR_CLASSNAME_STATUS_BAR)

let settings = { ...Default.settings }
let moveable = []
let latestMove = []
let selectedPawn = null
let reqDraw, resign
let isReqDraw = false
let isContinue = false
let isAiContinue = false


const start_game = () => {
  const p1 = new Player('You')
  const p2 = new Player('AI')
  const checker = new Checker(settings, p1, p2)
  checker.start()
  
  // animation text
  Versus(settings.use_swap)
  

  // callback
  reqDraw = checker.requestDraw
  resign = checker.resign

  // listening pawns
  document.querySelectorAll(`${SELECTOR_CLASSNAME_PAWNS_WRAPPER}`).forEach(pawn => {
    pawn.addEventListener(EVENT_CLICK, e => {
      e.stopPropagation()

      // check is win
      if (checker.getIsGameEnd()) return

      // if not your pawn
      const player = checker.getDataPlayers(turn_for)
      const targetPawnsColor = e.currentTarget.dataset.pawnsSide
      if (targetPawnsColor !== player._color) return

      // if click same pawns that selected
      if (e.currentTarget.classList.contains(NAME_PAWNS_SELECTED)) return

      // selected cell
      selectedPawn = e.currentTarget.dataset.onCell.split('-').map(num => parseInt(num, 10))

      // clear old highlight
      clear_highlight()

      // get moveable pawns
      moveable = checker.getMoveableMap()

      // highlight new cells pawn select
      e.currentTarget.parentElement.classList.add(NAME_PAWNS_SELECTED)

      // highlight new cells moveable
      Object.keys(moveable[`[${selectedPawn[0]},${selectedPawn[1]}]`]).forEach(cell => {
        const [x, y] = JSON.parse(cell)
        document.querySelector(`${SELECTOR_CLASSNAME_CELL_COLS}[${NAME_DATA_CELL}="${x}-${y}"]`).classList.add(NAME_MOVEABLE)
      })
    }, false)
  })

  const aiMove = (turn_for) => {
    const [moveableMap, fromCell, toCell] = checker.autoPlay(turn_for)
    moveable = moveableMap
    let cell_wrapper_target = document.querySelector(`${SELECTOR_CLASSNAME_CELL_COLS}[${NAME_DATA_CELL}="${toCell[0]}-${toCell[1]}"]`)
    clear_highlight()
    move(fromCell, toCell, cell_wrapper_target)
  }
  const move = (from, to, cell_wrapper_target) => {
    // move pawns ui
    const [currRow, currCol] = from
    const pawn = document.querySelector(`${SELECTOR_CLASSNAME_PAWNS_WRAPPER}[${NAME_DATA_ON_CELL}="${currRow}-${currCol}"]`)
    cell_wrapper_target.append(pawn)
    pawn.setAttribute(NAME_DATA_ON_CELL, `${to[0]}-${to[1]}`)

    // if move for capture remove that pawns was captured
    const targetPawnCapture = moveable[`[${from[0]},${from[1]}]`][`[${to[0]},${to[1]}]`]
    if (JSON.stringify(targetPawnCapture) !== JSON.stringify(to)) {
      const parentCell = document.querySelector(`${SELECTOR_CLASSNAME_CELL_COLS}[${NAME_DATA_CELL}="${targetPawnCapture[0]}-${targetPawnCapture[1]}"]`)
      parentCell.removeChild(parentCell.childNodes[0])
    }

    // if move to other pawn base evolution to be Hos
    if (turn_for === 'p1' && to[0] === (settings.use_swap ? 7 : 0) && pawn.dataset.hos !== true
      || turn_for === 'p2' && to[0] === (settings.use_swap ? 0 : 7) && pawn.dataset.hos !== true) {
      pawn.dataset.hos = true
      pawn.classList.add('hos')
    }

    // highlight latest move
    latestMove = checker.getLastestMove()
    if (latestMove.length) {
      if (document.querySelector(`.${NAME_PREV_MOVED}`)) {
        document.querySelector(`.${NAME_PREV_MOVED}`).classList.remove(NAME_PREV_MOVED)
      }
      document.querySelector(`${SELECTOR_CLASSNAME_CELL_COLS}[${NAME_DATA_CELL}="${latestMove[2][0]}-${latestMove[2][1]}"]`).classList.add(NAME_PREV_MOVED)
    }

    Log(`${turn_for} select ${from} move to ${to}${latestMove[3][0] === 'c' ? ` capture ${targetPawnCapture}` : ''}`)

    if (checker.getThisTurnFor() === turn_for && !checker.getIsGameEnd()) {
      console.log('Continue move')
      if ((settings.use_swap && turn_for === 'p1') || (!settings.use_swap && turn_for === 'p2')) {
        isAiContinue = true
      }
      isContinue = true
      return
    }

    // check is end
    const isEnd = checker.getIsGameEnd()
    const isWin = checker.isWin(turn_for)
    if (isEnd && isWin._name) { 
      Alert_bar(`${isWin._name} is Winner`)
      resign_game_btn.innerText = 'Reset'
      draw_game_btn.removeEventListener(EVENT_CLICK, handler_request_draw)
      draw_game_btn.classList.remove(NAME_ACTIVE)
      draw_game_btn.setAttribute('disabled', true)

      Declaration(settings.use_swap, 'Win', isWin._role)
      return
    }

    turn_for = turn_for === 'p1' ? 'p2' : 'p1';

    // clear previous player status bar active
    if (document.querySelector(SELECTOR_CLASSNAME_STATUS_BAR + `.${NAME_ACTIVE}`)) {
      document.querySelector(SELECTOR_CLASSNAME_STATUS_BAR + `.${NAME_ACTIVE}`).classList.remove(NAME_ACTIVE)
    }
    document.querySelector(`${SELECTOR_CLASSNAME_STATUS_BAR}[${NAME_DATA_COLOR}="${turn_for === 'p1' ? 'black' : 'white'}"]`).classList.add(NAME_ACTIVE)
    clear_highlight()
    isContinue = false

  }

  // AI is p1
  if (settings.use_swap) {
    aiMove(turn_for)
  }


  document.querySelectorAll(`${SELECTOR_CLASSNAME_CELL_COLS}`).forEach(cell => {
    cell.addEventListener(EVENT_CLICK, e => {
      // check is win
      if (checker.getIsGameEnd()) return

      let cell_wrapper_target = e.currentTarget
      const target_cell = cell_wrapper_target.dataset.cell.split('-').map(num => parseInt(num, 10))
      if (!selectedPawn && cell_wrapper_target) return
      const is_target_in_moveable = moveable[`[${selectedPawn[0]},${selectedPawn[1]}]`][`[${target_cell[0]},${target_cell[1]}]`]


      if (selectedPawn && !cell_wrapper_target.children.length && !is_target_in_moveable) {
        clear_highlight()
        selectedPawn = null
        return
      }

      if (selectedPawn && moveable[`[${selectedPawn[0]},${selectedPawn[1]}]`] && !cell_wrapper_target.children.length) {
        const player = checker.getDataPlayers(turn_for)
        checker.move(player, selectedPawn, target_cell)

        clear_highlight()

        move(selectedPawn, target_cell, cell_wrapper_target)

        if (!isContinue || isAiContinue) {
          aiMove(turn_for)
          if (isAiContinue) {
            aiMove(turn_for)
            isAiContinue = false
          }
        }
      }
      selectedPawn = null
    })
  })
}

const handler_request_draw = () => {
  isReqDraw = true
  reqDraw(isReqDraw)
}

const handler_resign_game = e => {
  if (!settings.is_playing) {
    e.target.setAttribute('disabled', '')
    Alert_bar('Game has not start yet', false)
    return
  } else {
    // open confirm popup to resign
    Alert_confirm_popup('Do you confirm ?', 'This game will be reset', response => {
      if (response === 'confirm') {
        Log('Player resign confirmed!')
        Board(boardgame, false, true)
        settings = { ...Default.settings }
        selectedPawn = null
        latestMove = []
        moveable = []

        // enable settings buttons
        confirm_settings_btn.removeAttribute('disabled')
        reset_settings_btn.removeAttribute('disabled')

        // reset settings
        reset_settings_btn.click()

        // disabled nav menu draw btn
        draw_game_btn.removeEventListener(EVENT_CLICK, handler_request_draw)
        draw_game_btn.setAttribute('disabled', true)
        draw_game_btn.classList.remove(NAME_ACTIVE)

        // disabled nav menu resign btn
        resign_game_btn.removeEventListener(EVENT_CLICK, handler_resign_game)
        resign_game_btn.setAttribute('disabled', true)
        resign_game_btn.classList.remove(NAME_ACTIVE)
        resign()

        // enable nav menu start game btn
        start_play_game_btn.removeAttribute('disabled')
        start_play_game_btn.classList.add(NAME_ACTIVE)

        // clear previous player status bar active
        document.querySelector(SELECTOR_CLASSNAME_STATUS_BAR + `.${NAME_ACTIVE}`).classList.remove(NAME_ACTIVE)

        // remove event select level ai
        select_level_ai_btn.forEach(elem => {
          elem.addEventListener(EVENT_CLICK, handler_level_ai_setting)
        })

        // remove event select game time
        game_time_btn.addEventListener(EVENT_CHANGE, handler_game_time_setting)


      } else {
        Log('Player resign canceled.')
        return
      }
    })
  }
}

const handler_game_time_setting = e => {
  settings.time_secs = parseInt(e.target.value * 60)
  settings_changes = true
  Log(`Game time: ${e.target.value} mins`)
}

const handler_level_ai_setting = e => {
  if (e.target.getAttribute('checked')) return
  const currLevel = document.querySelector(`${SELECTOR_CLASSNAME_RADIO_LEVEL_AI}[checked=true]`)

  // remove current checked
  if (currLevel) {
    currLevel.removeAttribute('checked')
  }

  e.target.setAttribute('checked', true)

  settings.ai_level = isNaN(e.target.dataset.levelAi) ? 0 : e.target.dataset.levelAi * 1
  settings_changes = true

  Log(`Select AI level: ${LEVEL[e.target.dataset.levelAi]}`)
}

const event_listener_click_status_bar = e => {
  const curr_status_bar = document.querySelector(`${SELECTOR_CLASSNAME_STATUS_BAR}[${NAME_DATA_PLAYER_BAR}="you"]`)
  const cardYou = document.querySelector('#cardYou')
  const cardAi = document.querySelector('#cardAi')
  const color = e.target.dataset.color
  const anotherColor = color === 'white' ? 'black' : 'white'
  if (e.target.dataset.playerBar === 'you') {
    curr_status_bar.setAttribute(NAME_DATA_PLAYER_BAR, '')
    curr_status_bar.innerText = 'Select'
    if (cardYou) {
      cardYou.setAttribute('id', '')
      cardAi.setAttribute('id', '')
    }
    Log('Select color: None')
    return
  }
  if (curr_status_bar) {
    curr_status_bar.setAttribute(NAME_DATA_PLAYER_BAR, '')
    curr_status_bar.innerText = 'Select'
  }
  settings.use_swap = color === 'white'
  settings_changes = true
  if (cardYou) {
    cardYou.setAttribute('id', '')
    cardAi.setAttribute('id', '')
  }

  document.querySelector(`[data-player="${color}"]`).setAttribute('id', 'cardYou')
  document.querySelector(`[data-player="${anotherColor}"]`).setAttribute('id', 'cardAi')
  e.target.setAttribute(NAME_DATA_PLAYER_BAR, 'you')
  e.target.innerText = 'You'
  Log(`Select color: ${color}`)
}

const clear_highlight = () => {
  // clear old pawn selected
  if (document.querySelector(SELECTOR_CLASSNAME_PAWNS_SELECTED)) {
    document.querySelector(SELECTOR_CLASSNAME_PAWNS_SELECTED).classList.remove(NAME_PAWNS_SELECTED)

    // clear old moveable highlight
    document.querySelectorAll(SELECTOR_CLASSNAME_MOVEABLE).forEach(elem => elem.classList.remove(NAME_MOVEABLE))

    // latest move
    if (document.querySelector(SELECTOR_CLASSNAME_PREV_MOVED)) {
      document.querySelector(SELECTOR_CLASSNAME_PREV_MOVED).classList.remove(NAME_PREV_MOVED)
    }
  }
}

settings_menu_btn.addEventListener(EVENT_CLICK, e => {
  e.preventDefault()
  if (is_modal_settings_open) return

  // open settings modal
  settings_modal_elem.classList.add(NAME_ACTIVE)
  document.getElementById(NAME_DISPLAY_LOG).scrollTop = document.getElementById(NAME_DISPLAY_LOG).scrollHeight
  add_overlay_modal()
  disabled_all_btns()
  is_modal_settings_open = true
})

start_play_game_btn.addEventListener(EVENT_CLICK, e => {
  if (settings.is_playing) {
    Alert_bar('Game is starting', false)
    return
  }
  if (!document.querySelector(`${SELECTOR_CLASSNAME_STATUS_BAR}[${NAME_DATA_PLAYER_BAR}="you"]`)
  ) {
    Alert_bar('You still not select the pawns', false)
    return
  }

  // change state
  settings.is_playing = true

  // add AI to status bar
  document.querySelector(`${SELECTOR_CLASSNAME_STATUS_BAR}[${NAME_DATA_PLAYER_BAR}=""]`).setAttribute(NAME_DATA_PLAYER_BAR, 'AI')
  document.querySelector(`${SELECTOR_CLASSNAME_STATUS_BAR}[${NAME_DATA_PLAYER_BAR}="AI"]`).innerText = 'AI'

  // create pawns
  Board(boardgame, settings.use_swap)

  start_game()

  // enable resign button
  resign_game_btn.removeAttribute('disabled')
  resign_game_btn.classList.add(NAME_ACTIVE)
  // add listener event
  resign_game_btn.addEventListener(EVENT_CLICK, handler_resign_game)

  // enable draw button
  draw_game_btn.removeAttribute('disabled')
  draw_game_btn.classList.add(NAME_ACTIVE)
  // add listener event
  draw_game_btn.addEventListener(EVENT_CLICK, handler_request_draw)

  // disabled start game button
  e.target.classList.remove(NAME_ACTIVE)
  e.target.setAttribute('disabled', true)

  // disable operation button in settings menu
  confirm_settings_btn.setAttribute('disabled', true)
  reset_settings_btn.setAttribute('disabled', true)

  // remove listener event select level ai
  select_level_ai_btn.forEach(elem => {
    elem.removeEventListener(EVENT_CLICK, handler_level_ai_setting)
  })

  // remove listener event select game time
  game_time_btn.removeEventListener(EVENT_CHANGE, handler_game_time_setting)

  // initial highlight status bar first player
  document.querySelector(`${SELECTOR_CLASSNAME_STATUS_BAR}[${NAME_DATA_COLOR}="${turn_for === 'p1' ? 'black' : 'white'}"]`).classList.add(NAME_ACTIVE)

  // clear flag
  settings_changes = false
  Log('Game start')

  // remove listener status bar
  status_bar_elems.forEach(bar => {
    bar.removeEventListener(EVENT_CLICK, event_listener_click_status_bar)
  })
})

// setting time (dropdown)
game_time_btn.addEventListener(EVENT_CHANGE, handler_game_time_setting)

select_level_ai_btn.forEach(elem => {
  elem.addEventListener(EVENT_CLICK, handler_level_ai_setting)
})

switch_buttons_name.forEach(name => {
  // setting ai, music, side (switch)
  const switch_checkbox = document.querySelector(`#${NAME_CHECKBOX_USE}${name}`)
  switch_checkbox.addEventListener(EVENT_CLICK, () => {
    const curr_switch = document.querySelector(`${SELECTOR_CLASSNAME_SWITCH_ON_OF}[${NAME_DATA_USE_FOR}=${name}]`)

    // prevent repeat clicks while switch is not yet complete
    switch_checkbox.setAttribute('disabled', '')

    if (name === NAME_AI) {
      document.querySelector(SELECTOR_CLASSNAME_LEVEL_AI_WRAPPER).classList.toggle(NAME_ACTIVE)
    }

    if (name === NAME_MUSIC) {
      if (switch_checkbox.checked) {
        sound.volume = Default.isMobileDevice ? 0.1 : 0.015
        sound.play()
      } else {
        sound.pause()
      }
      Log(`${name}: ${switch_checkbox.checked ? 'on' : 'off'}`)
    }

    // toggle switch state
    if (curr_switch.classList.contains(NAME_ACTIVE)) {
      switch_checkbox.removeAttribute('checked')
    } else {
      switch_checkbox.setAttribute('checked', '')
    }
    curr_switch.classList.toggle(NAME_ACTIVE)

    switch_checkbox.checked = !!switch_checkbox.checked
    settings[`use_${name}`] = switch_checkbox.checked

    // timeout to clickable toggle switch
    setTimeout(() => {
      switch_checkbox.removeAttribute('disabled')
    }, 1000)
  })
})

infos.forEach(info => {
  info.addEventListener(EVENT_CLICK, e => {
    e.target.classList.toggle('open')
  })
})

// add event to close modal button
close_modal_btn.addEventListener(EVENT_CLICK, e => {
  e.preventDefault()
  close_overlay_modal(e.target.dataset.btnClose)
  able_all_btns()
  is_modal_settings_open = false

  if (settings_changes) {
    const is_discard_changes = confirm('Discard all changes ?')
    if (is_discard_changes) {
      settings = { ...Default.settings }
      confirm_settings_btn.removeAttribute('disabled')
      reset_settings_btn.removeAttribute('disabled')
      reset_settings_btn.click()
      settings_changes = false
    } else {
      return
    }
  }
})

confirm_settings_btn.addEventListener(EVENT_CLICK, e => {
  if (settings.is_playing) return
  close_modal_btn.click()
})

reset_settings_btn.addEventListener(EVENT_CLICK, e => {
  // reset settings
  settings = { ...Default.settings }

  // turn off music
  sound.pause()

  // turn off switch on off
  document.querySelectorAll(`${SELECTOR_CLASSNAME_SWITCH_ON_OF}.${NAME_ACTIVE}`).forEach(elem => {
    // except AI
    if (elem.dataset.useFor !== NAME_AI) {
      elem.classList.remove(NAME_ACTIVE)
    }
  })

  // reset game time
  game_time_btn.value = 3

  // reset level AI
  const curr_level_select_elem = document.querySelector(`${SELECTOR_CLASSNAME_RADIO_LEVEL_AI}[checked=true]`)
  if (curr_level_select_elem && curr_level_select_elem.value !== 'easy') {
    curr_level_select_elem.removeAttribute('checked')
    document.querySelector(`${SELECTOR_CLASSNAME_RADIO_LEVEL_AI}[value="easy"]`).setAttribute('checked', true)
  }

  // clear select bar
  status_bar_elems.forEach(bar => {
    bar.addEventListener(EVENT_CLICK, event_listener_click_status_bar)
    bar.setAttribute(NAME_DATA_PLAYER_BAR, '')
    bar.innerText = 'Select'
  })

  Log('Setting reset')
})

status_bar_elems.forEach(bar => {
  bar.addEventListener(EVENT_CLICK, event_listener_click_status_bar)
})