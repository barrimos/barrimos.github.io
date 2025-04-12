'use strict'

class Player {
  constructor(name, expRate) {
    this._name = name
    this.state = []
    this.lr = 0.2
    this.expRate = expRate || 0.03
    this.decayGamma = 0.9
    this.stateValue = {}
  }
  deepCopyState = state => {
    return JSON.parse(JSON.stringify(state))
  }
  chooseAction = (expandSearch, settings, currState, currPlayers, currCapturable, currMoveableMap, currAvailablePawnsMove, turnFor) => {
    // Deep copy ของ state และ players สำหรับ simulation
    let rootState = this.deepCopyState(currState);
    let players = JSON.parse(JSON.stringify(currPlayers))

    // สร้าง candidate moves จาก currMoveableMap
    // สมมุติว่า currMoveableMap มี key เป็น stringified cell เช่น "[row,col]"
    // และ value เป็น object ที่ key เป็น stringified destination cell
    // โดยถ้า move นั้นเป็น capture จะเก็บ captured cell ใน value ด้วย
    let moves = []
    for (let key in currMoveableMap) {
      let fromCell = JSON.parse(key)
      for (let destStr in currMoveableMap[key]) {
        let toCell = JSON.parse(destStr)
        // captureCell อาจจะเป็น undefined ถ้าไม่ใช่ capture move
        let captureCell = currMoveableMap[key][destStr]
        moves.push({ from: fromCell, to: toCell, capture: captureCell })
      }
    }

    // เริ่มต้นเรียก minimaxDecision ด้วย depth 4 และค่าเริ่มต้นของ alpha, beta
    const depth = 4
    const result = this.minimaxDecision(expandSearch, settings, rootState, turnFor, players, moves, depth, -Infinity, Infinity)

    // result.move ควรประกอบด้วย { from, to }
    if (result && result.move) {
      return [result.move.from, result.move.to]
    }
    return [null, null]
  }

  minimaxDecision = (expandSearch, settings, state, turnFor, players, moves, depth, alpha, beta) => {
    // Base case: ถ้า depth == 0 หรือไม่มี candidate movesก็ evaluate state
    if (depth === 0 || moves.length === 0) {
      return { value: this.evaluateState(state, players[turnFor]._pawnsSet, turnFor) }
    }

    let bestMove = null;
    let bestValue = (turnFor === 'p1') ? -Infinity : Infinity
    let action = 'm'

    // Loop candidate movesในสถานะนี้
    for (const move of moves) {
      // สร้าง deep copy สำหรับ simulation ของ state และ players
      let newState = this.deepCopyState(state)
      let newPlayers = JSON.parse(JSON.stringify(players))

      // Simulate move โดยอัปเดต newState และ newPlayers ตาม move ที่เลือก
      let from = move.from
      let to = move.to
      newState[to[0]][to[1]] = newState[from[0]][from[1]]
      newState[from[0]][from[1]] = '.'

      // ถ้า move เป็น capture ให้ลบ pawn ของฝ่ายตรงข้ามออก
      if (move.capture) {
        let cap = move.capture;
        newState[cap[0]][cap[1]] = '.'
        const opponent = (turnFor === 'p1') ? 'p2' : 'p1'
        newPlayers[opponent]._pawnsSet = newPlayers[opponent]._pawnsSet.filter(p => !(p[0] === cap[0] && p[1] === cap[1]))
        action = ['c', cap]
      }

      // อัปเดต pawn set ของผู้เล่นที่เคลื่อนที่
      newPlayers[turnFor]._pawnsSet = newPlayers[turnFor]._pawnsSet.map(p =>
        (p[0] === from[0] && p[1] === from[1]) ? to : p
      )

      // ตรวจสอบเงื่อนไข promotion
      if ((turnFor === 'p1' && to[0] === (settings.use_swap ? 7 : 0)
        && newState[to[0]][to[1]].toLowerCase() === 'o')
      ||(turnFor === 'p2' && to[0] === (settings.use_swap ? 0 : 7)
        && newState[to[0]][to[1]].toLowerCase() === 'x')
      ) {
        newState[to[0]][to[1]] = newState[to[0]][to[1]].toUpperCase()
      }

      const latestMove = [turnFor, from, to, action]

      // เปลี่ยน turn
      let nextTurn = (turnFor === 'p1') ? 'p2' : 'p1'

      // ในขั้นตอนนี้ เราต้องสร้าง candidate moves ใหม่จาก state ใหม่
      // สมมุติว่า expandSearch ใช้สำหรับ simulation และจะ return [availMoves, newMoveableMap, newCapturable]
      let [availMoves, newMoveableMap, newCapturable] = expandSearch(newPlayers[nextTurn], true, newState, latestMove, nextTurn)
      let nextMoves = []
      // สร้าง candidate moves จาก newMoveableMap แบบเดียวกับข้างบน
      for (let key in newMoveableMap) {
        let fromCellNext = JSON.parse(key)
        for (let destStr in newMoveableMap[key]) {
          let toCellNext = JSON.parse(destStr)
          let captureCellNext = newMoveableMap[key][destStr]
          nextMoves.push({ from: fromCellNext, to: toCellNext, capture: captureCellNext })
        }
      }

      // เรียก recursion
      let result = this.minimaxDecision(expandSearch, settings, newState, nextTurn, newPlayers, nextMoves, depth - 1, alpha, beta)
      let value = result.value

      if (turnFor === 'p1') {
        if (value > bestValue) {
          bestValue = value
          bestMove = move
        }
        alpha = Math.max(alpha, bestValue)
      } else {
        if (value < bestValue) {
          bestValue = value
          bestMove = move
        }
        beta = Math.min(beta, bestValue)
      }

      if (beta <= alpha) {
        break
      }
    }

    return { value: bestValue, move: bestMove }
  }

