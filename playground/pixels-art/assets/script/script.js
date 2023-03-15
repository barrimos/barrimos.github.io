const axis = document.getElementById('axis');
const widthInput = document.getElementById('canvasWidth');
const heightInput = document.getElementById('canvasHeight');
const colorPicker = document.getElementById('colorPicker');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const switchGridBtn = document.getElementById('switchGrid');
const pixelInput = document.getElementById('pixelSize');
const inputTypePng = document.getElementById('savePng');
const inputTypeJpeg = document.getElementById('saveJpeg');
const typeImage = document.querySelectorAll('.typeImage');

const canvas = document.getElementById('canvas');
const canvasGrid = document.getElementById('canvasGrid');
const ctx = canvas.getContext('2d');
const ctxGrid = canvasGrid.getContext('2d');

// Default config
let cellColor = '#000000';
let canvasWidth = 300;
let canvasHeight = 300;
let isDragging = false;
let isErase = false;
let size = 15;
let pixels = new Array(256);
let type = 'png';
let rows, cols, overflowCols, overflowRows, shiftStartCols, shiftStartRows;

// Set canvas size
const setCanvasSize = () => {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvasGrid.width = canvasWidth;
  canvasGrid.height = canvasHeight;
}

// Calculate canvas config
const calculateCanvasConfig = () => {
  setCanvasSize();
  rows = Math.floor(canvasGrid.height / size);
  cols = Math.floor(canvasGrid.width / size);
  overflowCols = canvasGrid.width - (cols * size);
  overflowRows = canvasGrid.height - (rows * size);
  shiftStartCols = overflowCols / 2;
  shiftStartRows = overflowRows / 2;
  canvas.width -= overflowCols;
  canvas.height -= overflowRows;
}

// Clear canvas
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxGrid.clearRect(0, 0, canvasGrid.width, canvasGrid.height);

  pixels = new Array(256);
  for(let i = 0; i < pixels.length; i++){
    pixels[i] = new Array(256);
  }
}

// Draw grid
const drawGrid = () => {
  clearCanvas();
  calculateCanvasConfig();
  ctxGrid.beginPath();
  // Not reaching to border.
  for(let x = 0; x <= cols; x++){
    ctxGrid.moveTo(x * size + shiftStartCols, 0 + shiftStartRows);
    ctxGrid.lineTo(x * size + shiftStartCols, canvasHeight - overflowRows + shiftStartRows);
  }
  for(let y = 0; y <= rows; y++){
    ctxGrid.moveTo(0 + shiftStartCols, y * size + shiftStartRows);
    ctxGrid.lineTo(canvasWidth - overflowCols + shiftStartCols, y * size + shiftStartRows);
  }

  // // Reaching to border.
  // for(let x = 0; x <= cols; x++){
  //   ctxGrid.moveTo(x * size + shiftStartCols, 0);
  //   ctxGrid.lineTo(x * size + shiftStartCols, canvasHeight + shiftStartRows);
  // }
  // for(let y = 0; y <= rows; y++){
  //   ctxGrid.moveTo(0, y * size + shiftStartRows);
  //   ctxGrid.lineTo(canvasWidth + shiftStartCols, y * size + shiftStartRows);
  // }

  // Initialize to array
  pixels = [];
  for(let x = 0; x < rows; x++){
    pixels[x] = [];
    for(let y = 0; y < cols; y++){
      pixels[x][y] = null;
    }
  }

  ctxGrid.strokeStyle = '#ddd';
  ctxGrid.stroke();
}

// Draw pixel
const drawPixel = e => {
  let x = Math.floor(e.offsetX / size);
  let y = Math.floor(e.offsetY / size);

  if(isErase){
    ctx.clearRect(x * size, y * size, size, size);
    pixels[y][x] = null;
  } else {
    ctx.fillStyle = cellColor;
    ctx.fillRect(x * size, y * size, size, size);
    pixels[y][x] = cellColor;
  }
}


// Change pixel's size
pixelInput.addEventListener('input', e => {
  size = parseInt(e.target.value);
  drawGrid();
});

