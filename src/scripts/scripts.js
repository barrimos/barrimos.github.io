const backgroundProject = () => {
    const elemsProjects = document.querySelectorAll('.projectLink')
    for(let i = 0; i < elemsProjects.length; i++){
        const projectsName = document.querySelectorAll('.projectLink')[i].attributes.name.value;
        if(elemsProjects[i].hasAttribute('src')){
            elemsProjects[i].setAttribute('src', `./src/img/${projectsName}.jpg`);
        }
        elemsProjects[i].style.backgroundImage = `url(./src/img/${projectsName}.jpg)`;
        elemsProjects[i].style.backgroundRepeat = 'no-repeat';
        elemsProjects[i].style.backgroundPosition  = 'top center';
        elemsProjects[i].style.backgroundSize   = 'cover';
    }
}
backgroundProject();