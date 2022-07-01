var curPage = 0;
var page = document.querySelectorAll(".page");
function nextPage(){
    curPage++;
    if(page.length > curPage){
        document.querySelector(".show").classList.remove("show");
        page[curPage].classList.add("show");
    }
}
function prevPage(){
    curPage--
    if(page.length > curPage){
        document.querySelector(".show").classList.remove("show");
        page[curPage].classList.add("show");
    }
}
let btnsave = document.getElementById('finished');
btnsave.onclick = function store(){
    var hbd = [
        month = document.getElementById('M').value,
        day = document.getElementById('D').value,
        year = document.getElementById('Y').value,
        name = document.getElementById('N').value,
        height = document.getElementById('H').value,
        weight = document.getElementById('W').value,
        time = document.getElementById('T').value
    ];
    
    // if(hbd[0] == ""){
    //     alert("month field cannot be empty.");
    //     return false;
    // }
    // if(hbd[1] == ""){
    //     alert("day field cannot be empty.");
    //     return false;
    // }
    // if(hbd[2] == ""){
    //     alert("year field cannot be empty.");
    //     return false;
    // }
    if(hbd[3] == ""){
        alert("name field cannot be empty.");
        return false;
    }
    // if(hbd[4] == ""){
    //     alert("height field cannot be empty.");
    //     return false;
    // } else if(hbd[4] > 220){
    //     alert("The height value entered is too large.")
    //     return false;
    // }
    // if(hbd[5] == ""){
    //     alert("weight field cannot be empty.");
    //     return false;
    // } else if(hbd[5] > 150){
    //     alert("The weight value entered is too large.")
    //     return false;
    // }
    // if(hbd[6] == ""){
    //     alert("time field cannot be empty.");
    //     return false;
    // }


    sessionStorage.setItem("hbd", JSON.stringify(hbd));
    var hbditems = JSON.parse(sessionStorage.getItem("hbd"));
    // console.log(hbditems);
    // var intM = parseInt(hbditems[0]);
    // var intD = parseInt(hbditems[1]);
    // var intY = parseInt(hbditems[2]);
    var strName = hbditems[3];
    // var intH = parseInt(hbditems[4]);
    // var intW = parseInt(hbditems[5]);
    // var intT = parseInt(hbditems[6]);
    // var Score = 418;
    var Score = Math.floor(Math.random() * 10000) + 1;
    var pattern = /[4]{1}[8]{1}/;
    var regScore = pattern.test(Score);
    // console.log(Score);
    // var Score = Math.floor((Math.random() * 10000) + 1 + (intM * intH - intD - intY - intW - intT));
    var blackSheep = document.getElementById('blackSheep');
    var studentCounsil = document.getElementById('studentCounsil');
    var navBS = document.getElementById('navBS');
    var bgNav = document.getElementById('finalbgNav');
    var BSbg = document.getElementById('finalP');
    var finalName = document.getElementById('finalName');
    var BSBlack = [
        finalHeadC = document.getElementById('headFinalC'),
        finalHeadR = document.getElementById('headFinalR'),
        finalHeadY = document.getElementById('headFinalY'),
        finalClass = document.getElementById('finalClass'),
        finalRack = document.getElementById('finalRank'),
        finalYear = document.getElementById('finalYear'),
        StudentS = document.getElementById('ss')
    ]
    if(regScore){
        fName = strName;
        fRank = 180;
        fClass = "F";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Score;
        blackSheep.src = "assets/icon/banner-02.png";
        blackSheep.classList.add("secret");
        navBS.src = 'assets/icon/nav-11.png';
        bgNav.style.backgroundImage = "linear-gradient(to right, #b8036c, #bb46bb, #ffbcb7)";
        BSbg.style.backgroundImage = "url(assets/img/bg3-04.jpg)";
        finalName.style.color = "rgb(145, 0, 7)";
        BSBlack[0].style.color = "rgb(145, 0, 7)";
        BSBlack[1].style.color = "rgb(145, 0, 7)";
        BSBlack[2].style.color = "rgb(145, 0, 7)";
        BSBlack[3].style.color = "rgb(145, 0, 7)";
        BSBlack[4].style.color = "rgb(145, 0, 7)";
        BSBlack[5].style.color = "rgb(145, 0, 7)";
        BSBlack[6].style.color = "rgb(145, 0, 7)";
    } else if(Score == 9000 || Score == 9048 || Score == 9148 || Score == 9248 || Score == 9348 || Score == 9448 || Score == 9548 || Score == 9648 || Score == 9748 || Score == 9948 || Score == 9480){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 1;
        fClass = "A";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Score;
        studentCounsil.src = "assets/icon/banner-03.png";
        studentCounsil.classList.add("secret");
    } else if(Score < 4000){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 151;
        fClass = "F";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Math.floor(Math.random() * 1199) + 2000;
    } else if(Score > 4000 && Score <= 5200){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 121;
        fClass = "E";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Math.floor(Math.random() * 1199) + 4001;
    } else if(Score > 5200 && Score <= 6400){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 91;
        fClass = "D";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Math.floor(Math.random() * 1199) + 5201;
    } else if(Score > 6400 && Score <= 7600){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 61;
        fClass = "C";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Math.floor(Math.random() * 1199) + 6401;
    } else if(Score > 7600 && Score <= 8800){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 31;
        fClass = "B";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Math.floor(Math.random() * 1199) + 7601;
    } else if(Score > 8800){
        fName = strName;
        fRank = Math.floor(Math.random() * 29) + 2;
        fClass = "A";
        fYear = Math.floor(Math.random() * 6) + 1;
        fScore = Math.floor(Math.random() * 1199) + 8801;
    } else {
        fName = "n/a";
        fRank = "n/a";
        fClass = "n/a";
        fYear = "n/a";
        fScore = "n/a";
    }
    document.getElementById('finalName').innerHTML = fName;
    document.getElementById('finalClass').innerHTML = fClass;
    document.getElementById('finalRank').innerHTML = fRank;
    document.getElementById('finalYear').innerHTML = fYear;
    document.getElementById('finalScore').innerHTML = fScore;
    // console.log(fScore);
    nextPage();
}
//--------preview IMG-----------------------
var loadFile = function(event) {
    var output = document.getElementById('realPro');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
};
//--------preview IMG-----------------------


//--------html2canvas-----------------------
// function screenShot(){
//     html2canvas(document.querySelector("#finalP")).then(canvas => {
//         document.body.appendChild(canvas);
//     });
// }
// document.getElementById("saveAs").addEventListener("click", function() {

//     html2canvas(document.querySelector('#finalP')).then(function(canvas) {

//         console.log(canvas);
//         saveAs(canvas.toDataURL(), 'yourIDcard.png');
//     });
// });
// function saveAs(uri, filename) {

//     var link = document.createElement('a');

//     if (typeof link.download === 'string') {

//         link.href = uri;
//         link.download = filename;

//         //Firefox requires the link to be in the body
//         document.body.appendChild(link);

//         //simulate click
//         link.click();

//         //remove the link when done
//         document.body.removeChild(link);

//     } else {

//         window.open(uri);

//     }
// }
//--------html2canvas-----------------------