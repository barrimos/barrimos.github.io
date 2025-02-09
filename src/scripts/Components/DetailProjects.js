const checkImageExists = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);  // Image exists
    img.onerror = () => resolve(false); // Image not found
  });
};

const loadImages = async (name) => {
  let elem = ''
  let i = 1;
  while (i <= 10) {
    const imgSrc = `./src/img/snapshot/${name}/${name}-snapshot-${i}.jpg`;
    
    const exists = await checkImageExists(imgSrc);
    if (!exists) break;  // Stop loop if image is missing

    console.log(`Loading image: ${name}-snapshot-${i}`);
    
    // Append the image to the page
    const imgElement = document.createElement("img");
    imgElement.classList.add('snapshotImg')
    imgElement.src = imgSrc;

    const div = document.createElement('div');
    div.classList.add('snapshotItem');
    div.setAttribute('data-item', i);
    div.appendChild(imgElement);

    elem += div.outerHTML

    i++;
  }
  return elem
}


const DetailProjects = async item => {
  const snapImg = await loadImages(item.name)

  return `<div class="descriptionDetail">
    <div class="detailTopHeadWrapper">
      <div class="topHead">
        <h2 class="projectName">${item.title}</h2>
        ${item.status !== 'online'
          ? ''
          : `<a class="linkToProjectBtn" href=${!item.link ? `./playground/${item.name}/index.html` : item.link} target="_blank">Go to project</a>`
        }
      </div>
      <div class="detailTimePerior">
        Time period: ${item.timeperiod}
      </div>
    </div>
    <div class="snapshotWrapper">${snapImg}</div>
    ${item.detail ? `<p>${item.detail}</p>` : ''}
  </div>`
}

export default DetailProjects