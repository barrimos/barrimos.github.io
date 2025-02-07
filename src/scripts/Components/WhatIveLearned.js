/**
 * 
 * @param {*} item 
 * @returns 
 */
const WhatIveLearned = item => {
    return `<div class="col-12 col-md-4 col-xl-3 mt-10">
      <div class="blog-item">
          <a href="./blog/${item.name}/">
              <img class="blogCover" src="./src/img/cover/${item.name}.jpg" alt="${item.name}">
              <div class="blog-info">
                  <h4 class="blog-title">${item.title}</h4>
                  <small class="blog-brief">${item.info}</small>
              </div>
          </a>
          <span class="tagLists">${item.tags}</li></span>
      </div>
    </div>`
}

export default WhatIveLearned