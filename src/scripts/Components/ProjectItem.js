const ProjectItem = item => {
  return `<div class="project-item col-12 col-md-4">
  <a href="${item.link === undefined ? `./playground/${item.name}/index.html` : item.link}" target="_blank" class="project-link">
      <img src="./src/img/cover/${item.name}.jpg" class="project-image" alt="${item.name}">
  </a>
  <h3 class="project-title">${item.title}</h3>
  <div class="project-detail">${item.info}</div>
  <p class="tagLists">${item.tags}</p>
  </div>`
}

export default ProjectItem;
