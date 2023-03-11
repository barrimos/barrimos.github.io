let cell_color = '#000000';
    let canvas_width = 300;
    let canvas_height = 300;
    let isDragging = false;
    let isErase = false;
    let size = 15;
    let pixels = new Array(256);

    const axis = document.getElementById('axis');
    const grid = document.getElementById('grid');
    const cell = document.querySelectorAll('.cell');
    const width_size = document.getElementById('canvasWidth');
    const height_size = document.getElementById('canvasHeight');
    const color_picker = document.getElementById('colorPicker');
    const submit_btn = document.getElementById('submitBtn');
    const reset_btn = document.getElementById('resetBtn');
    const clear_btn = document.getElementById('clearBtn');
    const save_btn = document.getElementById('saveBtn');
    const switch_grid_btn = document.getElementById('switchGrid');
    const pixel_inp = document.getElementById('pixelSize');
    const pixel_area = document.getElementById('pixel-area');
    const typeImage = document.querySelectorAll('.typeImage');
    
    const canvas = document.getElementById('canvas');
    const canvas_grid = document.getElementById('canvasGrid');
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    const ctx = canvas.getContext('2d');
    const ctx_grid = canvas_grid.getContext('2d');
    canvas_grid.width = canvas_width;
    canvas_grid.height = canvas_height;
    let type = 'png';

    let cx, cy;

    const demo = document.getElementById('demo');

    const drawPixel = (e) => {
      let x = Math.floor(e.offsetX / size);
      let y = Math.floor(e.offsetY / size);

      if(isErase){
        ctx.clearRect(x * size, y * size, size, size);
        pixels[y][x] = null;
      } else {
        ctx.fillStyle = cell_color;
        ctx.fillRect(x * size, y * size, size, size);
        pixels[y][x] = cell_color;
      }
    }

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pixels = new Array(256);

      for(let i = 0; i < pixels.length; i++){
        pixels[i] = new Array(256);
      }

      width_size.value = '';
      height_size.value = '';
      drawGrid();
    }

    const drawGrid = () => {
      let step_width = Math.floor(canvas.width / size);
      let step_height = Math.floor(canvas.height / size);
      demo.innerHTML += `<br\>step_width ${step_width} <br\>
      step_height ${step_height}`;
      ctx_grid.beginPath();
      for(let x = 0; x <= canvas.width; x += size){
        ctx_grid.moveTo(x, 0);
        ctx_grid.lineTo(x, canvas.height);
      }
      for(let y = 0; y <= canvas.height; y += size){
        ctx_grid.moveTo(0, y);
        ctx_grid.lineTo(canvas.width, y);
      }
      ctx_grid.strokeStyle = '#ddd';
      ctx_grid.stroke();

      pixels = [];
      for(let y = 0; y < canvas.width / size; y++){
        pixels[y] = [];
        for(let x = 0; x < canvas.height / size; x++){
          pixels[y][x] = null;
        }
      }
    }

    const calculateCanvasSize = () => {
      const numPixels = canvas_width / size * canvas_height / size;
      const canvasArea = canvas_width * canvas_height;
      const pixelArea = numPixels * size * size;
      const scaleFactor = Math.sqrt(pixelArea / canvasArea);
      canvas_width = Math.round(canvas_width * scaleFactor);
      canvas_height = Math.round(canvas_height * scaleFactor);
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      canvas_grid.width = canvas_width;
      canvas_grid.height = canvas_height;

      demo.innerHTML = `numPixels ${numPixels}<br/>
      canvasArea ${canvasArea}<br/>
      pixelArea ${pixelArea}<br/>
      scaleFactor ${scaleFactor}<br/>
      size ${size}<br/>
      canvas_width ${canvas_width}<br/>
      canvas_height ${canvas_height}`;
    }

    pixel_inp.addEventListener('input', () => {
      size = parseInt(pixel_inp.value);
      calculateCanvasSize();
      drawGrid();
    });

    submit_btn.addEventListener('click', e => {
      e.preventDefault();
      canvas_width = width_size.value || canvas_width;
      canvas_height = height_size.value || canvas_height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = parseInt(canvas_width);
      canvas.height = parseInt(canvas_height);
      canvas_grid.width = parseInt(canvas_width);
      canvas_grid.height = parseInt(canvas_height);
      calculateCanvasSize();
      drawGrid();
    });


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

    clear_btn.addEventListener('click', () => {
      clearCanvas();
    });

    reset_btn.addEventListener('click', () => {
      size = 15;
      canvas_width = 300;
      canvas_height = 300;
      pixel_inp.value = size;
      color_picker.value = '#000000';
      canvas_grid.classList.remove('hide');
      switch_grid_btn.setAttribute('checked', '');
      switch_grid_btn.checked = true;
      calculateCanvasSize();
      clearCanvas();
    });

    color_picker.addEventListener('input', e => {
      cell_color = e.target.value;
    });

    typeImage.forEach(btn => {
      btn.addEventListener('input', e => {
        type = e.target.value;
      });
    });

    save_btn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `download.${type}`;
      if(type === 'jpeg'){
        ctx_grid.clearRect(0, 0, canvas_grid.width, canvas_grid.height);
        ctx_grid.fillStyle = '#fff';
        ctx_grid.fillRect(0, 0, canvas_grid.width, canvas_grid.height);
        ctx_grid.drawImage(canvas, 0, 0);
        link.href = canvas_grid.toDataURL(`image/${type}`, 1.0);
      } else {
        link.href = canvas.toDataURL(`image/${type}`, 1.0);
      }
      link.click();
      link.delete;
    });

    switch_grid_btn.addEventListener('click', () => {
      if(switch_grid_btn.checked){
        canvas_grid.classList.remove('hide');
        switch_grid_btn.setAttribute('checked', '');
        switch_grid_btn.checked = true;
      } else {
        canvas_grid.classList.add('hide');
        switch_grid_btn.removeAttribute('checked');
      }
    });

    calculateCanvasSize();
    drawGrid();