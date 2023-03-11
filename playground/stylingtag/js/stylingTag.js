const elemsTagUL = document.querySelectorAll('.tagLists');

const setTagColorBG = {
    sample : 'hsl(38, 100%, 90%)',
    length : 1
}
const setTagColorText = {
    sample : 'hsl(38, 100%, 30%)',
    length : 1
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