const axis = document.getElementById('axis');
const widthInput = document.getElementById('canvasWidth');
const heightInput = document.getElementById('canvasHeight');
const colorPicker = document.getElementById('colorPicker');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const switchGridBtn = document.getElementById('switchGrid');
const pixelInput = document.getElementById('pixelSize');
const inputTypePng = document.getElementById('savePng');
const inputTypeJpeg = document.getElementById('saveJpeg');
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.querySelector('.menuDropdown');
const selectFile = document.getElementById('selectFile');
const openFileBtn = document.getElementById('openFileBtn');
const saveFileBtn = document.getElementById('saveFileBtn');
const homeBtn = document.getElementById('homeBtn');
const typeImage = document.querySelectorAll('.typeImage');
const detail = document.getElementById('detail');

const canvasBorder = document.getElementById('canvasBorder');
const canvas = document.getElementById('canvas');
const canvasGrid = document.getElementById('canvasGrid');
const ctxBorder = canvasBorder.getContext('2d');
const ctx = canvas.getContext('2d');
const ctxGrid = canvasGrid.getContext('2d');

// Default config
let cellColor = '#000000';
let canvasWidth = 300;
let canvasHeight = 300;
let isDragging = false;
let isErase = false;
let menu = false;
let size = 15;
let pixels = new Array(256);
let type = 'png';
let scale = 1;
let rows, cols, overflowCols, overflowRows, shiftStartCols, shiftStartRows, fileUpload;


// Set canvas size
const setCanvasSize = () => {
  canvasBorder.width = canvasWidth;
  canvasBorder.height = canvasHeight;
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

// Write detail
const detailDisplay = () => {
  detail.innerHTML = `artwork area size: ${canvasGrid.width}, ${canvasGrid.height} px<br/>
  draw area size: ${canvas.width}, ${canvas.height} px<br/>
  pixel size: ${size} px<br/>
  rows: ${rows}<br/>
  cols: ${cols}<br/>
  grids: ${(canvas.width / size) * (canvas.height / size)}`;
}

// Check input
const checkInput = () => {
  try{
    if(canvasWidth > 1000 || canvasHeight > 1000){
      throw new Error('Canvas\'s size is too large.');
    }
    if(canvasWidth < 100 || canvasHeight < 100){
      throw new Error('Canvas\'s size is too small.');
    }
    return true;
  } catch(e){
      alert(e);
      return false;
  }
}

// Open/close menu
menuBtn.addEventListener('click', e => {
  e.preventDefault();
  menuDropdown.classList.toggle('open');
  menu = true;
});
document.addEventListener('click', e => {
  if(!menuBtn.contains(e.target) && menu){
    menuDropdown.classList.remove('open');
    menu = false;
  }
});


// Open and read file
openFileBtn.addEventListener('click', async e => {
  e.preventDefault();
  selectFile.click();
});
selectFile.addEventListener('change', function() {
  try{
    if(selectFile.files[0].type !== 'text/plain'){
      throw new Error('File type is cannot read.');
    } else {
      // reader.readyState 0; EMPTY
      let fileUpload = selectFile.files[0];
      let reader = new FileReader();

      // reader.readyState 1; LOADING
      reader.readAsText(fileUpload);

      // reader.readyState 2; DONE
      reader.onload = () => {
        let dataObj = JSON.parse(reader.result);
        resetBtn.click();
        rows = dataObj.rows;
        cols = dataObj.cols;
        canvasWidth = dataObj.width;
        canvasHeight = dataObj.height;
        size = dataObj.size;
        pixelInput.value = size;
        drawGrid();
        pixels = dataObj.pixels;
        const image = new Image();
        image.src = dataObj.canvas;
        image.onload = function() {
          ctx.drawImage(image, 0, 0);
        };
        detailDisplay();
      }
    }
  } catch(e){
    alert(e);
  }
})


// Read and save file
saveFileBtn.addEventListener('click', e => {
  e.preventDefault();
  // Create element with <a> tag
  const link = document.createElement("a");

  // Prepare file
  let dataObj = {
    pixels: pixels,
    rows: rows,
    cols: cols,
    width: canvasWidth,
    height: canvasHeight,
    size: size,
    switchGridBtn,
    canvas: canvas.toDataURL(),
  }

  // Create a blog object with the file content which you want to add to the file
  const file = new Blob([JSON.stringify(dataObj)], {type: 'text/plain'});

  // Add file content in the object URL
  link.href = URL.createObjectURL(file);

  // Add file name
  link.download = 'dataObj.txt';

  // Add click event to <a> tag to save file.
  link.click();
  URL.revokeObjectURL(link.href);
});

// Change pixel's size
pixelInput.addEventListener('input', e => {
  size = parseInt(e.target.value);

  drawGrid();

  // Display canvas's details
  detailDisplay();
});

// Change canvas's size
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  canvasWidth = widthInput.value || canvasWidth;
  canvasHeight = heightInput.value || canvasHeight;
  
  if(!checkInput()){
    canvasWidth = canvasGrid.width;
    canvasHeight = canvasGrid.height;
    return;
  };

  canvasBorder.width = parseInt(canvasWidth);
  canvasBorder.height = parseInt(canvasHeight);
  canvas.width = parseInt(canvasWidth);
  canvas.height = parseInt(canvasHeight);
  canvasGrid.width = parseInt(canvasWidth);
  canvasGrid.height = parseInt(canvasHeight);

  widthInput.value = '';
  heightInput.value = '';

  drawGrid();

  // Display canvas's details
  detailDisplay();
});

// Clear all canvas was drawn
clearBtn.addEventListener('click', () => {
  drawGrid();

  // Display canvas's details
  detailDisplay();
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

  // Reset upload file
  selectFile.value = '';

  // Clear and draw new grid
  drawGrid();

  // Display canvas's details
  detailDisplay();
});

// Save exporte
exportBtn.addEventListener('click', () => {
  const cloneCanvas = document.createElement('canvas');
  const cloneContext = cloneCanvas.getContext('2d');
  cloneCanvas.width = canvasWidth;
  cloneCanvas.height = canvasHeight;
  const link = document.createElement('a');
  link.download = `download.${type}`;
  if(type === 'jpeg'){
    cloneContext.clearRect(0, 0, canvasGrid.width, canvasGrid.height);
    cloneContext.fillStyle = '#fff';
    cloneContext.fillRect(0, 0, canvasGrid.width, canvasGrid.height);
  }
  cloneContext.drawImage(canvas, 0 + shiftStartCols, 0 + shiftStartRows);
  link.href = cloneCanvas.toDataURL(`image/${type}`, 1.0);
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
detailDisplay();