(function(global, factory){
  typeof define === 'function' && define.amd ? define(factory) : typeof module === 'object' && module.exports ? module.exports = factory() : global.AlgoGame = factory();
}(typeof self !== 'undefined' ? self : this, function(){ 'use strict';
  
  const whiteCards = ['w-0', 'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-11'];
  const blueCards = ['b-0', 'b-1', 'b-2', 'b-3', 'b-4', 'b-5', 'b-6', 'b-7', 'b-8', 'b-9', 'b-10', 'b-11'];

  const WHITE = 'white';
  const BLUE = 'blue';
  const BLACK = 'black';
  const TOP = 'top';
  const LEFT = 'left';
  const RIGHT = 'right';
  const DOWN = 'down';

  const NAME = 'algo';
  const NAME_NEW_GAME = 'newGameBtn';
  const NAME_SUBMIT_NEW_GAME = 'submitSelectBtn';
  const NAME_RESET_GAME = 'resetGameBtn';
  const NAME_HINT = 'hintBtn';
  const NAME_RULE = 'rulesBtn';
  const NAME_CLOSE = 'closeBtn';
  const NAME_ISRANDOM = 'isRandom';
  const NAME_LEVEL = 'levelSelect';
  const NAME_DROP_BTN = 'dropBtn';
  const NAME_SETTINGTAB = 'settingTab';
  const NAME_SIDE = 'side';
  const NAME_DECK = 'deck';
  const NAME_SLOT = 'slot';
  const NAME_CARD = 'card';
  const NAME_WHITE_DECK = 'whiteDeck';
  const NAME_BLUE_DECK = 'blueDeck';
  const NAME_HINT_REMAIN = 'hintRemain';
  const NAME_CHECK_RESULT = 'checkResultBtn';
  const NAME_ACTIVE = 'active';

  const EVENT_DRAG_START = 'dragstart';
  const EVENT_DRAG_END = 'dragend';
  const EVENT_DRAG_ENTER = 'dragenter';
  const EVENT_DRAG_OVER = 'dragover';
  const EVENT_DRAG_LEAVE = 'dragleave';
  const EVENT_DROP = 'drop';

  const DATA_HINT = 'data-hint';
  const DATA_DECK = 'data-deck';
  const DATA_DECK_COLOUR = 'data-deck-colour';
  const DATA_COLOUR = 'data-colour';
  const DATA_SLOT = 'data-slot';
  const DATA_SIDE = 'data-side';
  const DATA_NUMBER = 'data-number';
  const DATA_FOR = 'data-for';
  const DATA_ID = 'data-id';
  const DRAGGABLE = 'draggable';

  const DATA_HINT_TRUE = `${DATA_HINT} = "true"`;
  const DRAGGABLE_TRUE = `${DRAGGABLE} = "true"`;

  const SELECTOR_CLASS_NAME_ALGO = `.${NAME}`;
  const SELECTOR_CLASS_NAME_DROP_BTN = `.${NAME_DROP_BTN}`;
  const SELECTOR_CLASS_NAME_SETTINGTAB = `.${NAME_SETTINGTAB}`;
  const SELECTOR_CLASS_NAME_SIDE = `.${NAME_SIDE}`;
  const SELECTOR_CLASS_NAME_DECK = `.${NAME_DECK}`;
  const SELECTOR_CLASS_NAME_SLOT = `.${NAME_SLOT}`;
  const SELECTOR_CLASS_NAME_CARD = `.${NAME_CARD}`;
  const SELECTOR_ID_ALGOL = `#${NAME}`;
  const SELECTOR_ID_LEVEL = `#${NAME_LEVEL}`;
  const SELECTOR_ID_WHITE_DECK = `#${NAME_WHITE_DECK}`;
  const SELECTOR_ID_BLUE_DECK = `#${NAME_BLUE_DECK}`;
  const SELECTOR_ID_HINT_REMAIN = `#${NAME_HINT_REMAIN}`;
  const SELECTOR_ID_NEW_GAME = `#${NAME_NEW_GAME}`;
  const SELECTOR_ID_SUBMIT_NEW_GAME = `#${NAME_SUBMIT_NEW_GAME}`;
  const SELECTOR_ID_RESET_GAME = `#${NAME_RESET_GAME}`;
  const SELECTOR_ID_HINT = `#${NAME_HINT}`;
  const SELECTOR_ID_RULE = `#${NAME_RULE}`;
  const SELECTOR_ID_CHECK_RESULT = `#${NAME_CHECK_RESULT}`;
  const SELECTOR_CLASS_NAME_CLOSE = `.${NAME_CLOSE}`;
  const SELECTOR_ID_ISRANDOM = `#${NAME_ISRANDOM}`;
  const SELECTOR_BUTTON_NEW_GAME = `button${SELECTOR_ID_NEW_GAME}`;
  const SELECTOR_BUTTON_SUBMIT_NEW_GAME = `button${SELECTOR_ID_SUBMIT_NEW_GAME}`;
  const SELECTOR_BUTTON_RESET_GAME = `button${SELECTOR_ID_RESET_GAME}`;
  const SELECTOR_BUTTON_HINT = `button${SELECTOR_ID_HINT}`;
  const SELECTOR_BUTTON_RULE = `button${SELECTOR_ID_RULE}`;
  const SELECTOR_BUTTON_CHECK_GAME = `button${SELECTOR_ID_CHECK_RESULT}`;
  const SELECTOR_INPUT_ISRANDOM = `input${SELECTOR_ID_ISRANDOM}`;

  const whiteDeck = document.getElementById(NAME_WHITE_DECK);
  const blueDeck = document.getElementById(NAME_BLUE_DECK);
  const sideSlot = document.querySelectorAll(SELECTOR_CLASS_NAME_SIDE);
  const newGameBtn = document.getElementById(NAME_NEW_GAME);
  const submitBtn = document.getElementById(NAME_SUBMIT_NEW_GAME);
  const checkGame = document.getElementById(NAME_CHECK_RESULT);
  const resetGameBtn = document.getElementById(NAME_RESET_GAME);
  const hintBtn = document.getElementById(NAME_HINT);
  const hintRemain = document.getElementById(NAME_HINT_REMAIN);
  const rulesBtn = document.getElementById(NAME_RULE);
  const closeBtn = document.querySelectorAll(SELECTOR_CLASS_NAME_CLOSE);
  let slots = document.querySelectorAll(SELECTOR_CLASS_NAME_SLOT);
  let cards = document.querySelectorAll(SELECTOR_CLASS_NAME_CARD);
  let randomSide, randomSlot, side, idx, oldCard;
  // For card that picked up
  let draggableCard = null;

  // For determine that card colour
  let colour = null;

  // For check when switch card
  let cameFrom = null;

  // For destination where to switch card
  let goTo = null;

  // For final result if true that mean all card position is correctly.
  let checkBool = false;

  window.onload = () => {
    if('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0){
      Swal.fire('This web application still not support touch device. Please try again on desktop browser.');
      submitBtn.setAttribute('disabled', '');
    }
  }

  const isAllCorrect = boolean => {
    checkBool = true * boolean;
    if(!checkBool){
      Swal.fire('FAIL, Try again');
    } else {
      Swal.fire({
        icon: 'success',
        title: 'WELLDONE',
      })
    }
  }

  const customSort = (a, b) => {
    const [aChar, aNum] = a.split('-');
    const [bChar, bNum] = b.split('-');
  
    if(aNum === bNum){
      if(aChar.startsWith('w') && bChar.startsWith('b')){
        return -1; // 'w' comes before 'b' when the numbers are equal
      } else if(aChar.startsWith('b') && bChar.startsWith('w')){
        return 1; // 'b' comes after 'w' when the numbers are equal
      }
    }
    return parseInt(aNum) - parseInt(bNum); // Standard numeric comparison
  }


  const implementResetGame = (cards, deck) => {
    cards.forEach(card => {
      deck.appendChild(card);
      card.removeAttribute('style');
      card.removeAttribute(DATA_COLOUR);
    });
  }


  const setCards = (numCards, numPlayer) => {
    if(typeof numCards !== 'number' && Number.isInteger(numCards)){
      throw ReferenceError('Type of number of cards must be integer number.');
    }
    if(numCards % 2 === 1){
      throw RangeError('Number of cards must be even number.');
    }
    if(numCards > 24 || numCards < numPlayer){
      throw RangeError('Number of cards out of range. At least equals to number of players and maximum to 24');
    }
    return numCards;
  }
  
  const randomSideSlot = (_this) => {
    // Random in slots that not be already hint.
    randomSide = Math.floor(Math.random() * 4);
    randomSlot = Math.floor(Math.random() * _this.field[randomSide].length);
    side = randomSide === 0 ? TOP : randomSide === 1 ? LEFT : randomSide === 2 ? RIGHT : DOWN;
  }

  const AlgoGame = function(){
    /**
     * @param numberOfCards Default is 12, Number of cards to use It can only be an even number because it requires the same number of cards of both colors
     * and at least equals to number of players and maximum to 24.
     * @param isRandomCard Default is false, true: game will randomly pick up card number, false: game will pick up sequentialy card number with random start index.
     */
    function AlgoGame(numberOfCards = 12, isRandomCard = false){
      this.isRandomCard = isRandomCard;
      this.result = [];
      // For check when use hint that card is already pick or not.
      this.hintCard = [];
      this.hintCount = 3;
      this.numberOfPlayers = 4;
      // For keep up card that drop into field and check result.
      this.readyToCheck = [];
      this.numberOfCards = setCards(numberOfCards, this.numberOfPlayers);
      this.deck = this.createDeck(this.numberOfCards, this.isRandomCard);
      // Field use for reset back to the first value each slot.
      this.field = this.settingDeck(this.deck, this.numberOfPlayers);
      this.renderStage();
    }

    // Prototype drag drop event
    AlgoGame.prototype.addEventListeners = function(){
      // Add event listeners for cards using event delegation
      cards.forEach(card => {
        card.addEventListener(EVENT_DRAG_START, dragStart);
        card.addEventListener(EVENT_DRAG_END, dragEnd);
      });
    
    
      // Add event listeners for slots and decks using event delegation
      // Determine what element that can drop dragged element
      [whiteDeck, blueDeck, ...slots].forEach(item => {
        item.addEventListener(EVENT_DRAG_ENTER, dragEnter);
        item.addEventListener(EVENT_DRAG_OVER, dragOver);
        item.addEventListener(EVENT_DRAG_LEAVE, dragLeave);
        item.addEventListener(EVENT_DROP, dragDrop);
      });
    
    
      // Function to handle drag events on cards
      function dragStart(e){
        // Where picked up card came from (slot or deck)
        cameFrom = e.target.parentNode;
    
        // // If card is a hint return
        if(this.dataset.hint === 'true'){
          return;
        }
        
        // If came from deck check colour from parent element (picked up from deck)
        // If came from slot check colour from data-colour (picked up from slot)
        colour = this.parentNode.dataset.deckColour || this.dataset.colour;
    
        // Set background colour and font colour to picked up card
        // Set data-colour use for background colour itself and determine which deck should be returned to
        // Note : It use only for card out side deck (in slot) when bring back to deck css will determine background colour of that card
        this.style.backgroundColor = colour;
        this.style.color = colour === BLUE ? WHITE : BLACK;
        this.setAttribute(DATA_COLOUR, colour);
    
        // Store card that picked up
        draggableCard = this;
    
        // Hide from where came from
        // Note : Using setTimeout with a minimal delay like this is a common technique to
        // ensure certain UI updates take place smoothly, especially when you need to
        // avoid disrupting other immediate rendering tasks
        setTimeout(() => {
          this.style.display = 'none';
        }, 0);
      }
    
      // Used to detect when a draggable element enters a valid drop target
      function dragEnter(e){
        // To prevent the default behavior (e.g., opening a link)
        e.preventDefault();
      }
    
      // When drag move over to a given elements
      function dragOver(e){
        e.preventDefault();
        // // If slot is a hint return
        if(this.dataset.hint === 'true'){
          return;
        }
        
        // What element draggable card moves within the bounds of given element
        // Note : use for switch card
        goTo = this;
    
        // Set red border to mouse focus elements
        setTimeout(() => {
          this.style.border = '2px solid red';
        }, 0);
      }
    
      // When drag leave out from given elements
      function dragLeave(){
        // Remove red border from slot that leave then use original css
        setTimeout(() => {
          this.removeAttribute('style');
        }, 0);
      }
    
      // Handle the dropped data here
      function dragDrop(){
        // Remove red border from slot that dropped
        setTimeout(() => {
          this.removeAttribute('style');
        }, 0);

        // When dropped card
        if(cameFrom.classList.contains(NAME_DECK) && goTo.classList.contains(NAME_SLOT)){
          // If slot has no children
          if(this.children.length === 0){
            // Dropped card to that slot
            this.appendChild(draggableCard);
          } else {
            // If slot is a hint return
            if(this.dataset.hint === 'true'){
              return;
            }
    
            // If slot had a children
            // Get children from where to drop
            oldCard = this.children[0];
    
            // Remove children element
            this.removeChild(oldCard);
    
            // Drop new draggable card
            this.appendChild(draggableCard);
            
            // Bring back to own deck colour
            if(cameFrom.dataset.deckColour === oldCard.dataset.colour){
              cameFrom.appendChild(oldCard);
              oldCard.removeAttribute('style');
              oldCard.removeAttribute(DATA_COLOUR);
            } else {
              document.querySelector(`${SELECTOR_CLASS_NAME_DECK}[${DATA_DECK_COLOUR}=${oldCard.dataset.colour}]`).appendChild(oldCard);
              oldCard.removeAttribute('style');
              oldCard.removeAttribute(DATA_COLOUR);
            }
          }
        } else if(cameFrom.classList.contains(NAME_SLOT) && goTo.classList.contains(NAME_SLOT)){
          // If slot had a children
          if(this.children.length === 1){
            // If slot is a hint return
            if(this.dataset.hint === 'true'){
              return;
            }
            // Get children from where to drop
            let childrenCard = this.children[0];
    
            // Remove children element
            this.removeChild(childrenCard);
    
            // Drop new draggable card
            this.appendChild(draggableCard);
    
            // Bring back to own deck colour
            cameFrom.appendChild(childrenCard);
          } else {
            // Dropped card to that slot
            this.appendChild(draggableCard);
          }
        } else if(cameFrom.classList.contains(NAME_SLOT) && goTo.classList.contains(NAME_DECK)){
          // Compare between where deck need to drop to with picked up card colour
          // Check card colour and deck colour is match when drag card back to deck if not do nothing that card
          if(this.dataset.deckColour === colour){
            // Append card to deck
            this.appendChild(draggableCard);
          }
        }
      }
    
      // Function to handle after drag events finished
      function dragEnd(e){
        e.preventDefault();

        // Reset
        draggableCard = null;
    
        // Display card
        this.style.display = 'flex';
    
        // Remove style and data-colour it's not necessary anymore and then use original css itself
        setTimeout(() => {
          // Check card colour and deck colour is match when drag card back to deck if not do nothing that card
          if(this.parentNode.dataset.deckColour === colour){
            this.removeAttribute('style');
            this.removeAttribute(DATA_COLOUR);
          }
        }, 0);
      }
    }

    AlgoGame.prototype.hint = function(){
      if(whiteDeck.children.length === 0 && blueDeck.children.length === 0){
        alert('You have to remain cards in deck at least 1 card.')
        return;
      }
  
      if(this.hintCount === 0){
        alert('Not enough to use TRY IT YOURSELF.');
        return;
      }
      hintRemain.innerText = --this.hintCount;
  
      randomSideSlot(this);
  
      // Check in field first that slot is not a hint yet.
      while(true){
        if(this.field[randomSide][randomSlot] !== this.result[randomSide][randomSlot] && !this.hintCard.includes(`${randomSide}, ${randomSlot}`)){
          this.hintCard.push(`${randomSide}, ${randomSlot}`);
          let [c, n] = this.result[randomSide][randomSlot].split('-');
          let colour = c === 'w' ? WHITE : BLUE;
          let card = document.querySelector(`${SELECTOR_CLASS_NAME_DECK}[${DATA_DECK_COLOUR}="${colour}"] ${SELECTOR_CLASS_NAME_CARD}[${DATA_NUMBER}="${n}"]`);
          if(card === null){
            randomSideSlot(this);
            this.hintCard.pop();
            continue;
          }
          card.style.backgroundColor = colour;
          card.style.color = `${c === 'w' ? BLACK : WHITE}`;
          card.style.display = 'flex';
          card.setAttribute(DATA_COLOUR, colour);
          slots = document.querySelectorAll(`${SELECTOR_CLASS_NAME_SIDE}[${DATA_SIDE}="${side}"] ${SELECTOR_CLASS_NAME_SLOT}`);
  
          if(side === RIGHT){
            if(slots[slots.length - 1 - randomSlot].children.length === 1){
              oldCard = slots[slots.length - 1 - randomSlot].children[0];
              slots[slots.length - 1 - randomSlot].removeChild(oldCard);
              document.querySelector(`${SELECTOR_CLASS_NAME_DECK}[${DATA_DECK_COLOUR}=${oldCard.dataset.colour}]`).appendChild(oldCard);
            }
            slots[slots.length - 1 - randomSlot].appendChild(card);
          } else {
            if(slots[randomSlot].children.length === 1){
              oldCard = slots[randomSlot].children[0];
              slots[randomSlot].removeChild(oldCard);
              document.querySelector(`${SELECTOR_CLASS_NAME_DECK}[${DATA_DECK_COLOUR}=${oldCard.dataset.colour}]`).appendChild(oldCard);
            }
            slots[randomSlot].appendChild(card);
          }

          side = card.parentNode.parentNode.dataset.side === TOP ? 0 : card.parentNode.parentNode.dataset.side === LEFT ? 1 : card.parentNode.parentNode.dataset.side === RIGHT ? 2 : 3;
          idx = parseInt(card.parentNode.dataset.slot) % card.parentNode.parentNode.children.length;
          this.readyToCheck[side][idx] = `${card.dataset.colour[0]}-${card.dataset.number}`;

          break;
        } else {
          randomSideSlot(this);
          continue;
        }
      }
    }


    AlgoGame.prototype.resetGame = function(){
      let wCards = document.querySelectorAll(`${SELECTOR_CLASS_NAME_CARD}[${DATA_COLOUR} = ${WHITE}][${DRAGGABLE_TRUE}]`);
      let bCards = document.querySelectorAll(`${SELECTOR_CLASS_NAME_CARD}[${DATA_COLOUR} = ${BLUE}][${DRAGGABLE_TRUE}]`);
  
      implementResetGame(wCards, whiteDeck);
      implementResetGame(bCards, blueDeck);
  
      this.hintCard = [];
      // Deep copied when this.readyToCheck element has modified this.field was changed too.
      // then have to deep copied by convert to JSON then convert back again.
      // Note: if use normal assign it's mean point to the same array in memory.
      this.readyToCheck = JSON.parse(JSON.stringify(this.field));
    }

    // Prototype check result
    AlgoGame.prototype.checkResult = function(){
      // Check final result allow when used all of cards only.
      if(whiteDeck.children.length > 0 || blueDeck.children.length > 0){
        Swal.fire('Game is not finish keep going.');
        return;
      }

      let top = document.querySelector(`[${DATA_SIDE}="${TOP}"]`).childNodes;
      let left = document.querySelector(`[${DATA_SIDE}="${LEFT}"]`).childNodes;
      let right = document.querySelector(`[${DATA_SIDE}="${RIGHT}"]`).childNodes;
      let down = document.querySelector(`[${DATA_SIDE}="${DOWN}"]`).childNodes;
      let all = [top, left, right, down];
      let aChar, bChar, aNum, bNum;
      let bool = [];

      for(let i = 0; i < all.length; i++){
        // Reset
        aChar = '';
        bChar = '';
        aNum = '';
        bNum = '';

        for(let j = 0; j < all[i].length; j++){
          if(i === 2){
            // Reverse get card number from last to first index
            this.readyToCheck[i][j] = `${all[i][all[i].length - 1 - j].childNodes[0].dataset.colour[0]}-${all[i][all[i].length - 1 - j].childNodes[0].dataset.number}`;
          } else {
            this.readyToCheck[i][j] = `${all[i][j].childNodes[0].dataset.colour[0]}-${all[i][j].childNodes[0].dataset.number}`;
          }
          if(j > 0){
            if(i === 2){
              [bChar, bNum] = this.readyToCheck[i][j % all[i].length].split('-');
            } else {
              [bChar, bNum] = this.readyToCheck[i][j].split('-');
            }
            if(aNum === bNum){
              if(aChar.startsWith('w') && bChar.startsWith('b') && aChar === this.field[i][j - 1][0] && bChar === this.field[i][j][0]){
                bool.push(true); // 'w' comes before 'b' when the numbers are equal
              } else if(aChar.startsWith('b') && bChar.startsWith('w')){
                bool.push(false); // 'b' comes after 'w' when the numbers are equal
              }
              [aChar, aNum] = [bChar, bNum];
              continue;
            }
            bool.push(parseInt(bNum) - parseInt(aNum) > 0 && aChar === this.field[i][j - 1][0] && bChar === this.field[i][j][0]);
            [aChar, aNum] = [bChar, bNum];
          } else {
            [aChar, aNum] = this.readyToCheck[i][j].split('-');
          }
        }
      }

      if(bool.some(b => b === false)){
        isAllCorrect(false);
      } else {
        isAllCorrect(true);
      }
    }

    // Prototype new game
    AlgoGame.prototype.renderStage = function(){
      // Clear template
      whiteDeck.innerHTML = '';
      blueDeck.innerHTML = '';
      const forRightSide = [];
    
      // Render card into each deck
      for(let i = 0; i < this.deck.length; i++){
        let [c, n] = this.deck[i].split('-');
        let deckColour = c === 'w' ? whiteDeck : blueDeck;
        deckColour.innerHTML += `<div class="${NAME_CARD} order-${n} ${n === '9' ? 'underline' : n === '6' ? 'underline' : ''}" ${DRAGGABLE_TRUE} ${DATA_NUMBER}="${n}">${n}</div>`;
      }
    
      // Render slot and hint card
      let dataSlot = 0;
      for(let i = 0; i < this.field.length; i++){
        // Clear template
        sideSlot[i].innerHTML = '';
        for(let j = 0; j < this.field[i].length; j++){
          let [colour, number] = [this.field[i][j].split('-')[0] === 'b' ? BLUE : WHITE, this.field[i][j].split('-')[1] === undefined ? '' : this.field[i][j].split('-')[1]];
          if(i === 2){
            forRightSide.unshift(`<div class="${NAME_SLOT} ${colour}" ${DATA_SLOT}="${dataSlot}" ${number !== '' ? DATA_HINT_TRUE : ''}>${number !== '' ? `<div class="${NAME_CARD} order-${number} ${number === '9' ? 'underline' : number === '6' ? 'underline' : ''}" ${DATA_NUMBER}="${number}" ${DATA_HINT_TRUE} style="background-color:${colour}; color:${colour === WHITE ? BLACK : WHITE};" ${number !== '' ? `${DATA_COLOUR}="${colour}"` : ''}>${number}</div>` : ''}</div>`);
            if(forRightSide.length === this.field[0].length){
              let res = forRightSide.join('');
              sideSlot[i].innerHTML += res;
            }
          } else {
            sideSlot[i].innerHTML += `<div class="${NAME_SLOT} ${colour}" ${DATA_SLOT}="${dataSlot}" ${number !== '' ? DATA_HINT_TRUE : ''}>${number !== '' ? `<div class="${NAME_CARD} order-${number} ${number === '9' ? 'underline' : number === '6' ? 'underline' : ''}" ${DATA_NUMBER}="${number}" ${DATA_HINT_TRUE} style="background-color:${colour}; color:${colour === WHITE ? BLACK : WHITE};" ${number !== '' ? `${DATA_COLOUR}="${colour}"` : ''}>${number}</div>` : ''}</div>`;
          }
          dataSlot++;
        }
      }

      // Update slots and card then add event listener
      slots = document.querySelectorAll(SELECTOR_CLASS_NAME_SLOT);
      cards = document.querySelectorAll(SELECTOR_CLASS_NAME_CARD);

      // Deep copy game field's slot for usage when reset and check result.
      this.readyToCheck = JSON.parse(JSON.stringify(this.field));

      hintRemain.innerText = 3;
      document.querySelector(SELECTOR_CLASS_NAME_SETTINGTAB).classList.remove(NAME_ACTIVE);
      document.querySelector(SELECTOR_CLASS_NAME_ALGO).style.pointerEvents = '';

      this.addEventListeners();
    }
    
    AlgoGame.prototype.createDeck = function(numberOfCards, isRandom){ 
      const deck = [];
    
      // All cards divide into two groups colour and use for limit looping.
      // eg. number of card = 12 divide into 2 groups = 12 / 2 = 6 cards for each group colour.
      let halfDeck = numberOfCards / 2;
      // For random index
      let randomIndex;
      // For random number use for decrease number of card after splice card.
      // For sequential number use for increase index.
      let i = 0;
      if(!isRandom){
        randomIndex = Math.floor(Math.random() * (12 - halfDeck + 1));
        while(i < halfDeck){
          deck.push(whiteCards[randomIndex + i]);
          deck.push(blueCards[randomIndex + i]);
          i++;
        }
      } else {
        let copyWhite = whiteCards.slice();
        let copyblue = blueCards.slice();
        while(i < halfDeck){
          randomIndex = Math.floor(Math.random() * (halfDeck - i));
          deck.push(copyWhite[randomIndex]);
          deck.push(copyblue[randomIndex]);
          copyWhite.splice(randomIndex, 1);
          copyblue.splice(randomIndex, 1);
          i++;
        }
      }
      return deck;
    }
    
    AlgoGame.prototype.settingDeck = function(deck, _numPlayer){
      // For draw card iterate till last player.
      let faceUpCardsEachPlayer = [];
      // For store deck use in game.
      let inGameDeckCards = [];
      // For face down card use to play in game.
      let faceDownCardEachPlayer = [];
      // Copy deck for slice looping
      let _deck = JSON.parse(JSON.stringify(deck));
      let cardsOnHand = deck.length / _numPlayer;
    
      // Each player should take at least 3 cards each round.
      if(_deck.length / _numPlayer < 3 || _deck.length < _numPlayer * 3){
        throw Error(`Number of card at least must be ${(_numPlayer * 3) % 2 === 1 ? (_numPlayer * 3) + 1 : (_numPlayer * 3)}.`);
      }
    
      while(_deck.length){
        // Random index of card from deck.
        let index = Math.floor(Math.random() * _deck.length);
    
        // Push random card into player's card.
        faceUpCardsEachPlayer.push(_deck[index]);
    
        // If player's card hold card reach to limit.
        if(faceUpCardsEachPlayer.length === Math.floor(cardsOnHand)){ 
          // Sorting the card then push it to field's slot. (result of game.)
          let sortedDeck = faceUpCardsEachPlayer.sort(customSort);

          // Save the result
          // Note: It's optional to use to check because some cards can switch with each other and still correct.
          this.result.push(sortedDeck);
    
          // Face down and face up some card to be hint.
          let random = Math.floor(Math.random() * faceUpCardsEachPlayer.length);
          sortedDeck.forEach((card, idx) => {
            if(idx === random){
              // Face up card (Hint)
              faceDownCardEachPlayer.push(card);
    
              // // Get rid of face up card from deck
              this.deck.splice(this.deck.indexOf(card), 1);

            } else {
              // Face down card (Guess)
              faceDownCardEachPlayer.push(card.split('-')[0]);
            }
            // If facedown card length reach to limit for each player.
            if(faceDownCardEachPlayer.length === Math.floor(cardsOnHand)){
              // Push it to deck with separate for each player for use in game.
              inGameDeckCards.push(faceDownCardEachPlayer);
            }
          });
          // Reset for use to next player.
          faceUpCardsEachPlayer = [];
          faceDownCardEachPlayer = [];
        }
        // Limit loop
        _deck.splice(index, 1);
      }
      // Return ready deck
      return inGameDeckCards;
    }
    return AlgoGame;
  }();
  let game;

  // Menu button
  [rulesBtn, newGameBtn, ...closeBtn].forEach(btn => {
    btn.addEventListener('click', e => {
      if(e.target.name === NAME_CLOSE){
        document.querySelector(`.${e.target.dataset.id}`).classList.remove(NAME_ACTIVE);
      } else {
        document.querySelector(`.${e.target.dataset.for}`).classList.add(NAME_ACTIVE);
      }
    });
  });


  submitBtn.addEventListener('click', () => {
    let numberOfCards = document.getElementById(NAME_LEVEL).value;
    let isRandom = document.getElementById(NAME_ISRANDOM).checked;

    // Create game
    game = new AlgoGame(parseInt(numberOfCards), isRandom);
    // console.log(game.deck);
    // console.log(game.field);
    // console.log(game.result);
    // console.log(game.readyToCheck);
    // When Game start activate check button
    checkGame.addEventListener('mouseover', () => {
      checkGame.classList.add(NAME_ACTIVE);
    });
    checkGame.addEventListener('mouseleave', () => {
      checkGame.classList.remove(NAME_ACTIVE);
    });

    // When Game start activate menu button
    checkGame.removeAttribute('disabled');
    hintBtn.removeAttribute('disabled');
    resetGameBtn.removeAttribute('disabled');
  });

  checkGame.addEventListener('click', () => {
    game.checkResult();
    if(checkBool){
      document.querySelector(SELECTOR_CLASS_NAME_ALGO).style.pointerEvents = 'none';
      checkGame.setAttribute('disabled', '');
      checkGame.classList.remove(NAME_ACTIVE);
      hintBtn.setAttribute('disabled', '');
      resetGameBtn.setAttribute('disabled', '');
      return;
    }
  });

  resetGameBtn.addEventListener('click', () => {
    game.resetGame();
  });

  hintBtn.addEventListener('click', () => {
    game.hint();
  });
}));

