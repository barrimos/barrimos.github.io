/**
 * DocsString
 * @param {*} item 
 * @returns 
 */
const BlogItem = item => {
    return `<div class="topic-item" data-item=${item.number}>
        <a href="./blog/${item.name}/" class="topic-link">
            <div class="topic-l">
                <img src="./src/img/cover/${item.name}.jpg" alt="${item.name}" class="topic-cover">
            </div>
            <div class="topic-r">
                <h1>${item.title}</h1>
                <p class="topic-detail">${item.info}</p>
                <small class="topic-date">1 Jan 2025 : Prapas k, Writer</small>
            </div>
        </a>
    </div>`
}

export default BlogItem;