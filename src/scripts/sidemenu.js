const sideMenu = document.getElementById('sideMenu');
const btnToggle = document.getElementById('btnToggle');
const toggler = document.querySelector('.toggler');
const linkIcon = document.querySelectorAll('.nav-icon');
const linkText = document.querySelectorAll('.nav-text');
const sideDropdown = document.getElementsByClassName('btnDropmenu');
const dropDown = document.getElementsByClassName('iconArrowdrop');
const iconArrow = document.getElementsByClassName('iconArrowdrop')[0].children;
let touchX = 0;
let deltaX = 0;
const Default = {
    touch: true,
    mouse: true
};
const pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
addEventlisteners();

btnToggle.onclick = function(){
    sideMenu.classList.toggle('active');
}
document.addEventListener('click', function(e){
    if(!sideMenu.classList.contains('active')){
        return;
    }
    if(!sideMenu.contains(e.target)){
        sideMenu.classList.toggle('active');
        toggler.checked = false;
    }
});
(window.onresize = function(){
    if(window.innerWidth >= 576 || window.screen.width >= 576){
        // sideMenu.classList.add('active');
        sideMenu.style.left = '0';
        // toggler.checked = true;
    }
    if(window.innerWidth < 577 || window.screen.width < 577){
        sideMenu.classList.remove('active');
        sideMenu.style.left = '-70px';
        toggler.checked = false;
    }
})();
function addEventlisteners(){
    if(!pointerEvent){
        return;
    }
    if(Default.touch){
        _touchSwipe();
    }
    if(Default.mouse){
        _mouseSwipe();
    }
}
function swipeMenu(){
    if(window.innerWidth > 767){
        return;
    } else {
        if(deltaX >= 100){
            sideMenu.style.left = '0';
        }
        if(deltaX < -100){
            sideMenu.style.left = '-70px';
            if(!sideMenu.classList.contains('active')){
                return;
            } else {
                sideMenu.classList.toggle('active');
                toggler.checked = false;
            }
        }
    }
}
function _touchSwipe(){
    function touchStart(e){
        touchX = e.targetTouches[0].clientX;
    };
    function touchMove(e){
        if(e.touches && e.touches.length > 1){
            deltaX = 0;
        } else {
            deltaX = e.targetTouches[0].clientX - touchX;
        }
    };
    function touchEnd(e){
        deltaX = e.changedTouches[0].clientX - touchX;
        swipeMenu();
    };
    document.addEventListener('touchstart', function(e){
        return touchStart(e);
    });
    document.addEventListener('touchmove', function(e){
        return touchMove(e);
    });
    document.addEventListener('touchend', function(e){
        return touchEnd(e);
    });
};
function _mouseSwipe(){
    function mouseStart(e){
        touchX = e.clientX;
    }
    function mouseEnd(e){
        deltaX = e.clientX - touchX;
        swipeMenu();
    }
    document.addEventListener('mousedown', function(e){
        return mouseStart(e);
    });
    document.addEventListener('mouseup', function(e){
        return mouseEnd(e);
    });
};
for(let i=0; i<sideDropdown.length; i++){
    sideDropdown[i].addEventListener('click', function(){
        this.parentElement.querySelector('.iconArrowdrop').classList.toggle('open');
        const dropdownContent = this.nextElementSibling;
        if(dropdownContent.style.maxHeight){
            dropdownContent.style.maxHeight = null;
        } else {
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
        }
    });
}
const curPage = (() => {
    const currentPage = window.location.pathname.slice(1).split('.')[0];
    const allLinks = document.querySelectorAll('.nav-link');
    for(let i=0; i<allLinks.length; i++){
        const linkUrl = allLinks[i].getAttribute('href').split('.')[0];
        if(currentPage === ''){
            allLinks[0].classList.add('curpage');
            linkIcon[0].style.filter = 'invert(1)';
            linkText[0].style.filter = 'invert(1)';
        }
        if(linkUrl === currentPage && linkUrl !== 'hired'){
            allLinks[i].classList.add('curpage');
            linkIcon[i].style.filter = 'invert(1)';
            linkText[i].style.filter = 'invert(1)';
            allLinks[allLinks.length-1].classList.remove('curpage');
            linkIcon[allLinks.length-1].style.filter = 'invert(0)';
            linkText[allLinks.length-1].style.filter = 'invert(0)';
        }
    }
    if(currentPage === 'hired'){
        allLinks[6].classList.toggle('curpage')
        linkIcon[6].style.filter = 'invert(1)';
        linkText[6].style.filter = 'invert(1)';
        iconArrow[0].style.filter = 'invert(1)';
    }
})();