// let i = 24;
// let numberOfCardEachPlayer = 7;
// while(i > 0){
//   if(Math.round(i / numberOfCardEachPlayer) !== 0){
//     console.log(numberOfCardEachPlayer + ' Players ' + 'Use total cards ' + (i + numberOfCardEachPlayer - 1 > 24 ? '' : i + numberOfCardEachPlayer - 1 + ' - ') + i + ' cards' + ' given each player ' + Math.round(i / numberOfCardEachPlayer) + ' cards');
//   }
//   i -= numberOfCardEachPlayer;
// }

/**
 *  2 Players Use total cards 24 cards given each player 12 cards
 *  2 Players Use total cards 22 cards given each player 11 cards
 *  2 Players Use total cards 20 cards given each player 10 cards
 *  2 Players Use total cards 18 cards given each player 9 cards
 *  2 Players Use total cards 16 cards given each player 8 cards
 *  2 Players Use total cards 14 cards given each player 7 cards
 *  2 Players Use total cards 12 cards given each player 6 cards
 *  2 Players Use total cards 10 cards given each player 5 cards
 *  2 Players Use total cards 8 cards given each player 4 cards
 *  2 Players Use total cards 6 cards given each player 3 cards
 *  2 Players Use total cards 4 cards given each player 2 cards
 *  2 Players Use total cards 2 cards given each player 1 card
 */

