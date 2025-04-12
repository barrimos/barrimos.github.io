import Cell from "./Cell.js"

export const Board = (boardgame, isSwap = false, isStandBy = false) => {
  if (isStandBy) {
    (boardgame ?? document.querySelector('#boardgame')).innerHTML = `
      <div id="animationScene">
        <div id="" data-player="black" class="cardAnimation d-none"></div>
        <div id="cardVs" class="cardAnimation"></div>
        <div id="" data-player="white" class="cardAnimation d-none"></div>
      </div>
      <div class="row cell-rows" data-rows="0">
        <div class="col cell-cols" data-cell="0-0" data-cols="0"></div>
        <div class="col dark cell-cols" data-cell="0-1" data-cols="1"></div>
        <div class="col cell-cols" data-cell="0-2" data-cols="2"></div>
        <div class="col dark cell-cols" data-cell="0-3" data-cols="3"></div>
        <div class="col cell-cols" data-cell="0-4" data-cols="4"></div>
        <div class="col dark cell-cols" data-cell="0-5" data-cols="5"></div>
        <div class="col cell-cols" data-cell="0-6" data-cols="6"></div>
        <div class="col dark cell-cols" data-cell="0-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="1">
        <div class="col dark cell-cols" data-cell="1-0" data-cols="0"></div>
        <div class="col cell-cols" data-cell="1-1" data-cols="1"></div>
        <div class="col dark cell-cols" data-cell="1-2" data-cols="2"></div>
        <div class="col cell-cols" data-cell="1-3" data-cols="3"></div>
        <div class="col dark cell-cols" data-cell="1-4" data-cols="4"></div>
        <div class="col cell-cols" data-cell="1-5" data-cols="5"></div>
        <div class="col dark cell-cols" data-cell="1-6" data-cols="6"></div>
        <div class="col cell-cols" data-cell="1-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="2">
        <div class="col cell-cols" data-cell="2-0" data-cols="0"></div>
        <div class="col dark cell-cols" data-cell="2-1" data-cols="1"></div>
        <div class="col cell-cols" data-cell="2-2" data-cols="2"></div>
        <div class="col dark cell-cols" data-cell="2-3" data-cols="3"></div>
        <div class="col cell-cols" data-cell="2-4" data-cols="4"></div>
        <div class="col dark cell-cols" data-cell="2-5" data-cols="5"></div>
        <div class="col cell-cols" data-cell="2-6" data-cols="6"></div>
        <div class="col dark cell-cols" data-cell="2-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="3">
        <div class="col dark cell-cols" data-cell="3-0" data-cols="0"></div>
        <div class="col cell-cols" data-cell="3-1" data-cols="1"></div>
        <div class="col dark cell-cols" data-cell="3-2" data-cols="2"></div>
        <div class="col cell-cols" data-cell="3-3" data-cols="3"></div>
        <div class="col dark cell-cols" data-cell="3-4" data-cols="4"></div>
        <div class="col cell-cols" data-cell="3-5" data-cols="5"></div>
        <div class="col dark cell-cols" data-cell="3-6" data-cols="6"></div>
        <div class="col cell-cols" data-cell="3-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="4">
        <div class="col cell-cols" data-cell="4-0" data-cols="0"></div>
        <div class="col dark cell-cols" data-cell="4-1" data-cols="1"></div>
        <div class="col cell-cols" data-cell="4-2" data-cols="2"></div>
        <div class="col dark cell-cols" data-cell="4-3" data-cols="3"></div>
        <div class="col cell-cols" data-cell="4-4" data-cols="4"></div>
        <div class="col dark cell-cols" data-cell="4-5" data-cols="5"></div>
        <div class="col cell-cols" data-cell="4-6" data-cols="6"></div>
        <div class="col dark cell-cols" data-cell="4-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="5">
        <div class="col dark cell-cols" data-cell="5-0" data-cols="0"></div>
        <div class="col cell-cols" data-cell="5-1" data-cols="1"></div>
        <div class="col dark cell-cols" data-cell="5-2" data-cols="2"></div>
        <div class="col cell-cols" data-cell="5-3" data-cols="3"></div>
        <div class="col dark cell-cols" data-cell="5-4" data-cols="4"></div>
        <div class="col cell-cols" data-cell="5-5" data-cols="5"></div>
        <div class="col dark cell-cols" data-cell="5-6" data-cols="6"></div>
        <div class="col cell-cols" data-cell="5-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="6">
        <div class="col cell-cols" data-cell="6-0" data-cols="0"></div>
        <div class="col dark cell-cols" data-cell="6-1" data-cols="1"></div>
        <div class="col cell-cols" data-cell="6-2" data-cols="2"></div>
        <div class="col dark cell-cols" data-cell="6-3" data-cols="3"></div>
        <div class="col cell-cols" data-cell="6-4" data-cols="4"></div>
        <div class="col dark cell-cols" data-cell="6-5" data-cols="5"></div>
        <div class="col cell-cols" data-cell="6-6" data-cols="6"></div>
        <div class="col dark cell-cols" data-cell="6-7" data-cols="7"></div>
      </div>
      <div class="row cell-rows" data-rows="7">
        <div class="col dark cell-cols" data-cell="7-0" data-cols="0"></div>
        <div class="col cell-cols" data-cell="7-1" data-cols="1"></div>
        <div class="col dark cell-cols" data-cell="7-2" data-cols="2"></div>
        <div class="col cell-cols" data-cell="7-3" data-cols="3"></div>
        <div class="col dark cell-cols" data-cell="7-4" data-cols="4"></div>
        <div class="col cell-cols" data-cell="7-5" data-cols="5"></div>
        <div class="col dark cell-cols" data-cell="7-6" data-cols="6"></div>
        <div class="col cell-cols" data-cell="7-7" data-cols="7"></div>
      </div>
    `
    return
  }
  Cell(isSwap)
}