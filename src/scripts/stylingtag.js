/**
 * Styling tags v1.0
 * This code will find class .taglists then set color for text and background following your setting.
 * Color will be use hsl because easily to read and select.
 * Tag will generate in every single character.
 * Setting color separate each background and text.
 * 
 * Styling tags v2.0
 * Collect setting color into one variable.
 * Added contrast ratio system for best color palette. https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 * Tag will generate after typing comma.
 * Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
 * At least contrast ratio is 4.5:1
 */


const COLORTAGS = {
    javascript : {
        background : 'hsl(38, 100%, 90%)',
        text : 'hsl(38, 100%, 30%)',
    },
    html : {
        background : 'hsl(0, 100%, 90%)',
        text : 'hsl(0, 100%, 30%)',
    },
    css : {
        background : 'hsl(59, 100%, 90%)',
        text : 'hsl(59, 100%, 30%)',
    },
    react : {
        background : 'hsl(193, 100%, 90%)',
        text : 'hsl(193, 100%, 30%)',
    },
    algorithm : {
        background : 'hsl(82, 100%, 90%)',
        text : 'hsl(82, 100%, 30%)',
    },
    mern : {
        background : 'hsl(200, 100%, 90%)',
        text : 'hsl(200, 100%, 30%)',
    },
    spotify : {
        background : 'hsl(141, 100%, 90%)',
        text : 'hsl(141, 100%, 30%)',
    },
    api : {
        background : 'hsl(279, 100%, 90%)',
        text : 'hsl(279, 100%, 30%)',
    },
    scss : {
        background : 'hsl(262, 100%, 90%)',
        text : 'hsl(262, 100%, 30%)',
    },
    mongodb : {
        background : 'hsl(115, 100%, 90%)',
        text : 'hsl(115, 100%, 30%)',
    },
    expressjs : {
        background : 'hsl(323, 100%, 90%)',
        text : 'hsl(323, 100%, 30%)',
    },
    nodejs : {
        background : 'hsl(247, 100%, 90%)',
        text : 'hsl(247, 100%, 30%)',
    },
    sample : {
        background : 'hsl(38, 100%, 90%)',
        text : 'hsl(38, 100%, 30%)',
    },
    length : 13
}

// .tagLists in other words is group of where innertext will generate background and text color.
// this elems can be 1 or more group
const groupOfTagListsElems = document.querySelectorAll('.tagLists');


const inputText = () => {
    // Get text from input
    const text = document.querySelector('.sampletext').value;
    groupOfTagListsElems[0].innerText = text;

    // Styling when typing comma (separate word)
    if(text[text.length - 1] === ','){
        stylingTags();
    }
}



