import listProjects from './listProjects.js';

const migrationListProjects = async (_ = './') => {
    const response = await fetch(`${_}src/data/projectItems.json`)
    const projects = await response.json()
    let html = ''
    projects.forEach(project => {
        html += listProjects(project, _)
    })
    return html
}

export default migrationListProjects