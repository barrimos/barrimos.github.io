const uList = document.querySelector('.uList');
const listItem = document.getElementById('list_items');
const head = document.getElementById('head4');

// Constantly variable
let clearResultBtn, id, method, constant, exponent, frac, numer, denom, mA, mO, mB, mRes, mJoint;

// Object for storing all matrix
const matrix = {}

// MathJax Tex components
const $$ = '$$';
const begin = '\\begin{bmatrix}';
const end = '\\end{bmatrix}';

function getConfigResult(matrices, result){
  // Convert to Array
  let mat, matRes;
  try{
    mat = JSON.parse(matrices);
    matRes = JSON.parse(result);
  } catch {
    return
  }

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
    matrix['result'] = matRes;
    matrix['rows'] = matRes.length;;
    matrix['cols'] = matRes[0].length;;
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

  // Call to display result
  display();
}

const convertArrayToMathJax = arr => {
  // Convert Array to JSON String Array
  let mJax = JSON.stringify(arr);

  // Find and replace string array 
  mJax = mJax.replace(/\[(\[\],\-?\d+,\d+)\]/g, n => {
    [frac, numer, denom] = JSON.parse(n);
    return `\\frac{${numer}}{${denom}}`;
  });
  mJax = mJax.replace(/\]\,\[/g, '\\\\');
  mJax = mJax.replace(/,/g, ' & ');
  mJax = mJax.replace(/\[|\]/g, '');

  return begin + mJax + end;
}

const display = () => {
  // Create element list_items / mWrapper
  let liContainer = document.createElement('li');
  liContainer.setAttribute('class', 'list_items');
  let mWrapper = document.createElement('p');
  mWrapper.setAttribute('class', 'mWrapper');

  // Create element clear button
  let clearBtn = document.createElement('button');
  clearBtn.setAttribute('name', 'clearResult');
  clearBtn.setAttribute('class', 'clearResult');
  clearBtn.innerHTML = 'Clear';

  mA = convertArrayToMathJax(matrix['A']);
  mRes = convertArrayToMathJax(matrix['result']);

  if(method[0] === 'multiply'){
    if(constant.length === 0){
      // A x B
      mB = convertArrayToMathJax(matrix['B']);
      mJoint = mA + '⋅' + mB + '=' + mRes;
    } else {
      // A x A (exponent)
      mA = mA + `^{(${constant[0]})}`;
      mJoint = mA + '=' + mRes;
    }
  } else if(['determinant', 'identity', 'transpose', 'inverse', 'diagonal', 'trace'].includes(method[0])){
    // No constant value determinde itself
    if(method[0] === 'inverse'){
      mA = mA + `^{(-1)}`;
    }
    if(method[0] === 'transpose'){
      mA = mA + `^{(T)}`;
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

  } else if(['shift', 'scalar', 'triangular', 'addPadding'].includes(method[0])){
    // One constant value determinde itself
    if(method[0] === 'scalar'){
      mJoint = constant[0] + '⋅' + mA + '=' + mRes;
    } else {
      mJoint = mA + '=' + mRes;
    }

  } else if(method[0] === 'minor_cofactor'){
    // Two constant value determinde itself
    mJoint = mA + '=' + mRes;
  }

  mWrapper.innerHTML = `\\(${mJoint}\\)`;
  
  liContainer.appendChild(mWrapper);
  liContainer.appendChild(clearBtn);
  
  uList.insertBefore(liContainer, uList.children[0]);
  
  setTimeout(() => {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, mWrapper]);
    liContainer.classList.add('show');
    if(method[0] === 'minor_cofactor'){
      head.innerHTML = `Result - ${method[1] === 'm' ? 'Minor' : 'Cofactor'} ${constant[0]}, ${constant[1]}`;
    } else if(method[0] === 'triangular'){
      head.innerHTML = `Result - ${constant[0] === '1' ? 'Lower Triangular' : 'Upper Triangular'}`;
    } else if(method[0] === 'plus_minus'){
      head.innerHTML = `Result - ${constant[0] === 'plus' ? 'plus' : 'minus'}`;
    } else if(method[0] === 'convolution'){
      head.innerHTML = `Result - ${method[0]} with edge : ${constant[0]}`;
    } else {
      head.innerHTML = `Result - ${method[0]}`;
    }
  }, 1000);
  clear();
}

const clear = () => {
  clearResultBtn = document.querySelectorAll('.clearResult');
  Array.from(clearResultBtn).forEach(btn => {
    btn.addEventListener('click', e => {
      e.target.parentElement.remove();
    });
  });
};


function logError(e){
  alert(e);
  return;
}


clear();