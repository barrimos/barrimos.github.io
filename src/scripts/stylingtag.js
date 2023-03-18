const elemsTagUL = document.querySelectorAll('.tagLists');
const colorTagBG = document.getElementById('colorTagBG');
const colorTagText = document.getElementById('colorTagText');
const nameTag = document.getElementById('nameTag');
const submitBtn = document.getElementById('submitBtn');

let customName = '';
let customColorBG = 'hsl(0, 0%, 0%)';
let customColorText = 'hsl(0, 0%, 53%)';

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    try{
        if(customName === '' || customName === undefined){
            throw new Error();
        }
    } catch {
        alert('Tag name is empty so key name will be \'custom name\'');
        customName = 'custom name';
    }
    if(!setTagColorBG.hasOwnProperty(customName) && !setTagColorText.hasOwnProperty(customName)){
        setTagColorBG.length++;
        setTagColorText.length++;
    }
    setTagColorBG[customName] = customColorBG;
    setTagColorText[customName] = customColorText;

    stylingTags();
});

nameTag.addEventListener('input', e => {
    customName = e.target.value;
});

colorTagBG.addEventListener('input', e => {
    customColorBG = hexToHSL(e.target.value);
});
colorTagText.addEventListener('input', e => {
    customColorText = hexToHSL(e.target.value);
});

const hexToHSL = (H) => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if(H.length == 4){
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if(H.length == 7){
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if(delta == 0){
        h = 0;
    } else if(cmax == r){
        h = ((g - b) / delta) % 6;
    } else if(cmax == g){
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);
  
    return `hsl(${h}, ${s}%, ${l}%)`;
}

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
    sample : 'hsl(38, 100%, 90%)',
    length : 13
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
    sample : 'hsl(38, 100%, 30%)',
    length : 13
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

const inputText = () => {
    const text = document.querySelector('.sampletext').value;
    elemsTagUL[0].innerText = text;
    stylingTags();
}

stylingTags()