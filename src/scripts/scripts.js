const sideBars = document.getElementById('sideBars');
const btnToggle = document.getElementById('btnToggle');
const toggler = document.querySelector('.toggler');
const linkIcon = document.querySelectorAll('.nav-icon');
const linkText = document.querySelectorAll('.nav-text');
const sideDropdown = document.getElementsByClassName('btnDropmenu');
const dropDown = document.getElementsByClassName('iconArrowdrop');
const iconArrow = document.getElementsByClassName('iconArrowdrop')[0].children;
const elemsTagUL = document.querySelectorAll('.tagLists');
let touchX = 0;
let deltaX = 0;
const Default = {
    touch: true,
    mouse: true
};
const pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
addEventlisteners();

btnToggle.onclick = function(){
    sideBars.classList.toggle('active');
}
document.addEventListener('click', function(e){
    if(!sideBars.classList.contains('active')){
        return;
    }
    if(!sideBars.contains(e.target)){
        sideBars.classList.toggle('active');
        toggler.checked = false;
    }
});
(window.onresize = function(){
    if(window.innerWidth >= 576 || window.screen.width >= 576){
        // sideBars.classList.add('active');
        sideBars.style.left = '0';
        // toggler.checked = true;
    }
    if(window.innerWidth < 577 || window.screen.width < 577){
        sideBars.classList.remove('active');
        sideBars.style.left = '-70px';
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
            sideBars.style.left = '0';
        }
        if(deltaX < -100){
            sideBars.style.left = '-70px';
            if(!sideBars.classList.contains('active')){
                return;
            } else {
                sideBars.classList.toggle('active');
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

const setTagColorBG = {
    javascript : 'hsl(38, 100%, 90%)',
    html : 'hsl(0, 100%, 90%)',
    css : 'hsl(59, 100%, 90%)',
    react : 'hsl(193, 100%, 90%)',
    algorithm : 'hsl(82, 100%, 90%)',
    mern : 'hsl(200, 100%, 90%)',
    spotify : 'hsl(141, 100%, 90%)',
    api : 'hsl(279, 100%, 90%)',
    scss : 'hsl(262, 100%, 90%)',
    mongodb : 'hsl(115, 100%, 90%)',
    expressjs : 'hsl(323, 100%, 90%)',
    nodejs : 'hsl(247, 100%, 90%)',
    length : 12
}
const setTagColorText = {
    javascript : 'hsl(38, 100%, 30%)',
    html : 'hsl(0, 100%, 30%)',
    css : 'hsl(59, 100%, 30%)',
    react : 'hsl(193, 100%, 30%)',
    algorithm : 'hsl(82, 100%, 30%)',
    mern : 'hsl(200, 100%, 30%)',
    spotify : 'hsl(141, 100%, 30%)',
    api : 'hsl(279, 100%, 30%)',
    scss : 'hsl(262, 100%, 30%)',
    mongodb : 'hsl(115, 100%, 30%)',
    expressjs : 'hsl(323, 100%, 30%)',
    nodejs : 'hsl(247, 100%, 30%)',
    length : 12
}

const getTextInTagLists = () => {
    return [...elemsTagUL].map((tagUL) => {
        return tagUL.innerText.split(',').map((text, i) => {
            return text.trim();
        }).filter(e => e.length > 0)
    })
}
const stylingTags = () => {
    let keysColorInSet = Object.keys(setTagColorBG).filter(e => e !== 'length');
    keysColorInSet = keysColorInSet.map(e => { return e.toLowerCase() });
    let allTextInTags = getTextInTagLists();
    for(let i = 0; i < elemsTagUL.length; i++){
        elemsTagUL[i].innerHTML = '';
        for(let j = 0; j < allTextInTags[i].length; j++){
            elemsTagUL[i].appendChild(document.createElement('li')).innerText = allTextInTags[i][j];
            elemsTagUL[i].childNodes[j].setAttribute('class', 'stylingTags');
            for(let k = 0; k < setTagColorBG.length; k++){
                if(elemsTagUL[i].childNodes[j].innerText.toLowerCase() === keysColorInSet.map(e => { return e.toLowerCase() })[k]){
                    elemsTagUL[i].childNodes[j].style.backgroundColor = setTagColorBG[Object.keys(setTagColorBG).filter(e => e !== 'length')[k]];
                    elemsTagUL[i].childNodes[j].style.color = setTagColorText[Object.keys(setTagColorBG).filter(e => e !== 'length')[k]];
                }
                if(!keysColorInSet.includes(elemsTagUL[i].childNodes[j].innerText.toLowerCase())){
                    elemsTagUL[i].childNodes[j].style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`;
                    elemsTagUL[i].childNodes[j].style.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 20%)`;
                }
            }
        }
    }
}

stylingTags()


const backgroundProject = () => {
    const elemsProjects = document.querySelectorAll('.projectLink')
    for(let i = 0; i < elemsProjects.length; i++){
        const projectsName = document.querySelectorAll('.projectLink')[i].attributes.name.value;
        elemsProjects[i].style.backgroundImage = `url(./src/img/${projectsName}.jpg)`;
        elemsProjects[i].style.backgroundRepeat = 'no-repeat';
        elemsProjects[i].style.backgroundPosition  = 'top center';
        elemsProjects[i].style.backgroundSize   = 'cover';
    }
}
backgroundProject()