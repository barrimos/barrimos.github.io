"use strict";
// matrices contorl
let DIMENSION = 3;
let _d = DIMENSION;
let DATA_NUM = 0;
let INCREASE_DECREASE = true;

// storage input
let MA = "";
let MB = "";
let MRESULT = "";

// control buttons
const CLEAR_BUTTON = document.getElementById("clear");
const RESET_BUTTON = document.getElementById("reset");
const INCREASE_BUTTON = document.getElementById("increase");
const DECREASE_BUTTON = document.getElementById("decrease");

// method buttons
const DET = document.getElementById("det");
const TRANSPOSE = document.getElementById("transpose");
const IDENTITY = document.getElementById("identity");
const INVERSE = document.getElementById("inverse");
const SCALAR = document.getElementById("scalar");
const EXPONENTIAL = document.getElementById("exponential");
const SHIFT = document.getElementById("shift");
const MINOR = document.getElementById("minor");
const COFACTOR = document.getElementById("cofactor");
const DIAGONAL = document.getElementById("diagonal");
const TRACE = document.getElementById("trace");
const TRIANGULAR_UP = document.getElementById("triup");
const TRIANGULAR_DOWN = document.getElementById("tridown");
const CONVOLUTION = document.getElementById("conv");
const CONVOLUTION_EDGE = document.getElementById("convEdge");
const PADDING = document.getElementById("pad");
const TRANSFORM_SQUARE = document.getElementById("transform_sqr");
const IS_SQUARE = document.getElementById("chk_sqr");
const ADD_ZEROES = document.getElementById("add_zeroes");
const RANK = document.getElementById("rank");


// elements
const MATRICES_LEFT = document.querySelector(".matrix-A");
let INPUT_CELL_A = [];
let INPUT_CELL_B = [];
// const MATRICES_RIGHT = document.querySelector(".matrix-B");


window.addEventListener("load", () => {
    matrix();
});


function input_control(x){
    if(x === "" || parseInt(x) === 0){
        return;
    } else {
        _d = parseInt(x);
        matrix();
    }
}

function matrix(){
    let LIMIT = (DIMENSION * 2) + 1;

    // input control
    if(_d < DIMENSION){
        LIMIT = Math.abs((DIMENSION**2) - (_d**2));
        DIMENSION = _d;
        INCREASE_DECREASE = false;
    } else {
        DIMENSION = _d;
    }

    let SIZE = DIMENSION * DIMENSION;
    const INPUT_WIDTH = `repeat(${DIMENSION}, minmax(20px, 50px))`;
    const INPUT_HEIGHT = `repeat(${DIMENSION}, minmax(20px, 30px))`;
    
    MATRICES_LEFT.style.gridTemplateColumns = INPUT_WIDTH;
    MATRICES_LEFT.style.gridTemplateRows = INPUT_HEIGHT;

    if(INCREASE_DECREASE){
        for(let i = DATA_NUM; i < SIZE; i++){
            let ELEM = document.createElement("input");
            ELEM.setAttribute("type", "text");
            ELEM.setAttribute("class", "input_matrix");
            ELEM.setAttribute("value", "");
            ELEM.setAttribute("placeholder", "0");
            ELEM.setAttribute("data-num", i);
            MATRICES_LEFT.append(ELEM);
            INPUT_CELL_A.push(ELEM);
        }
    } else {
        for(let i = 0; i < LIMIT; i++){
            MATRICES_LEFT.lastElementChild.remove()
            INPUT_CELL_A.pop();
        }
    }

    INCREASE_DECREASE = true;
    DATA_NUM = parseInt(MATRICES_LEFT.lastElementChild.getAttribute("data-num")) + 1;
}

INCREASE_BUTTON.addEventListener("click", () => {
    DIMENSION++;
    _d = DIMENSION;
    matrix();
})
DECREASE_BUTTON.addEventListener("click", () => {
    DIMENSION--;
    _d = DIMENSION;
    INCREASE_DECREASE = false;
    matrix();
})

// CLEAR_BUTTON.addEventListener("click", (e) => {
//     console.log();
// })
// RESET_BUTTON.addEventListener("click", (e) => {
//     console.log();
// })

// get input value
