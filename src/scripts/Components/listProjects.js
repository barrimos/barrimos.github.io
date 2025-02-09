const liProjects = (project, _ = './') => {
    return `<li class="list-item list-treeview">
        ${project.status !== 'online'
            ? `<a href="#" class="nav-link" title="${project.title}" data-page="${project.name}">`
            : `<a href="../../playground/${project.name}/index.html" class="nav-link" title="${project.title}" data-page="${project.name}">`
        }
        <div class="nav-icon">
        <img src="${_}src/img/icon/${project.name}.png" alt="${project.alt}">
        </div>
        <span class="nav-text">${project.title}</span>
        </a>
    </li>`
}

export default liProjects