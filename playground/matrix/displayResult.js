const uList = document.querySelector('.uList');
const listItem = document.getElementById('list_items');
const head = document.getElementById('head4');
// Import specific functions and variables required to use from matrix.js
const [Config, createCellTable, getKeyConfig, getTable, getMaxPoint, cleanConfigs, getAreaData, getCellData, NAME_DATA_CELL, NAME_CELLS_RESULT, NAME_INSERT_TO_CELL, NAME_CLEAR_RESULT, NAME_DATA_FORM, NAME_TABLE, NAME_TABLE_AREA, SELECTOR_TABLE, SELECTOR_TABLE_AREA,] = matrices();

// Constantly variable
let cellsResultBtn, id, method, constant, exponent, frac, numer, denom, mA, mO, mB, mRes, mJoint, mat, matRes, tempRes = [];

// Object for storing all matrix
const matrix = {}

// MathJax Tex components
const $$ = '$$';
const begin = '\\begin{bmatrix}';
const end = '\\end{bmatrix}';

// Call by implement.py
function getConfigResult(matrices, result){
  // Convert to Array
  try{
    mat = JSON.parse(matrices);
  } catch(e){
    alert(e);
    return;
  }
  try{
    matRes = JSON.parse(result);
  } catch(e){
    if(matRes){
      alert(e);
      return;
    } else {
      return;
    }
  }

  // Get id, method, constant and convert to Array
  [id, method, constant] = sessionStorage.getItem('method').split('-').map(x => {
    try{
      // For constant
      return JSON.parse(x);
    } catch {
      // For id and method
      return x.replace(/\[\'|\'\]|\'/g, '').split(', ');
    }
  });

  // Determine how many matrix in use
  if(mat.length === 2){
    matrix['A'] = mat[0];
    matrix['B'] = mat[1];
  } else {
    matrix['A'] = mat[0];
  }

  // Determine if matrix result is Array or Interger
  if(!Array.isArray(matRes)){
    matrix['result'] = matRes;
  } else {
    if(method[0] === 'rank'){
      matrix['result'] = matRes[1];
      matrix['rows'] = matRes[0].length;
      matrix['cols'] = matRes[0][0].length;
    } else {
      matrix['result'] = matRes;
      matrix['rows'] = matRes.length;
      matrix['cols'] = matRes[0].length;
    }
  }
  // Call to display result
  display();
}

const convertArrayToMathJax = arr => {
  // Convert Array to JSON String Array
  let mJax = JSON.stringify(arr);

  // Find and replace string array 
  mJax = mJax.replace(/\[(\[\],\-?\d+,\d+)\]/g, n => {
    [frac, numer, denom] = JSON.parse(n);
    if(denom === 1){
      return numer
    } else {
      return `\\frac{${numer}}{${denom}}`;
    }
  });
  mJax = mJax.replace(/\]\,\[/g, '\\\\');
  mJax = mJax.replace(/,/g, ' & ');
  mJax = mJax.replace(/\[|\]/g, '');

  return begin + mJax + end;
}

const display = () => {
  // Create element list_items / mWrapper / buttonContainer
  let liContainer = document.createElement('li');
  liContainer.setAttribute('class', 'list_items');
  let mWrapper = document.createElement('p');
  mWrapper.setAttribute('class', 'mWrapper');
  let buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'buttonContainer');

  // Create element clear button
  let clearBtn = document.createElement('button');
  clearBtn.setAttribute('name', NAME_CELLS_RESULT);
  clearBtn.setAttribute('class', NAME_CLEAR_RESULT);
  clearBtn.setAttribute('value', 'clear');
  clearBtn.innerHTML = 'Clear';
  let insertA = document.createElement('button');
  insertA.setAttribute('name', NAME_CELLS_RESULT);
  insertA.setAttribute('class', NAME_INSERT_TO_CELL);
  insertA.setAttribute('value', 'A');
  insertA.innerHTML = 'Insert to A';
  let insertB = document.createElement('button');
  insertB.setAttribute('name', NAME_CELLS_RESULT);
  insertB.setAttribute('class', NAME_INSERT_TO_CELL);
  insertB.setAttribute('value', 'B');
  insertB.innerHTML = 'Insert to B';

  // Convert to MathJax format
  mA = convertArrayToMathJax(matrix['A']);
  mRes = convertArrayToMathJax(matrix['result']);

  if(method[0] === 'multiply'){
    // A x B
    mB = convertArrayToMathJax(matrix['B']);
    mJoint = mA + '⋅' + mB + '=' + mRes;
  } else if(['determinant', 'identity', 'transpose', 'inverse', 'diagonal', 'trace', 'rank'].includes(method[0])){
    // No constant value determinde itself
    if(method[0] === 'inverse'){
      mA = mA + `^{(-1)}`;
    }
    if(method[0] === 'transpose'){
      mA = mA + `^{(T)}`;
    }
    if(method[0] === 'rank'){
      mA = mA + '=' + convertArrayToMathJax(matRes[0]);
    }
    mJoint = mA + '=' + mRes;

  } else if(['plus_minus', 'convolution', 'convolution_edge'].includes(method[0])){
    // One constant value determine A and B
    mB = convertArrayToMathJax(matrix['B']);
    if(constant[0] === 'plus'){
      mO = '+';
    } else if(constant[0] === 'minus'){
      mO = '-';
    } else if(constant[0] === 'True' || constant[0] === 'False'){
      mO = '⋅';
    }
    mJoint = mA + mO + mB + '=' + mRes;

  } else if(['shift', 'scalar', 'triangular', 'addPadding', 'rotate', 'exponent'].includes(method[0])){
    // One constant value determinde itself
    if(method[0] === 'scalar'){
      mJoint = constant[0] + '⋅' + mA + '=' + mRes;
    } else if(method[0] === 'exponent'){
      // A x A (exponent)
      mA = mA + `^{(${constant[0]})}`;
      mJoint = mA + '=' + mRes;
    } else {
      mJoint = mA + '=' + mRes;
    }

  } else if(method[0] === 'minor_cofactor'){
    // Two constant value determinde itself
    mJoint = mA + '=' + mRes;
  }

  mWrapper.innerHTML = `\\(${mJoint}\\)`;

  if(method[0] === 'inverse'){
    let strMat = JSON.stringify(matRes);
    let mRegex = strMat.replace(/[[][\]][,]/g, '');
    mRegex = mRegex.replace(/(?<=\d),(?=\d)/g, '\/');
    mRegex = mRegex.replace(/^\[\[|\]\]$/g, '');
    mRegex = mRegex.split(/(?<=\])\],\[(?=\[)/g);
    mRegex = mRegex.map(x => {
      return x.replace(/\[|\]/g, '').split(',');
    });
    mRegex = JSON.stringify(mRegex).replace(/['"]-?\d+\/\d+['"]/g, n => {
      if(/-?\d+\/\d+/.test(n)){
        let _ = n.replace(/"/g, '').split('/');
        let num = parseInt(_[0], 10) / parseInt(_[1], 10);
        return num;
      }
    });
    mWrapper.setAttribute('data-result', mRegex);
  } else {
    mWrapper.setAttribute('data-result', JSON.stringify(matRes));
  }

  liContainer.appendChild(mWrapper);
  insertA.addEventListener('click', insertResultToCell);
  insertB.addEventListener('click', insertResultToCell);
  buttonContainer.appendChild(insertA);
  buttonContainer.appendChild(insertB);
  buttonContainer.appendChild(clearBtn);
  liContainer.appendChild(buttonContainer);
  
  uList.insertBefore(liContainer, uList.children[0]);


  setTimeout(() => {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, mWrapper]);
    liContainer.classList.add('show');
    if(method[0] === 'minor_cofactor'){
      head.innerHTML = `Result - ${method[1] === 'm' ? 'minor' : 'cofactor'} ${constant[0]}, ${constant[1]}`;
    } else if(method[0] === 'triangular'){
      head.innerHTML = `Result - ${constant[0] === '1' ? 'lower triangular' : 'upper triangular'}`;
    } else if(method[0] === 'plus_minus'){
      head.innerHTML = `Result - ${constant[0] === 'plus' ? 'plus' : 'minus'}`;
    } else if(method[0] === 'convolution'){
      head.innerHTML = `Result - ${method[0]} with edge : ${constant[0]}`;
    } else if(method[0] === 'exponent'){
      head.innerHTML = `Result - ${method[0]} of ${constant[0]}`;
    } else {
      head.innerHTML = `Result - ${method[0]}`;
    }
  }, 1000);
  cellsResult();
}

