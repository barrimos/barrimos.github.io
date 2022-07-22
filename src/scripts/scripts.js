const backgroundProject = () => {
    const elemsProjects = document.querySelectorAll('.projectLink')
    for(let i = 0; i < elemsProjects.length; i++){
        const projectsName = document.querySelectorAll('.projectLink')[i].attributes.name.value;
        if(elemsProjects[i].hasAttribute('src')){
            elemsProjects[i].setAttribute('src', `./src/img/${projectsName}.jpg`);
        } else {
            elemsProjects[i].style.backgroundImage = `url(./src/img/${projectsName}.jpg)`;
            elemsProjects[i].style.backgroundRepeat = 'no-repeat';
            elemsProjects[i].style.backgroundPosition  = 'top center';
            elemsProjects[i].style.backgroundSize   = 'cover';
        }
    }
}
backgroundProject();

let openModal = false;
const selCert = document.getElementsByClassName('modalEnlarge')[0];
const srcModalImg = document.getElementsByClassName('enlargeImg')[0];

const enlarge = (e) => {
    selCert.style.display = 'flex';
    srcModalImg.setAttribute('src', `./src/img/${e.name}.jpg`);
    document.getElementsByTagName("BODY")[0].style.overflow = 'hidden';
    openModal = true;
}

const closeModal = () => {
    if(openModal){
        selCert.style.display = 'none';
        srcModalImg.setAttribute('src', '#');
        document.getElementsByTagName("BODY")[0].style.overflow = '';
        openModal = false;
    } else {
        return;
    }
}