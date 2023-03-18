import { Stage } from './game/Stage.js';
import { Pathfinding } from './game/Pathfinding.js';
import { Movement } from './game/Movement.js';


// Config top nav
const topNav = document.getElementById('topNav')
const pixelValue = document.getElementById('pixelValue');
const pixelSize = document.getElementById('pixelSize');
const useAi = document.getElementById('enableAuto');
const algorithmSelect = document.getElementById('optMethod');

// Buttons menu
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const optionBtn = document.getElementById('optionBtn');
const closeBtn = document.getElementById('closeBtn');

// Controls
const controlBtn = document.querySelectorAll('.ctrlBtn');

// Countdown and stopwatch
const stopwatch = document.getElementById('stopwatch');
const appendTens = document.getElementById("tens")
const appendSeconds = document.getElementById("seconds")
const countdown = document.getElementById('countdown');
let seconds = 0; 
let tens = 0; 
let Interval;

// Pacman
const hp = document.getElementById('hp');

// Default config
const Default = {
  canvasWidth: 300,
  canvasHeight: 300,
  pixelSize: 30,
  cellColor: '#000000',
}

// Canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasPlayer = document.getElementById('canvasPlayer');
const ctxPlayer = canvasPlayer.getContext('2d');
canvas.width = Default.canvasWidth;
canvas.height = Default.canvasHeight;
canvasPlayer.width = Default.canvasWidth;
canvasPlayer.height = Default.canvasHeight;
let size = Default.pixelSize;

// In-game
let gameBegin = false;
let canStart = true;
let done = false;
let enableAi = false;
let aiSelect = '';
let aiSelectIndex = 0;
let dir = '';




// Create game for start
let game = new Stage(); 
let pathFinding = new Pathfinding(game);
const move = new Movement();


// Menu toggle
optionBtn.addEventListener('click', () => {
  topNav.classList.toggle('hide');
});
closeBtn.addEventListener('click', () => {
  topNav.classList.add('hide');
});

// Change pixel's size
pixelSize.addEventListener('input', e => {
  // Update display pixelValue
  pixelValue.innerHTML = e.target.value;
  pixelSize.setAttribute('value', e.target.value);

  // Clear stopwatch
  clearStopwatch();

  // Clear Ai option
  clearAi();

  // Set new game
  createNewGame(e.target.value);
});

useAi.addEventListener('input', () => {
  if(useAi.checked){
    enableAi = true;
    Array.from(algorithmSelect).forEach((ai, index) => {
      if(index !== 0){
        ai.removeAttribute('disabled');
      }
    });
  } else {
    enableAi = false;
    Array.from(algorithmSelect.options).forEach(element => {
      element.setAttribute('disabled', '');
    });
  }
});

// Reset all but keep size
resetBtn.addEventListener('click', () => {
  if(canStart){
    return; 
  }
  // Clear stopwatch
  clearStopwatch();

  // Clear Ai option
  clearAi();

  // Set new game
  createNewGame(pixelSize.getAttribute('value'));
});

// Start game
startBtn.addEventListener('click', () => {
  if(gameBegin){
    return;
  }
  if(!gameBegin && canStart){
    canStart = false;
    countdown.innerText = 5;
    clearInterval(Interval);

    countdown.classList.add('start');
    Interval = setInterval(() => {
      countdown.classList.remove('start');
      countdown.innerText -= 1;
      countdown.classList.add('start');
    }, 1000);

    setTimeout(() => {
      countdown.classList.remove('start');
      clearInterval(Interval);
  
      drawStage(game);
      drawPlayer(game);
      gameBegin = true;
      canStart = true;

      useAi.removeAttribute('disabled');


      Interval = setInterval(startTimer, 10);
    }, 1000 * parseInt(countdown.innerText));
  }
});

// Clear AI option
const clearAi = () => {
  // Clear select Ai Option
  useAi.setAttribute('disabled', '');
  useAi.checked = false;
  Array.from(algorithmSelect.options).forEach(element => {
    element.setAttribute('disabled', '');
  });
  algorithmSelect.selectedIndex = 0;
  aiSelectIndex = algorithmSelect.selectedIndex;
}


// Create new game
const createNewGame = (size) => {
  // Set new game
  game = new Stage(parseInt(size), parseInt(size));
  pathFinding = new Pathfinding(game);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxPlayer.clearRect(0, 0, canvas.width, canvas.height);

  // Draw new grid
  drawGrid();

  // Set default config
  gameBegin = false;
  canStart = true;

  hp.innerHTML = game.pacman.hp;
}

// Calc pixel's size
const calcPixel = () => {
  size = pixelSize.value;
  size = Math.sqrt(canvas.width / size * canvas.height / size);
}