/**
 *  3 Players Use total cards 24 cards given each player 8 cards
 *  3 Players Use total cards 22 cards given each player 7 cards
 *  3 Players Use total cards 20, 18 cards given each player 6 cards
 *  3 Players Use total cards 16 cards given each player 5 cards
 *  3 Players Use total cards 14, 12 cards given each player 4 cards
 *  3 Players Use total cards 10 cards given each player 3 cards
 *  3 Players Use total cards 8, 6 cards given each player 2 cards
 *  3 Players Use total cards 4 cards given each player 1 card
 */

/**
 *  4 Players Use total cards 24 cards given each player 6 cards
 *  4 Players Use total cards 22, 20 cards given each player 5 cards
 *  4 Players Use total cards 18, 16 cards given each player 4 cards
 *  4 Players Use total cards 14, 12 cards given each player 3 cards
 *  4 Players Use total cards 10, 8 cards given each player 2 cards
 *  4 Players Use total cards 6, 4 cards given each player 1 card
 */

/**
 *  5 Players Use total cards 24 cards given each player 5 cards
 *  5 Players Use total cards 22 cards given each player 4 cards
 *  5 Players Use total cards 18, 16, 14 cards given each player 3 cards
 *  5 Players Use total cards 12 cards given each player 2 cards
 *  5 Players Use total cards 8, 6, 4 cards given each player 1 cards
 */

/**
 *  6 Players Use total cards 24 cards given each player 4 cards
 *  6 Players Use total cards 22, 20, 18 cards given each player 3 cards
 *  6 Players Use total cards 16, 14, 12 cards given each player 2 cards
 *  6 Players Use total cards 10, 8, 6 cards given each player 1 card
 */

/**
 *  7 Players Use total cards 24 cards given each player 3 cards
 *  7 Players Use total cards 22 cards given each player 2 cards
 *  7 Players Use total cards 16, 14, 12, 10 cards given each player 1 cards
 */

/**
 *  8 Players Use total cards 24 cards given each player 3 cards
 *  8 Players Use total cards 22, 20, 18, 16 cards given each player 2 cards
 *  8 Players Use total cards 14, 12, 10, 8 cards given each player 1 card
 */