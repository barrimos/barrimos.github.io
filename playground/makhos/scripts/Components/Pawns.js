/**
 * 
 * @param {*} color 
 * @param {*} cell 
 * @param {*} hos 
 * @returns 
 */
const Pawns = (color, cell, hos = false) => {
  return `<div class="pawns-wrapper" data-on-cell="${cell[0]}-${cell[1]}" data-pawns-side="${color}" data-hos="${hos}"></div>`
}

export default Pawns