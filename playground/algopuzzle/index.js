const WHITE = 'white';
const BLUE = 'blue';
const BLACK = 'black';

const NAME_NEW_GAME = 'newGameBtn';
const NAME_SUBMIT_NEW_GAME = 'submitSelectBtn';
const NAME_RESET_GAME = 'resetGameBtn';
const NAME_HINT = 'hintBtn';
const NAME_RULE = 'rulesBtn';
const NAME_CLOSE = 'closeBtn';
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

const DATA_DECK_COLOUR = 'data-deck-colour';
const DATA_COLOUR = 'data-colour';
const DRAGGABLE = 'draggable';

const SELECTOR_CLASS_NAME_SIDE = `.${NAME_SIDE}`;
const SELECTOR_CLASS_NAME_DECK = `.${NAME_DECK}`;
const SELECTOR_CLASS_NAME_SLOT = `.${NAME_SLOT}`;
const SELECTOR_CLASS_NAME_CARD = `.${NAME_CARD}`;
const SELECTOR_CLASS_NAME_CLOSE = `.${NAME_CLOSE}`;

const whiteDeck = document.getElementById(NAME_WHITE_DECK);
const blueDeck = document.getElementById(NAME_BLUE_DECK);
const closeBtn = document.querySelectorAll(SELECTOR_CLASS_NAME_CLOSE);
const newGameBtn = document.getElementById(NAME_NEW_GAME);
const rulesBtn = document.getElementById(NAME_RULE);
const submitBtn = document.getElementById(NAME_SUBMIT_NEW_GAME);
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