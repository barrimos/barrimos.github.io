const ProjectItem = (item, new_blank = true) => {
  return `<div class="project-item col-12 col-md-4">
    <div class="project-link" data-project-name=${item.name} data-link=${!item.link ? item.name : item.link}>
        <img src="./src/img/cover/${item.name}.jpg" class="project-image" alt="${item.name}">
        <div class="statusWrapper">
          <span class="${item.status}">${item.status}</span>
          ${item.developing ? `<span class="${item.developing}">${item.developing} project</span>` : ''}
        </div>
    </div>
    <h3 class="project-title">${item.title}</h3>
    <div class="project-detail">${item.info}</div>
    <p class="tagLists">${item.tags}</p>
  </div>`
}

export default ProjectItem;
