(function(global, factory){
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.carousel= factory());
}(this, (function (){ 'use strict';
    var NAME = 'carousel';

    var DIRECTION_NEXT = 'next';
    var DIRECTION_PREV = 'prev';
    var DIRECTION_RIGHT = 'right';
    var DIRECTION_LEFT = 'left';

    var CLASS_NAME_ACTIVE = 'active';
    var CLASS_NAME_SLIDE = 'slide';
    var CLASS_NAME_NEXT = 'carousel-item-next';
    var CLASS_NAME_PREV = 'carousel-item-prev';
    var CLASS_NAME_RIGHT = 'carousel-item-right';
    var CLASS_NAME_LEFT = 'carousel-item-left';
    var CLASS_NAME_CAP_DIR = '';

    var SELECTOR_ACTIVE = '.active';
    var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
    var SELECTOR_CAROUSEL_INNER = '.carousel-inner';
    var SELECTOR_ITEM = '.carousel-item';
    var SELECTOR_ITEM_IMG = '.carousel-item img';
    var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
    var SELECTOR_INDICATORS = '.carousel-indicators';
    var SELECTOR_CAPTION = '.carousel .caption';
    var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
    var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
    var EVENT_TOUCH_START = 'touchstart';
    var EVENT_TOUCH_MOVE = 'touchmove';
    var EVENT_TOUCH_END = 'touchend';
    var EVENT_POINTER_DOWN = 'pointerdown';
    var EVENT_POINTER_UP = 'pointerup';
    var CLASS_NAME_POINTER_EVENT = 'pointer-event';
    var PointerType = {
        TOUCH: 'touch',
        PEN: 'pen'
    };
    var TRANSITION_END = 'transitionend';
    var EVENT_MOUSE_ENTER = 'mouseenter';
    var EVENT_MOUSE_LEAVE = 'mouseleave';
    var EVENT_MOUSE_DOWN = 'mousedown';
    var EVENT_MOUSE_UP = 'mouseup';
    var EVENT_DRAG_START = "ondragstart";
    var EVENT_SLIDE = 'slide';
    var EVENT_SLID = 'slid';
    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
    var SWIPE_THRESHOLD = 40;
    var Default = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true,
        touch: true,
        mouse: true
    };
    var DefaultType = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean',
        touch: 'boolean',
        mouse: 'boolean'
    };


    //getConfig ---------------- START
    function _extends(){
        _extends = Object.assign || function (target){
            for (var i = 1; i < arguments.length; i++){
                var source = arguments[i];
        
                for (var key in source){
                    if(Object.prototype.hasOwnProperty.call(source, key)){
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    };
    function isElement(obj){
        return (obj[0] || obj).nodeType;
    };
    function toType(obj){
        if(obj === null || typeof obj === 'undefined'){
            return "" + obj;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    };
    function typeCheckConfig(componentName, config, configTypes){
        for (var property in configTypes){
            if(Object.prototype.hasOwnProperty.call(configTypes, property)){
                var expectedTypes = configTypes[property];
                var value = config[property];
                var valueType = value && isElement(value) ? 'element' : toType(value);

                if(!new RegExp(expectedTypes).test(valueType)){
                    throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                }
            }
        }
    };
    //getConfig ---------------- END
    function reflow(element){
        return element.offsetHeight;
    };
    function isVisible(el){
        /* offsetParent would be null if display 'none' is set.
        However Chrome, IE and MS Edge returns offsetParent as null for elements
        with CSS position 'fixed'. So check whether the dimensions are zero.

        This check would be inaccurate if position is 'fixed' AND dimensions were
        intentionally set to zero. But..it is good enough for most cases.*/
        if(!el.offsetParent && el.offsetWidth === 0 && el.offsetHeight === 0){
            return false;
        }
        return true;
    };
    var Carousel = function(){
        function Carousel(element, config, isAuto){ //function.prototype.constructor
            this._items = null;
            this._interval = null;
            this._activeElement = null;
            this._isPaused = false;
            this._isAuto = isAuto;
            this._isSliding = false;
            this.touchTimeout = null;
            this.touchStartX = 0;
            this.touchDeltaX = 0;
            this._config = this._getConfig(config);
            this._element = element;
            this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
            this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
            this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
            this._addEventListeners();
        }

        //function
        Carousel.prototype._addEventListeners = function _addEventListeners(){
            var _this2 = this;
            if(this._config.pause === 'hover'){
                this._element.addEventListener(EVENT_MOUSE_ENTER, function(event){
                    _this2.pause(event);
                });
                this._element.addEventListener(EVENT_MOUSE_LEAVE, function(event){
                    _this2.resume(event);
                });
            }
            if(this._config.touch){
                this._touchSwipe();
            }
            if(this._config.mouse){
                this._mouseSwipe();
            }
        };
        Carousel.prototype._handleSwipe = function _handleSwipe(){
            var absDeltax = Math.abs(this.touchDeltaX);
      
            if(absDeltax <= SWIPE_THRESHOLD){
                return;
            }
      
            var direction = absDeltax / this.touchDeltaX;
            // console.log(direction, absDeltax, this.touchDeltaX);
            this.touchDeltaX = 0; // swipe left
      
            if(direction > 0){//1
                this._prev();
            } // swipe right
      
      
            if(direction < 0){//-1
                this._next();
            }
        };
        Carousel.prototype._mouseSwipe = function _mouseSwipe(){
            var _this7 = this;
            var mouseStart = function mouseStart(event){
                _this7.touchStartX = event.clientX;
            };
            var mouseEnd = function mouseEnd(event){
                _this7.touchDeltaX = event.clientX - _this7.touchStartX;
                _this7._handleSwipe();
            };
            if(this._pointerEvent){
                _this7._element.addEventListener(EVENT_MOUSE_DOWN, function(event){
                    event.preventDefault();
                    return mouseStart(event);
                });
                _this7._element.addEventListener(EVENT_MOUSE_UP, function(event){
                    return mouseEnd(event);
                });
            }
        }
        Carousel.prototype._touchSwipe = function _touchSwipe(){
            var _this3 = this;
            if(!this._touchSupported){
                return;
            }
            var start = function start(event){
                if(_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]){
                    _this3.touchStartX = event.clientX;
                } else if(!_this3._pointerEvent){
                    _this3.touchStartX = event.targetTouches[0].clientX;
                }
            };
        
            var move = function move(event){
                // ensure swiping with one touch and not pinching
                if(event.touches && event.touches.length > 1){
                    _this3.touchDeltaX = 0;
                } else {
                    _this3.touchDeltaX = event.targetTouches[0].clientX - _this3.touchStartX;
                }
            };

            var end = function end(event){
                if(_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]){
                    _this3.touchDeltaX = event.clientX - _this3.touchStartX;
                }
        
                _this3._handleSwipe();
        
                if(_this3._config.pause === 'hover'){
                    // If it's a touch-enabled device, mouseenter/leave are fired as
                    // part of the mouse compatibility events on first tap - the carousel
                    // would stop cycling until user tapped out of it;
                    // here, we listen for touchend, explicitly pause the carousel
                    // (as if it's the second time we tap on it, mouseenter compat event
                    // is NOT fired) and after a timeout (to allow for mouse compatibility
                    // events to fire) we explicitly restart cycling
                    _this3.pause();
        
                    if(_this3.touchTimeout){
                        clearTimeout(_this3.touchTimeout);
                    };
        
                    _this3.touchTimeout = setTimeout(function(event){
                        return _this3.cycle(event);
                    }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
                }
            };
            this._element.querySelector(SELECTOR_ITEM_IMG).addEventListener(EVENT_DRAG_START, function(e){
                return e.preventDefault();
            });

            if(this._pointerEvent){
                this._element.addEventListener(EVENT_POINTER_DOWN, function(event){
                    return start(event);
                });
                this._element.addEventListener(EVENT_POINTER_UP, function(event){
                    return end(event);
                });
                this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            } else {
                this._element.addEventListener(EVENT_TOUCH_START, function(event){
                    return start(event);
                });
                this._element.addEventListener(EVENT_TOUCH_MOVE, function(event){
                    return move(event);
                });
                this._element.addEventListener(EVENT_TOUCH_END, function(event){
                    return end(event);
                });
            }
        };
        Carousel.prototype.cycle = function cycle(event){
            if(!event){
                this._isPaused = false;
            }
      
            if(this._interval){
                clearInterval(this._interval);
                this._interval = null;
            }
      
            if(this._config.interval && !this._isPaused && this._isAuto){
                this._interval = setInterval((document.visibilityState ? this._nextWhenVisible : this._next).bind(this), this._config.interval);
            }
        };
        Carousel.prototype._getConfig = function _getConfig(config){
            config = _extends({}, Default, config);
            typeCheckConfig(NAME, config, DefaultType);
            return config;
        };
        Carousel.prototype._next = function _next(){
            if(!this._isSliding){
                this._slide(DIRECTION_NEXT);
            }
        };
        Carousel.prototype._nextWhenVisible = function _nextWhenVisible(){
            var _this6 = this;
            if(!document.hidden && isVisible(_this6._element) && _this6._element.style.display !== 'none'){
                this._next();
            }
        };
        Carousel.prototype._prev = function _prev(){
            if(!this._isSliding){
                this._slide(DIRECTION_PREV);
            }
        };
        Carousel.prototype._setTimer = function _setTimer(){
            var _this5 = this;
            this._interval = setInterval(function(){
                _this5._next() ;
            }, _this5._config.interval);
        };
        Carousel.prototype.pause = function pause(event){
            if(!event){
                this._isPaused = true;
            }
      
            clearInterval(this._interval);
            this._interval = null;
        };
        Carousel.prototype.resume = function resume(event){
            if(event){
                if(this._isAuto === false){
                    this._isPaused = true;
                } else {
                    this._isPaused = false;
                    this._setTimer();
                }
            }
        };
        Carousel.prototype.to = function to(index){
            var _this = this;
      
            this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);
      
            var activeIndex = this._getItemIndex(this._activeElement);
      
            if(index > this._items.length - 1 || index < 0){
              return;
            }
      
            if(this._isSliding){
              this._element.addEventListener(EVENT_SLID, function (){
                return _this.to(index);
              });
              return;
            }
      
            if(activeIndex === index){
              this.pause();
              this.resume();
              return;
            }
      
            var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;
      
            this._slide(direction, this._items[index]);
        };
        Carousel.prototype._getItemIndex = function _getItemIndex(element){
            this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
            return this._items.indexOf(element);
        };
        Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName){
            var targetIndex = this._getItemIndex(relatedTarget);
      
            var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));
      
            var slideE;
            // Add an event listener
            this._element.addEventListener(EVENT_SLIDE, function(slideEvent){
               return slideEvent;
            });
            // Create the event
            var slideEvent = new CustomEvent(EVENT_SLIDE, {
                detail:{
                    relatedTarget: relatedTarget,
                    direction: eventDirectionName,
                    from: fromIndex,
                    to: targetIndex
                },
                bubbles: true,
                cancelable: true,
            });
            this._element.dispatchEvent(slideEvent);
            return slideE = slideEvent.detail;
        };
        Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element){
            if(this._indicatorsElement){
                var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE));
                for(var indexIndi = 0; indexIndi < indicators.length; indexIndi++){
                    indicators[indexIndi].classList.remove(CLASS_NAME_ACTIVE);
                }
        
                var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
        
                if(nextIndicator){
                    nextIndicator.classList.add(CLASS_NAME_ACTIVE);
                }
            }
        };
        Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement){
            var isNextDirection = direction === DIRECTION_NEXT;
            var isPrevDirection = direction === DIRECTION_PREV;
        
            var activeIndex = this._getItemIndex(activeElement);
        
            var lastItemIndex = this._items.length - 1;
            var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
        
            if(isGoingToWrap && !this._config.wrap){
                return activeElement;
            }

            var delta = direction === DIRECTION_PREV ? -1 : 1;
            var itemIndex = (activeIndex + delta) % this._items.length;
            return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        };
        Carousel.prototype._slide = function _slide(direction, element){
            var _this4 = this;
            var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);
        
            var activeElementIndex = this._getItemIndex(activeElement);
        
            var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
        
            var nextElementIndex = this._getItemIndex(nextElement);


            var activeEleCaption = activeElement.querySelector(SELECTOR_CAPTION);
            var NextEleCaption = nextElement.querySelector(SELECTOR_CAPTION);
            if(activeEleCaption && NextEleCaption){
                if(activeEleCaption.className.split(' ')[1] === 'animToTop'){
                    CLASS_NAME_CAP_DIR = 'animToTop';
                } else {
                    CLASS_NAME_CAP_DIR = 'animToDown';
                }
            } else {
                CLASS_NAME_CAP_DIR = null;
            }

            var directionalClassName;
            var orderClassName;
            var eventDirectionName;
        
            if(direction === DIRECTION_NEXT){
                directionalClassName = CLASS_NAME_LEFT;
                orderClassName = CLASS_NAME_NEXT;
                eventDirectionName = DIRECTION_LEFT;
            } else {
                directionalClassName = CLASS_NAME_RIGHT;
                orderClassName = CLASS_NAME_PREV;
                eventDirectionName = DIRECTION_RIGHT;
            }
            if(nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)){
                this._isSliding = false;
                return;
            }

            var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

            if(slideEvent.defaultPrevented){
                return;
            }

            if(!activeElement || !nextElement){
                // Some weirdness is happening, so we bail
                return;
            }
            
            this._isSliding = true;

            // Add an event listener
            this._element.addEventListener(EVENT_SLID, function(slidEvent){
                return slidEvent;
            });
            // Create the event
            var slidEvent = new CustomEvent(EVENT_SLID, {
                detail:{
                    type: EVENT_SLID,
                    relatedTarget: nextElement,
                    direction: eventDirectionName,
                    from: activeElementIndex,
                    to: nextElementIndex
                },
                bubbles: true,
                cancelable: true
            });

            if(this._element.classList.contains(CLASS_NAME_SLIDE)){
                nextElement.classList.add(orderClassName);
                reflow(nextElement);
                activeElement.classList.add(directionalClassName);
                nextElement.classList.add(directionalClassName);
                activeElement.addEventListener('transitionstart', function(){
                    _this4._setActiveIndicatorElement(nextElement);
                }, {once: true});
                activeElement.addEventListener(TRANSITION_END, function(){
                    if(CLASS_NAME_CAP_DIR){
                        activeEleCaption.classList.remove(CLASS_NAME_CAP_DIR);
                    }
                    nextElement.classList.remove(directionalClassName);
                    nextElement.classList.remove(orderClassName);
                    nextElement.classList.add(CLASS_NAME_ACTIVE);
                    if(CLASS_NAME_CAP_DIR){
                        NextEleCaption.classList.add(CLASS_NAME_CAP_DIR);
                    }
                    activeElement.classList.remove(CLASS_NAME_ACTIVE);
                    activeElement.classList.remove(orderClassName);
                    activeElement.classList.remove(directionalClassName);
                    _this4._isSliding = false;
                }, {once: true});
            } else {
                activeElement.classList.remove(CLASS_NAME_ACTIVE);
                nextElement.classList.add(CLASS_NAME_ACTIVE);
                _this4._isSliding = false;
                // Dispatch/Trigger/Fire the event
                _this4._element.dispatchEvent(slidEvent);
            }
        };
        Carousel.clickHandler = function clickHandler(evt, ele, sel, isAuto){
            var carousel$ = new Carousel(ele, Default, isAuto);
            if(!isAuto){
                carousel$.pause();
            } else {
                carousel$._setTimer();
            }
            ele.addEventListener(evt, function(e){
                var t = e.target;
                while (t && t !== this){
                    if(t.matches(sel)){
                        var select = t.getAttribute('data-slide');
                        if(select == 'prevBtn'){
                            carousel$._prev();
                        }
                        if(select == 'nextBtn'){
                            carousel$._next();
                        }
                        if(t && t.nodeName == "LI"){
                            var selectIndex = t.getAttribute('data-slide-to');
                            carousel$.to(selectIndex);
                        }
                    }
                    t = t.parentNode;
                }
                e.preventDefault();
            });
        };
        // function
        return Carousel;
    }();
    // var carousels = document.getElementById(NAME);
    // var $carousel = new Carousel(carousels, Default);
    // $carousel._setTimer();
    // function clickHandler(evt, ele, sel){
    //     ele.addEventListener(evt, function(e){
    //         var t = e.target;
    //         while (t && t !== this){
    //             if(t.matches(sel)){
    //                 var select = t.getAttribute('data-slide');
    //                 if(select == 'prevBtn'){
    //                     $carousel._prev();
    //                 }
    //                 if(select == 'nextBtn'){
    //                     $carousel._next();
    //                 }
    //                 if(t && t.nodeName == "LI"){
    //                     var selectIndex = t.getAttribute('data-slide-to');
    //                     $carousel.to(selectIndex);
    //                 }
    //             }
    //             t = t.parentNode;
    //         }
    //         e.preventDefault();
    //     });
    // };
    // clickHandler('click', carousels, SELECTOR_DATA_SLIDE);


    // var carousel = document.getElementById(NAME);
    // var $carousel = new Carousel(carousels, Default);
    // $carousel._setTimer();
    // var PREV = document.querySelector('[data-slide=prevBtn]');
    // var NEXT = document.querySelector('[data-slide=nextBtn]');
    // var CAROUSEL_INDICATOR = document.querySelector(SELECTOR_INDICATORS);

    // NEXT.addEventListener('click', function(e){
    //     $carousel._next();
    //     e.preventDefault();
    // });
    // PREV.addEventListener('click', function(e){
    //     $carousel._prev();
    //     e.preventDefault();
    // });
    // CAROUSEL_INDICATOR.addEventListener('click', function(e){
    //     if(e.target && e.target.nodeName == "LI"){
    //         var selectIndex = e.target.getAttribute('data-slide-to');
    //         $carousel.to(selectIndex);
    //     }
    // });
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));
    for(var i=0, len=carousels.length; i<len; i++){
        Carousel.clickHandler('click', carousels[i], SELECTOR_DATA_SLIDE, false);
    }
})));