// Draw grid
const drawGrid = () => {
  calcPixel();
  ctx.beginPath();
  for(let x = 0; x <= canvas.width; x += size){
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }
  for(let y = 0; y <= canvas.height; y += size){
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.strokeStyle = '#ddd';
  ctx.stroke();
}

// Draw stage
const drawStage = () => {
  // for(let [...stage] of game.stage){
  //   console.log([...stage].join(' '));
  // }

  for(let i = 0; i < game.stage.length; i ++){
    for(let j = 0; j < game.stage[0].length; j++){
      if(game.stage[j][i] === '♦️'){
        ctx.moveTo(i * size + size / 2, j * size);
        ctx.lineTo(i * size, j * size + size / 2);
        ctx.lineTo(i * size + size / 2, j * size + size);
        ctx.lineTo(i * size + size, j * size + size / 2);
        ctx.fillStyle = '#0f0';
        ctx.fill();
      }
      if(JSON.stringify('■|x|.').includes(game.stage[j][i])){
        if(game.stage[j][i] === '■'){
          ctx.fillStyle = '#000';
        }
        if(game.stage[j][i] === 'x'){
          ctx.fillStyle = '#729df5';
        }
        if(game.stage[j][i] === '.'){
          ctx.fillStyle = "transparent";
        }
        ctx.fillRect(i * size, j * size, size, size);
      }
    }
  }
}

// Draw player
const drawPlayer = (game) => {
  hp.innerHTML = game.pacman.hp;
  ctxPlayer.clearRect(0, 0, canvas.width, canvas.height);
  ctxPlayer.fillStyle = '#0f0';
  ctxPlayer.beginPath();

  let draw = (x, y) => {
    if(game.stage[x][y] === '►'){
      ctxPlayer.moveTo(y * size, x * size);
      ctxPlayer.lineTo(y * size + size, x * size + size / 2);
      ctxPlayer.lineTo(y * size, x * size + size);
    }
    if(game.stage[x][y] === '◄'){
      ctxPlayer.moveTo(y * size, x * size + size / 2);
      ctxPlayer.lineTo(y * size + size, x * size);
      ctxPlayer.lineTo(y * size + size, x * size + size);
    }
    if(game.stage[x][y] === '▼'){
      ctxPlayer.moveTo(y * size, x * size);
      ctxPlayer.lineTo(y * size + size, x * size);
      ctxPlayer.lineTo(y * size + size / 2, x * size + size);
    }
    if(game.stage[x][y] === '▲'){
      ctxPlayer.moveTo(y * size + size / 2, x * size);
      ctxPlayer.lineTo(y * size + size, x * size + size);
      ctxPlayer.lineTo(y * size, x * size + size);
    }
    ctxPlayer.fill();
  
    if(game.stage[x][y] === '✝'){
      ctxPlayer.beginPath();
      ctxPlayer.lineWidth = 3;
      ctxPlayer.strokeStyle  = '#fff';
      ctxPlayer.moveTo(y * size + size / 2, x * size + 2);
      ctxPlayer.lineTo(y * size + size / 2, x * size + size - 2);
      ctxPlayer.moveTo(y * size + 5, x * size + 10);
      ctxPlayer.lineTo(y * size + size - 5, x * size + 10);
      ctxPlayer.stroke();
    }
    if(game.stage[x][y] === '⚑'){
      ctxPlayer.beginPath();
      ctxPlayer.lineWidth = 3;
      ctxPlayer.strokeStyle  = '#0f0';
      ctx.clearRect(y * size, x * size, size, size);
      ctxPlayer.moveTo(y * size + size, x * size + size / 2);
      ctxPlayer.arc(y * size + size / 2, x * size + size / 2, (size / 2) - 2, 0, 2 * Math.PI);
      ctxPlayer.stroke();
    }
  }


  if(done){
    for(let i = 0; i < game.path_finder.length; i++){
      draw(game.path_finder[i][0], game.path_finder[i][1]);
    }
  } else {
    draw(game.curr_x, game.curr_y);
  }

  resultStage();
}

// Stopwatch
const clearStopwatch = () => {
  clearInterval(Interval);
  tens = '00';
  seconds = '00';
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
}
/**
 * Cathy Dutton
 */
const startTimer = () => {
  tens++; 
  if(tens <= 9){
    appendTens.innerHTML = '0' + tens;
  }
  if(tens > 9){
    appendTens.innerHTML = tens;
  } 
  if(tens > 99){
    seconds++;
    appendSeconds.innerHTML = '0' + seconds;
    tens = 0;
    appendTens.innerHTML = '0' + 0;
  }
  if(seconds > 9){
    appendSeconds.innerHTML = seconds;
  }
}

// Check result game move
const resultStage = () => {
  // for(let [...stage] of game.stage){
  //   console.log([...stage].join(' '));
  // }

  // If AI done
  if(done){
    clearInterval(Interval);
    gameBegin = false;
    canStart = false;
    console.log('Finish');
    done = false;
    return;
  }


  // If over
  if(game.is_over){
    clearInterval(Interval);
    gameBegin = false;
    canStart = false;
    console.log('TOOOOOOM!!! YOU\'RE DEAD');
    return;
  }

  //if win
  if(game.is_win){
    clearInterval(Interval);
    gameBegin = false;
    canStart = false;
    console.log('CONGRATULATION!!!');
    return;
  }
};


drawGrid();


(() => {
  // Keyboard event
  document.addEventListener('keyup', e => {
    if(gameBegin === false){
      return;
    }
    if(e.key === 'ArrowLeft'){
      dir = 'l';
    } else if(e.key === 'ArrowUp'){
      dir = 'u';
    } else if(e.key === 'ArrowRight'){
      dir = 'r';
    } else if(e.key === 'ArrowDown'){
      dir = 'd';
    }
    move.move(game, dir);
    drawPlayer(game);
  });

  // Mouse event
  Array.from(controlBtn).forEach(btn => {
    btn.addEventListener('click', e => {
      if(gameBegin === false){
        return;
      }
      dir = e.target.getAttribute('data-control');
      move.move(game, dir);
      drawPlayer(game);
    });
  });


  // Select AI
  algorithmSelect.addEventListener('change', () => {
    if(!useAi.checked || algorithmSelect.value === '' || enableAi === false || gameBegin === false){
      return;
    }
    aiSelect = algorithmSelect.value;
    aiSelectIndex = algorithmSelect.selectedIndex;
    switch(aiSelect){
      case 'dijkstra': pathFinding.dijkstra();
      break;
      case 'bfs': pathFinding.bfs();
      break;
      case 'greedybfs': pathFinding.greedy_bfs();
      break;
      case 'aStar': pathFinding.aStar();
      break;
      default: break;
    };
    done = pathFinding.done;
    drawPlayer(game);
  });
})();