/**
 * 
 * @param {*} tag string
 * @param {*} className string
 * @param {*} id string
 * @param {*} attr [ [ key, value ], [ ] ]
 */
export const createNewElement = (tag, text = null, attr = [], childs = []) => {
    try {
        if (typeof attr !== 'object') throw Error(`Expected [ [key, value] ] but ${typeof attr}`)
        const elem = document.createElement(tag)
        if (attr.length > 0) {
            attr.forEach((obj, i) => {
                if (/^class(name|list)?$/i.test(obj[0])) elem.classList = obj[1]
                elem.setAttribute(obj[0], obj[1])
            })
        }
        if (text) {
            elem.innerText = text
        }
        if (childs.length > 0) {
            childs.forEach(child => {
                elem.appendChild(child)
            })
        }
        return elem
    } catch (err) {
        console.error(err)
    }
}