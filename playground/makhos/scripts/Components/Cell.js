import Pawns from "./Pawns.js"

/**
 * 
 * @param {*} isSwap boolean, default false when select black color, true when select white color
 */
const Cell = (isSwap = false) => {
  let pawn = ''
  const r = [0, 0, 0, 0, 1, 1, 1, 1, 6, 6, 6, 6, 7, 7, 7, 7]
  const c = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6]

  for (let i = 0; i < r.length; i++) {
    pawn = Pawns(i > 7
      ? isSwap
        ? 'white' : 'black'
      : isSwap
        ? 'black' : 'white', [r[i], c[i]])
    document.querySelector(`.col.dark.cell-cols[data-cell="${r[i]}-${c[i]}"]`).innerHTML += pawn
  }
}

export default Cell