  evaluateState = (state, pawnsSet, currTurn) => {
    let value = 0
    for (let i in pawnsSet) {
      const piece = state[pawnsSet[i][0]][pawnsSet[i][1]]
      if (currTurn === 'p1') {
        if (piece === 'O' || piece === 'o') value++
        else if (piece === 'X' || piece === 'x') value--
      } else {
        if (piece === 'O' || piece === 'o') value--
        else if (piece === 'X' || piece === 'x') value++
      }
    }
    return value
  }

  addState = () => { }
  getHash = () => { }
  feedReward = () => { }
  reset = () => { }
  savePolicy = () => { }
  loadPolicy = () => { }
}

class Checker {
  #_state
  #_moveableMap
  #_availablePawnsMove
  #_capturable
  #_turnFor
  #_settings
  #_directions
  #_isGameStart
  #_players
  #_logMove
  #_mainPhase
  #_postMainPhase
  #_isGameEnd
  constructor(settings, p1, p2) {
    this.#_state = [
      //  0    1    2    3    4    5    6    7
      // ['.', 'x', '.', '.', '.', 'x', '.', 'x'], // 0
      // ['x', '.', 'x', '.', 'x', '.', '.', '.'], // 1
      // ['.', 'O', '.', '.', '.', '.', '.', '.'], // 2
      // ['o', '.', 'x', '.', 'x', '.', '.', '.'], // 3
      // ['.', '.', '.', '.', '.', '.', '.', '.'], // 4
      // ['.', '.', '.', '.', '.', '.', '.', '.'], // 5
      // ['.', '.', '.', 'o', '.', 'o', '.', 'o'], // 6
      // ['.', '.', 'o', '.', 'o', '.', 'o', '.'], // 7

      ['.', 'x', '.', 'x', '.', 'x', '.', 'x'], // 0
      ['x', '.', 'x', '.', 'x', '.', 'x', '.'], // 1
      ['.', '.', '.', '.', '.', '.', '.', '.'], // 2
      ['.', '.', '.', '.', '.', '.', '.', '.'], // 3
      ['.', '.', '.', '.', '.', '.', '.', '.'], // 4
      ['.', '.', '.', '.', '.', '.', '.', '.'], // 5
      ['.', 'o', '.', 'o', '.', 'o', '.', 'o'], // 6
      ['o', '.', 'o', '.', 'o', '.', 'o', '.'], // 7
      //  0    1    2    3    4    5    6    7
    ]
    this._phaseLog = {
      'standby': '--- standby phase expanding search ---',
      'main': '--- main phase ---',
      'preEnding': '--- pre-ending phase expanding search ---',
      'end': '--- end phase and switch turn ---'
    }
    this.#_capturable = []
    this.#_moveableMap = {}
    this.#_availablePawnsMove = []
    this.#_turnFor = 'p1'
    this.#_settings = settings
    this.#_directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    this.#_isGameStart = false
    this.#_isGameEnd = true
    this.#_players = {
      p1: {
        ...p1,
        _symbol: 'oO',
        _role: 'p1',
        _color: 'black',
        // _pawnsSet: [[2, 1], [3, 0], [6, 3], [6, 5], [6, 7], [7, 2], [7, 4], [7, 6]]
        _pawnsSet: [[6, 1], [6, 3], [6, 5], [6, 7], [7, 0], [7, 2], [7, 4], [7, 6]]
      },
      p2: {
        ...p2,
        _symbol: 'xX',
        _role: 'p2',
        _color: 'white',
        // _pawnsSet: [[0, 1], [0, 5], [0, 7], [1, 0], [1, 2], [1, 4], [3, 2], [3, 4]]
        _pawnsSet: [[0, 1], [0, 3], [0, 5], [0, 7], [1, 0], [1, 2], [1, 4], [1, 6]]
      }
    }
    this.#_logMove = []
    this.#_mainPhase = false
    this.#_postMainPhase = false
  }
  errorHandlerCheckPawnSymbol = (state, cell) => {
    if (!'xXoO'.includes(state[cell[0]][cell[1]])) {
      throw Error(`Selected pawn [${cell[0]}, ${cell[1]}] is invalid, it is empty cell or not your pawn.`)
    }
  }
  errorHandlerCheckOutOfBoard = cell => {
    if (cell[0] > 7 || cell[0] < 0 || cell[1] < 0 || cell[1] > 7) {
      throw Error(`Expected cell coordinate [0, 0] - [7, 7], Got [${cell[0]}, ${cell[1]}].`)
    }

    if (cell.length > 2 || cell.length <= 1) {
      throw Error(`Expected cell has 2 coordinates, Got ${cell.length} coordinates.`)
    }
  }
  start = (isSimulate = false) => {
    if (this.#_isGameStart) {
      console.log('Game is starting.')
      return
    }

    if (this.#_settings.use_swap) {
      // rotate state 180deg
      const half = Math.floor(8 / 2)
      for (let halfRowTop = 0; halfRowTop < half; halfRowTop++) {
        const halfRowBottom = 8 - 1 - halfRowTop;
        if (halfRowTop === halfRowBottom) continue
        // swap between half top row and half bottom row
        [this.#_state[halfRowTop], this.#_state[halfRowBottom]] = [this.#_state[halfRowBottom], this.#_state[halfRowTop]];

        // swap between half left col and half right col each row
        for (let halfColLeft = 0; halfColLeft < half; halfColLeft++) {
          const halfColRight = 8 - 1 - halfColLeft;

          // half top row
          [this.#_state[halfRowTop][halfColLeft], this.#_state[halfRowTop][halfColRight]] = [this.#_state[halfRowTop][halfColRight], this.#_state[halfRowTop][halfColLeft]];

          // half bottom row
          [this.#_state[halfRowBottom][halfColLeft], this.#_state[halfRowBottom][halfColRight]] = [this.#_state[halfRowBottom][halfColRight], this.#_state[halfRowBottom][halfColLeft]];
        }

        // update pawns set
        this.#_players.p1._pawnsSet[halfRowTop] ? this.#_players.p1._pawnsSet[halfRowTop] = [7 - this.#_players.p1._pawnsSet[halfRowTop][0], 7 - this.#_players.p1._pawnsSet[halfRowTop][1]] : false;
        this.#_players.p1._pawnsSet[halfRowBottom] ? this.#_players.p1._pawnsSet[halfRowBottom] = [7 - this.#_players.p1._pawnsSet[halfRowBottom][0], 7 - this.#_players.p1._pawnsSet[halfRowBottom][1]] : false;
        this.#_players.p2._pawnsSet[halfRowTop] ? this.#_players.p2._pawnsSet[halfRowTop] = [7 - this.#_players.p2._pawnsSet[halfRowTop][0], 7 - this.#_players.p2._pawnsSet[halfRowTop][1]] : false;
        this.#_players.p2._pawnsSet[halfRowBottom] ? this.#_players.p2._pawnsSet[halfRowBottom] = [7 - this.#_players.p2._pawnsSet[halfRowBottom][0], 7 - this.#_players.p2._pawnsSet[halfRowBottom][1]] : false;

        [this.#_players.p1._pawnsSet, this.#_players.p2._pawnsSet] = [this.#_players.p2._pawnsSet, this.#_players.p1._pawnsSet];
      }
      [this.#_players.p1._name, this.#_players.p2._name] = [this.#_players.p2._name, this.#_players.p1._name];
    }

    this.#_isGameStart = true
    this.#_isGameEnd = false

    if (!isSimulate) {
      // initial expand search for p1
      this.expandSearch(this.#_players[this.#_turnFor])
    }
  }
  resign = () => {
    this.#_isGameStart = false
    this.#_isGameEnd = true
  }
  isWin = turnFor => {
    const otherPawns = this.#_players[turnFor === 'p1' ? 'p2' : 'p1']._pawnsSet.length
    const players = this.#_players[turnFor]

    if (otherPawns === 0) {
      this.#_isGameStart = false
      this.#_isGameEnd = true
      return players
    } else {
      return false
    }
  }
  requestDraw = () => {
    if (this.#_players.p1._pawnsSet.length === 1 && this.#_players.p1._pawnsSet.length === this.#_players.p2._pawnsSet.length) {
      const [x1, y1] = this.#_players.p1._pawnsSet[0]
      const [x2, y2] = this.#_players.p2._pawnsSet[0]
      const isOnlyMove = this.getLastestMove(5).every(log => log.includes('m'))
      if (this.#_state[x1][y1] + this.#_state[x2][y2] === 'OX' && isOnlyMove) {
        console.log('Game draw')
        this.#_isGameEnd = true
        this.#_isGameStart = false
        return
      }
    }
    console.log('Game is still playable.')
  }
  isYourTurn = player_role => {
    if (player_role !== this.#_turnFor) throw Error(`Not your turn. This turn for "${this.#_turnFor}"`)
  }
  switchTurn = () => {
    this.#_turnFor = this.#_turnFor === 'p1' ? 'p2' : 'p1'
  }
  isHos = (state, cell) => {
    const piece = state[cell[0]][cell[1]]
    return (piece === 'O' || piece === 'X')
  }
  move = (player, fromCell, toCell) => {
    let action = 'm'
    let isPromoteToHos = false
    try {
      // check is game start
      if (!this.#_isGameStart) throw Error('Game not start yet.')

      this.errorHandlerCheckPawnSymbol(this.#_state, fromCell)
      this.errorHandlerCheckOutOfBoard(fromCell)
      this.errorHandlerCheckOutOfBoard(toCell)
      if (!player._role || !['p1', 'p2'].includes(player._role)) throw Error('Permission denied.')
      this.isYourTurn(player._role)

      if (!this.#_mainPhase) throw Error('Can not move from this phase.')
      // console.log(this._phaseLog.main)

      const pawnsSet = this.#_turnFor === 'p1' ? this.#_players.p1._pawnsSet : this.#_players.p2._pawnsSet

      const moveToCapture = this.#_moveableMap[`[${fromCell[0]},${fromCell[1]}]`][`[${toCell[0]},${toCell[1]}]`]

      if (!moveToCapture) {
        throw Error(`Your move ${fromCell} to ${toCell} is incorrect. Expected ${Object.keys(this.#_moveableMap[`[${fromCell[0]},${fromCell[1]}]`])}`)
      }

      if (this.#_capturable.length) {
        if (JSON.stringify(this.#_availablePawnsMove).includes(JSON.stringify(fromCell))) {
          if (!moveToCapture) throw Error(`Target to capture is incorrect. Your target capture is ${moveToCapture}`)

          // update state
          const [row, col] = moveToCapture
          this.#_state[row][col] = '.'

          // filter out which pawn was capture
          if (this.#_turnFor === 'p1') {
            this.#_players.p2._pawnsSet = this.#_players.p2._pawnsSet.filter(pawn => !(pawn[0] === row && pawn[1] === col))
          } else {
            this.#_players.p1._pawnsSet = this.#_players.p1._pawnsSet.filter(pawn => !(pawn[0] === row && pawn[1] === col))
          }

          action = ['c', [row, col]]
        } else {
          throw Error(`You have to capture the other pawn if it possible. In this case you can moveable only pawn ${this.#_availablePawnsMove.join(' or ')}`)
        }
      }

      // update state
      const temp = this.#_state[toCell[0]][toCell[1]]
      this.#_state[toCell[0]][toCell[1]] = this.#_state[fromCell[0]][fromCell[1]]
      this.#_state[fromCell[0]][fromCell[1]] = temp

      // update pawns set for move forward
      pawnsSet.forEach((pawn, i) => {
        if (pawn[0] === fromCell[0] && pawn[1] === fromCell[1]) {
          // console.log(`${player._name} move [${pawn}] to [${toCell}]`)
          pawnsSet[i] = toCell
          return
        }
      })

      // update log move
      this.#_logMove.push([this.#_turnFor, fromCell, toCell, action])

      // check win
      const winner = this.isWin(this.#_turnFor)
      if (winner) {
        console.log(`${winner._name}[${winner._role}] is Winner`)
        return
      }

      // if pawns can move to another four border cells (row 0 and 7)
      // that pawns will changes to Hos (long diagonal move)
      if ((this.#_turnFor === 'p1' && toCell[0] === (this.#_settings.use_swap ? 7 : 0) && this.#_state[toCell[0]][toCell[1]] !== 'O')
        || (this.#_turnFor === 'p2' && toCell[0] === (this.#_settings.use_swap ? 0 : 7) && this.#_state[toCell[0]][toCell[1]] !== 'X')
      ) {
        this.#_state[toCell[0]][toCell[1]] = this.#_state[toCell[0]][toCell[1]].toLocaleUpperCase()
        isPromoteToHos = true
      }

      // expanding search again before end turn
      // in case this turn capture other pawn
      // it sometimes it double or triple capture
      this.#_postMainPhase = true
      // console.log(this._phaseLog.preEnding)
      this.expandSearch(player)

      // after expand search #_standbyPhase will be false and #_mainPhase will be true
      if (action === 'm' || !this.#_capturable.length || isPromoteToHos) {
        // switch turn for
        // fixed "player" role to comparision
        // for determind that which pawn set should select
        // can't use "role" from player object because role as same as turnFor it always be true
        this.switchTurn()
        this.#_mainPhase = false
        this.#_postMainPhase = false
        // console.log(this._phaseLog.end)

        // if can not capture other pawn has to switch turn
        // then reset tracking for new tracking next player
        this.#_capturable = []
        this.#_moveableMap = {}
        this.#_availablePawnsMove = []

        // expand search for next player
        this.expandSearch(this.#_players[this.#_turnFor])
      } else if (action[0] === 'c') {
        // if still capturable
        this.#_postMainPhase = false
        // console.log(this._phaseLog.main)
      }
    } catch (err) {
      console.error(err)
    }
  }
  expandSearch = (player, isSimulate = false, simState = null, latestMove = null, simTurnFor = null) => {
    try {
      // check is game start
      if (!this.#_isGameStart) throw Error('Game not start yet.')

      // validate
      if (!player._role || !['p1', 'p2'].includes(player._role)) throw Error('Permission denied.')

      // check is yours turn
      if (!isSimulate) {
        this.isYourTurn(player._role)
      }

      // reset previous data
      if (!isSimulate) {
        this.#_capturable = []
        this.#_moveableMap = {}
        this.#_availablePawnsMove = []
      }
      let capturable = []
      let moveableMap = {}
      let availablePawnsMove = []
      let isCapture = false

      /** Temporary variables are used to track pawns that are forced to move during a turn due to the "force capture" rule.
       *    - `tempAvailablePawnsMove` (array): Tracks pawns that must move.
       *    - `tempMoveableMap` (hash map): Stores:
       *        * Target pawns to move.
       *        * Target cells to move to.
       *        * Target pawns that can be captured (if applicable).
       *
       * These temporary variables are reset for reuse at the start of each player's turn.
       *
       * During the expanding search:
       *    - Each direction is explored to find valid moves.
       *    - If a capturable pawn is found in a direction:
       *        * All previous moves (stored in `availablePawnsMove` and `moveableMap`) are cleared.
       *        * Only moves for the current direction (with the capturable pawn) are retained.
       *
       * Without temporary variables, this approach can cause issues:
       *    - If a capturable pawn is found in a direction that is not the last, it clears all previous valid moves.
       *    - This makes the game unplayable because players should be able to choose which pawn to move for a capture, not just the last one found.
       *
       * To solve this:
       *    - Use `tempAvailablePawnsMove` and `tempMoveableMap` to store moves during the search.
       *    - After the search is complete, replace the global variables (`availablePawnsMove` and `moveableMap`) with the temporary values.
       * This ensures the "force capture" rule is enforced while allowing players to choose which pawn to move.
       */
      let tempAvailablePawnsMove = []
      let tempMoveableMap = {}

      // console.log(`${player._name}[${player._role}]'s turn, ${this._phaseLog.standby}`)

      // get latest move and check that log 'm' or 'c' (move or capture)
      const latestMoved = (isSimulate && simTurnFor === latestMove[0]) ? latestMove : this.getLastestMove()

      // if expading search execute in stack at end phase, it check that latest moved
      // if it's just move to other base Hos or just move, then return back to stack, end and switch turn
      // if latest move is captured then expanding search to see if you can still catch other pawns
      // if capturable continue to play
      // if not any pawn can capture then end and switch turn
      if ((this.#_postMainPhase || (isSimulate && simTurnFor === latestMove[0])) && (latestMoved[3] === 'm' && (latestMoved[2][0] === 0 || latestMoved[2][0] === 7))) return

      // if this expading search at end phase use latest move to be pivot for expanding search
      const pawnsSet = (this.#_postMainPhase || ((isSimulate && simTurnFor === latestMove[0]) && latestMoved[3][0] === 'c')) ? [latestMoved[2]] : isSimulate ? player._pawnsSet : this.#_players[this.#_turnFor]._pawnsSet

      // iteration each pawn
      for (const [row, col] of pawnsSet) {
        // init hash map cell
        if (!isSimulate) {
          this.#_moveableMap[`[${row},${col}]`] = {}
        }
        moveableMap[`[${row},${col}]`] = {}
        tempMoveableMap[`[${row},${col}]`] = {}

        // check is Hos or not
        const isHosRank = this.isHos(isSimulate ? simState : this.#_state, [row, col])

        // if Hos it can iteration all 4 directions if not just 2
        const loopDir = isHosRank ? 4 : 2

        // if it ai turn will iteration upside-down (default top-bottom for player)
        const upsideDown = (simTurnFor || this.#_turnFor) === 'p1' ? !this.#_settings.use_swap ? 1 : -1 : !this.#_settings.use_swap ? -1 : 1

        // iteration each direction
        for (let i = 0; i < loopDir; i++) {
          const deltaRow = this.#_directions[i][0] * upsideDown
          const deltaCol = this.#_directions[i][1]

          let nextRow = row + deltaRow
          let nextCol = col + deltaCol

          // loop this direction until boundery
          // or found same side
          // or found other pawn capturable
          while (nextRow >= 0 && nextRow < 8
            && nextCol >= 0 && nextCol < 8
          ) {
            const nextPawnSymbol = isSimulate ? simState[nextRow][nextCol] : this.#_state[nextRow][nextCol]

            // if same side            
            if (player._symbol.includes(nextPawnSymbol)) break

            // if not same side check possible to capture
            if (nextPawnSymbol !== '.'
              && !player._symbol.includes(nextPawnSymbol)
            ) {
              // check is that pawns can capture by check cell behide is that pawn empty
              // store at new variable not overwrite
              const jumpRow = nextRow + deltaRow
              const jumpCol = nextCol + deltaCol

              if (jumpRow >= 0 && jumpRow < 8
                && jumpCol >= 0 && jumpCol < 8
              ) {
                if ((simState ?? this.#_state)[jumpRow][jumpCol] === '.') {
                  if (!JSON.stringify(isSimulate ? capturable : this.#_capturable).includes(JSON.stringify([jumpRow, jumpCol]))) {
                    if (!isSimulate) {
                      this.#_capturable.push([jumpRow, jumpCol])

                      // reset previous cell
                      // because when possible to capture
                      // from the ruls player can't move other pawns
                      // except the pawns that can capture other pawns
                      this.#_availablePawnsMove = []
                      this.#_moveableMap = {}
                      this.#_availablePawnsMove = tempAvailablePawnsMove
                      this.#_moveableMap = tempMoveableMap
                    }
                    capturable.push([jumpRow, jumpCol])
                    availablePawnsMove = []
                    moveableMap = {}
                    availablePawnsMove = tempAvailablePawnsMove
                    moveableMap = tempMoveableMap
                    isCapture = true
                  }

                  if (!JSON.stringify(tempAvailablePawnsMove).includes(JSON.stringify([row, col]))) {
                    tempAvailablePawnsMove.push([row, col])
                  }
                  tempMoveableMap[`[${row},${col}]`][`[${jumpRow},${jumpCol}]`] = [nextRow, nextCol]
                }
              }
              break
            }

            // storing pawn that moveable in this turn
            // if previous direction found pawn capturable
            // this direction might skip
            if (!JSON.stringify(isSimulate ? availablePawnsMove : this.#_availablePawnsMove).includes(JSON.stringify([row, col])) && !isCapture) {
              if (!isSimulate) {
                this.#_availablePawnsMove.push([row, col])
              }
              availablePawnsMove.push([row, col])
            }

            // map pawn that moveable with where cell can move to
            if (nextPawnSymbol === '.' && !isCapture) {
              if (!isSimulate) {
                this.#_moveableMap[`[${row},${col}]`][`[${nextRow},${nextCol}]`] = [nextRow, nextCol]
              }
              moveableMap[`[${row},${col}]`][`[${nextRow},${nextCol}]`] = [nextRow, nextCol]
            }

            if (!isHosRank) break

            nextRow += deltaRow
            nextCol += deltaCol
          }
        }
      }
      this.#_mainPhase = true
      if (isSimulate) {
        return [availablePawnsMove, moveableMap, capturable]
      }
    } catch (err) {
      console.error(err)
    }
  }
  autoPlay = turn_for => {
    let state = this.getState()
    let player = this.getDataPlayers(turn_for)
    this.expandSearch(player)
    let capturable = this.getCapturable()
    let moveableMap = this.getMoveableMap()
    let availablePawnsMove = this.getAvailablePawnsMove()
    let [fromCell, toCell] = player.chooseAction(
      this.expandSearch,
      this.getSettings(),
      state,
      this.getDataPlayers(),
      capturable,
      moveableMap,
      availablePawnsMove,
      turn_for
    )

    this.move(player, fromCell, toCell)
    return [moveableMap, fromCell, toCell]
  }
  printState = () => {
    for (let i in this.#_state) {
      console.log(i, this.#_state[i].join(' '))
    }
    console.log([' ', 0, 1, 2, 3, 4, 5, 6, 7].join(' '))
  }
  getState = () => {
    return this.#_state
  }
  getCapturable = () => {
    return this.#_capturable
  }
  getMoveableMap = () => {
    return this.#_moveableMap
  }
  getAvailablePawnsMove = () => {
    return this.#_availablePawnsMove
  }
  getIsGameEnd = () => {
    return this.#_isGameEnd
  }
  getThisTurnFor = () => {
    return this.#_turnFor
  }
  getDataPlayers = player => {
    if (!player) {
      return this.#_players
    }
    return this.#_players[player]
  }
  getPawnsSet = player => {
    if (!player) {
      return this.#_players[this.#_turnFor]._pawnsSet
    }
    return this.#_players[player]._pawnsSet
  }
  getSettings = () => {
    return this.#_settings
  }
  getLastestMove = (numLast = 1) => {
    if (numLast === 1) {
      return this.#_logMove[this.#_logMove.length - 1]
    } else if (numLast === 0) {
      return this.#_logMove
    } else {
      return this.#_logMove.slice(this.#_logMove.length - numLast, this.#_logMove.length)
    }
  }
}

// const settings = { use_swap: false }
// const a1 = new Player('n1')
// const a2 = new Player('n2')
// const game = new Checker(settings, a1, a2)
// game.start()
// game.autoPlay()

export { Checker, Player }