if(window.location.href.split('/')[4] === 'stylingtag'){
    // custom input
    const colorTagBG = document.getElementById('colorTagBG');
    const colorTagText = document.getElementById('colorTagText');
    const nameTag = document.getElementById('nameTag');
    const submitBtn = document.getElementById('submitBtn');
    let customName = '';
    let customColorBG = 'hsl(0, 0%, 0%)';
    let customColorText = 'hsl(0, 0%, 0%)';

    // calc luminance
    let L1, L2;

    /**
     * Convert Hex code to RGB then calculate RGB to Luminance value
     * @param {*} H is Hex code in string type
     * @returns 
     */
    const hex2rgb2lumen = H => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(H);
        result = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

        let arrRgb = Object.values(result);
        let [lumR, lumG, lumB] = arrRgb.map(component => {
            let proportion = component / 255;
    
            return proportion <= 0.03928
                ? proportion / 12.92
                : Math.pow((proportion + 0.055) / 1.055, 2.4);
        });

        return (0.2126 * lumR) + (0.7152 * lumG) + (0.0722 * lumB);
    }

    /**
     * Convert Hex code to HSL value.
     * @param {*} H is Hex code in string type
     * @returns 
     */
    const hexToHSL = H => {
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
    
        if(h < 0){
            h += 360;
        }
    
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(0);
        l = +(l * 100).toFixed(0);
    
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    const calcRatio = (l1 = '#000000', l2 = '#000000') => {
        let lumen1 = hex2rgb2lumen(l1);
        let lumen2 = hex2rgb2lumen(l2);
        let contrastRatioValue = 1;

        let lighterLum = Math.max(lumen1, lumen2);
        let darkerLum = Math.min(lumen1, lumen2);
    
        contrastRatioValue = ((lighterLum + 0.05) / (darkerLum + 0.05)).toFixed(2);
        document.querySelector('#ratioValue').innerHTML = contrastRatioValue;
        if(contrastRatioValue < 3.0){
            throw Error(`Contrast ratio is ${contrastRatioValue} bad for read. Color didn't add to color set, Please select new pair color.`);
        }
    }


    nameTag.addEventListener('input', e => {
        customName = e.target.value;
    });
    colorTagBG.addEventListener('input', e => {
        L1 = e.target.value;
    });
    colorTagText.addEventListener('input', e => {
        L2 = e.target.value;
    });
    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        // if L1 and L2 undefined it's mean not set at input tag, L1 and L2 will set black color.
        try{
            if(L1 === undefined){
                L1 = '#000000';
            } else {
                customColorBG = hexToHSL(L1);
            }
            if(L2 === undefined){
                L2 = '#000000';
            } else {
                customColorText = hexToHSL(L2);
            }
            // If use default black color it will throw and catch error because contrast ratio is less than 3.0.
            calcRatio(L1, L2);
        } catch(e) {
            alert(e);
            throw Error(e);
        }

        // If contrast ratio more than 3.0 set new paire color.
        try{
            // If key name not set the new key will set 'custom name' instead.
            if(customName === '' || customName === undefined){
                throw new Error();
            }
        } catch {
            alert('Tag name is empty so key name will be \'custom name\'');
            customName = 'custom name';
        }

        // If the key name doesn't exist then add and increase length.
        if(!COLORTAGS.hasOwnProperty(customName)){
            COLORTAGS[customName] = {};
            COLORTAGS.length++;
        }

        // Add new properties of color at key name.
        COLORTAGS[customName].background = customColorBG;
        COLORTAGS[customName].text = customColorText;

        // Stying
        stylingTags();
    });
}

const getTextInTagListsToArray = () => {
    return [...groupOfTagListsElems].map(tagUL => {
        return tagUL.innerText.split(',').map((text, i) => {
            // trim white space left and right of text
            return text.trim();
        }).filter(e => e.length > 0);
    });
}

const stylingTags = () => {
    // filter key length out
    let keysColorInSet = Object.keys(COLORTAGS).filter(e => e !== 'length');
    // change to lowercase
    keysColorInSet = keysColorInSet.map(e => { return e.toLowerCase() });

    // get text in class .tagLists to array
    let arrayOfTextInTagLists = getTextInTagListsToArray();

    // iteration each element .tagLists group
    for(let i = 0; i < groupOfTagListsElems.length; i++){
        // first clear every tag inside for push new element of text include background and text colored, therefore texts will generate randomly new color always.
        groupOfTagListsElems[i].innerHTML = '';

        // iteration each item in each .tagLists group
        for(let j = 0; j < arrayOfTextInTagLists[i].length; j++){
            // append current text to own group by attach into list element (can change to another then adjust to style)
            groupOfTagListsElems[i].appendChild(document.createElement('li')).innerText = arrayOfTextInTagLists[i][j];

            // styling color for current text
            const textItem = groupOfTagListsElems[i].childNodes[j];
            // set class attribute
            textItem.setAttribute('class', 'stylingTags');

            // iteration find text in COLORTAG if match use color in COLORTAG if not use random color
            for(let k = 0; k < COLORTAGS.length; k++){
                if(textItem.innerText.toLowerCase() === keysColorInSet[k]){
                    textItem.style.backgroundColor = COLORTAGS[keysColorInSet[k]].background;
                    textItem.style.color = COLORTAGS[keysColorInSet[k]].text;
                }
                if(!keysColorInSet.includes(textItem.innerText.toLowerCase())){
                    let randomColor = Math.floor(Math.random() * 360);
                    textItem.style.backgroundColor = `hsl(${randomColor}, 100%, 90%)`;
                    textItem.style.color = `hsl(${randomColor}, 100%, 20%)`;
                }
            }
        }
    }
}

stylingTags();