const cellsResult = () => {
  cellsResultBtn = document.querySelectorAll(`button[name=${NAME_CELLS_RESULT}][value="clear"]`);
  cellsResultBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      e.target.parentElement.parentElement.remove();
    });
  });
}


/**
 * Clear table and create new table
 */
const clearAndCreateTable = (table, key_idx, data) => {
  // Get data from table_area that saved in sessionStorage
  let data_table_area = data

  // Update Config
  Config[key_idx].rows = data_table_area.length;
  Config[key_idx].cols = data_table_area[0].length;
                                    
  // Clear all innerHTML before
  table.innerHTML = '';

  // Create new table cell
  createCellTable(table, key_idx);
  Config[key_idx].isHiding = false;
  Config[key_idx].limit = 0;

  // Table get new data entering to cell
  data_table_area.forEach((rows, i) => {
    rows.forEach((cols, j) => {
      document.querySelector(`[${NAME_DATA_CELL}="${i}-${j}-${Config[key_idx].id}"]`).value = cols === 0 ? '' : cols;
    })
  });
}

const writeToTableArea = (table_area, key_idx, data, isInsertResult = false) => {
  let txt = '';
  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[i].length; j++){
      if(!isInsertResult){
        txt += data[i][j] + ' ';
      }
      if(isInsertResult){
        Config[key_idx]['axis']['rows'].push(i);
        Config[key_idx]['axis']['cols'].push(j);
        Config[key_idx]['axis']['matrix'].push(`[${i},${j}]`);
      }
    }
    if(!isInsertResult){
      txt += '\r\n';
    }
  }
  if(!isInsertResult){
    // Push data to table_area
    table_area.value = txt;
  }
}