// Change canvas's size
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  canvasWidth = widthInput.value || canvasWidth;
  canvasHeight = heightInput.value || canvasHeight;
  canvas.width = parseInt(canvasWidth);
  canvas.height = parseInt(canvasHeight);
  canvasGrid.width = parseInt(canvasWidth);
  canvasGrid.height = parseInt(canvasHeight);
  drawGrid();
});

// Clear all canvas was drawn
clearBtn.addEventListener('click', () => {
  drawGrid();
});

// Change type image for save
typeImage.forEach(btn => {
  btn.addEventListener('input', e => {
    if(btn.value === 'png'){
      inputTypePng.setAttribute('checked', '');
      inputTypePng.checked = true;
      inputTypeJpeg.removeAttribute('checked');
      inputTypeJpeg.checked = false;
    } else {
      inputTypeJpeg.setAttribute('checked', '');
      inputTypeJpeg.checked = true;
      inputTypePng.removeAttribute('checked');
      inputTypePng.checked = false;
    }
    type = e.target.value;
  });
});

// Reset canvas to default config
resetBtn.addEventListener('click', () => {
  // Pixel's size
  size = 15;
  pixelInput.value = size;

  // Canvas's Size
  canvasWidth = 300;
  canvasHeight = 300;
  widthInput.value = '';
  heightInput.value = '';

  // Color
  colorPicker.value = '#000000';
  cellColor = colorPicker.value;

  // Get back grid
  canvasGrid.classList.remove('hide');
  switchGridBtn.setAttribute('checked', '');
  switchGridBtn.checked = true;

  // Change type image
  type = 'png';
  inputTypePng.setAttribute('checked', '');
  inputTypePng.checked = true;
  inputTypeJpeg.removeAttribute('checked');
  inputTypeJpeg.checked = false;

  // Clear and draw new grid
  drawGrid();
});

// Save image
saveBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `download.${type}`;
  if(type === 'jpeg'){
    ctxGrid.clearRect(0, 0, canvasGrid.width, canvasGrid.height);
    ctxGrid.fillStyle = '#fff';
    ctxGrid.fillRect(0, 0, canvasGrid.width, canvasGrid.height);
    ctxGrid.drawImage(canvas, 0, 0);
    link.href = canvasGrid.toDataURL(`image/${type}`, 1.0);
  } else {
    link.href = canvas.toDataURL(`image/${type}`, 1.0);
  }
  link.click();
  link.delete;
});

// On/off grid to display
switchGridBtn.addEventListener('click', () => {
  if(switchGridBtn.checked){
    canvasGrid.classList.remove('hide');
    switchGridBtn.setAttribute('checked', '');
    switchGridBtn.checked = true;
  } else {
    canvasGrid.classList.add('hide');
    switchGridBtn.removeAttribute('checked');
  }
});

// Change pixel's color
colorPicker.addEventListener('input', e => {
  cellColor = e.target.value;
});

// Mouse event
canvas.addEventListener('mousedown', e => {
  // Prevent right click
  if(e.button === 2){
    canvas.oncontextmenu = e => {
      e.preventDefault();
      e.stopPropagation();
    }
    return;
  }
  if(e.offsetX < 0 || e.offsetX >= canvas.width || e.offsetY < 0 || e.offsetY >= canvas.height){
    return; 
  }
  if(pixels[Math.floor(e.offsetY / size)][Math.floor(e.offsetX / size)] !== null){
    isErase = true;
    isDragging = false;
  } else {
    isErase = false;
    isDragging = true;
  }
  drawPixel(e);
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
  isErase = false;
});

canvas.addEventListener('mousemove', e => {
  axis.innerHTML = `${Math.floor((e.offsetX))}, ${Math.floor((e.offsetY))}`;
  if(e.offsetX < 0 || e.offsetX >= canvas.width || e.offsetY < 0 || e.offsetY >= canvas.height){
    return; 
  }
  if(!isDragging && isErase){
    drawPixel(e);
  } else if(isDragging && !isErase){
    drawPixel(e);
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
  isErase = false;
});

drawGrid();