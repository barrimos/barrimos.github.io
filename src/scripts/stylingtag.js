const elemsTagUL = document.querySelectorAll('.tagLists');

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