const listSuggestion = (project, _ = './src') => {
    return `<div class="col-6 col-md-12">
        <a href="./playground/${project.name}/index.html" target="_blank" class="project-link">
            <img src="${_}/img/cover/${project.name}.jpg" class="project-image" alt="${project.alt}">
        </a>
    </div>`
}

export default listSuggestion