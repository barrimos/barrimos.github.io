/**
 * DocsString
 * @param {*} item 
 * @returns 
 */
const ProjectItem = (item, new_blank = true) => {
  return `<div class="project-item col-12 col-md-4">
    <a href="${item.link === null ? `./playground/${item.name}/index.html` : item.link}" ${new_blank ? 'target="_blank"' : ''} class="project-link">
        <img src="./src/img/cover/${item.name}.jpg" class="project-image" alt="${item.name}">
    </a>
    <h3 class="project-title">${item.title}</h3>
    <div class="project-detail">${item.info}</div>
    <p class="tagLists">${item.tags}</p>
  </div>`
}

export default ProjectItem;
