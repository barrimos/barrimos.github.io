const btn = document.getElementById('toggleBrightDark');
const sunMoon = document.getElementById('sunMoon');

async function getClassNameToConvert(){
  try{
    const response = await fetch('../../src/data/switchColor.json');
    const jsonData = await response.json();
    return Promise.resolve(jsonData);
  } catch(error){
    console.error('Error fetching JSON:', error);
    return Promise.reject(error);
  }
}
const promise = getClassNameToConvert();


btn.addEventListener('click', e => {

  if(!e.target.checked){
    // invert for icon swtich from moon to sun
    sunMoon.classList.remove('active');

    // invert body background color
    document.body.style.transition = 'ease-in-out .2s';
    document.body.style.backgroundColor = '';

    // invert topnav and logo
    document.querySelector('#topNav-section').style.backgroundColor = 'hsl(0, 0%, 99%)';
    document.querySelector('.topLogo').children[0].src = '../../src/img/icon/zmlogo-page-15.png';

    // invert elements
    promise.then(item => {
      item.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(elem => {
          elem.classList.remove('invert');
        });
      });
    });
  } else {
    // invert for icon swtich from sun to moon
    sunMoon.classList.add('active');

    // invert body background color
    document.body.style.transition = 'ease-in-out .2s';
    document.body.style.backgroundColor = '#222';

    // invert topnav and logo
    document.querySelector('#topNav-section').style.backgroundColor = '#222';
    document.querySelector('.topLogo').children[0].src = '../../src/img/icon/zmlogo-page-16.png';

    // invert elements
    promise.then(item => {
      item.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(elem => {
          elem.classList.add('invert');
        });
      });
    });
  }
});