// Add event listener for new button insert
const insertResultToCell = e => {
  e.preventDefault();
  e.stopPropagation();
  let id = e.target.value;

  let res = JSON.parse(e.target.parentElement.previousElementSibling.dataset.result);

  // If result is interger not an array e.g. rank, determinant
  if(!Array.isArray(res)){
    res = [[res]];
  }

  let key_idx = getKeyConfig(id);
  let table_area = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE_AREA}`);
  let table = getTable(id);
  cleanConfigs(key_idx);

  if(Config[key_idx].isTableArea){

    writeToTableArea(table_area, key_idx, res)
    sessionStorage.setItem(id, JSON.stringify(res));

    Config[key_idx].rows = res.length;
    Config[key_idx].cols = res[0].length;
    getMaxPoint(key_idx);
    getAreaData();
  }

  if(!Config[key_idx].isTableArea){
    clearAndCreateTable(table, key_idx, res)
    // Use for update Config
    writeToTableArea(null, key_idx, res, true);
    sessionStorage.setItem(id, JSON.stringify(res));
    getMaxPoint(key_idx);
    getCellData();
  }
}

// Add event listener for existing button insert
let btns = document.querySelectorAll(`.${NAME_INSERT_TO_CELL}`);
btns.forEach(btn => {
  btn.addEventListener('click', insertResultToCell);
});


function logError(e){
  alert(e);
  return;
}


cellsResult();