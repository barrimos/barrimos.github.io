"use strict"

import { createNewElement } from './createNewElement.js'

let d = new Date
const today = document.querySelector('#today')
today.innerText = d.toLocaleDateString()

// add to-do item
const inpItem = document.querySelector('#itemTodo')
const addBtn = document.querySelector('#addBtn')
const ulist = document.querySelector('.ulist')
const saveListsBtn = document.querySelector('#saveListsBtn')
const clearListsBtn = document.querySelector('#clearListsBtn')
const showArchiveBtn = document.querySelector('#showArchiveBtn')
const tableTasks = document.querySelector('#tableTasks')
const archiveTable = document.querySelector('#archiveTable')
const tableTasksBody = document.querySelector('#tableTasksBody')
const closeAchiveBtn = document.querySelector('#closeAchiveBtn')
const sortTableTaskBtn = document.querySelector('#sortTableTaskBtn')
const clearTableTaskBtn = document.querySelector('#clearTableTaskBtn')
const reloadTableTask = document.querySelector('#reloadTableTask')

const errorInp = document.querySelector('#errorInp')
const pattern = /[@#$%^(){}=]/g

const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent)

let tid = 0
let countTasks = 0

const hoverEffect = elem => {
    if (!isMobileDevice) elem.classList.add('hover')
}

const resetEmptyLists = () => {
    ulist.innerHTML += '<div class="mty">Empty list</div>'
}

const closeTableTask = () => {
    archiveTable.classList.remove('active')
}

const checkDone = (elem, targetElem) => {
    elem.addEventListener('input', e => {
        if (e.target.checked) targetElem.classList.add('done')
        else targetElem.classList.remove('done')
    })
}

const removeItem = removeBtnElem => {
    removeBtnElem.addEventListener('click', e => {
        ulist.removeChild(e.target.parentElement.parentElement)
        if (ulist.children.length === 0) resetEmptyLists()
        countTasks--
        localStorage.removeItem(e.target.parentElement.parentElement.dataset.tid)
    })
}

const checkTaskDone = (checkboxInp, listElem, taksName) => {
    checkboxInp.addEventListener('click', e => {
        if (e.target.checked) {
            const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            const created = formatTime(Number(listElem.dataset.created))
            const now = Date.now()
            const done = formatTime(now)
            const tr = `<tr data-tid=${e.target.dataset.tid}>
                <td class="taskname">${taksName}</td>
                <td>${created}</td>
                <td>${done}</td>
            </tr>`
            tableTasksBody.innerHTML += tr
            listElem.dataset.done = now
            const elemTid = JSON.parse(localStorage.getItem(e.target.dataset.tid))
            elemTid[2] = done
            localStorage.setItem(e.target.dataset.tid, JSON.stringify(elemTid))
        } else {
            tableTasksBody.removeChild(document.querySelector(`tr[data-tid="${e.target.dataset.tid}"]`))
        }
    })
}

const sortTable = () => {
    const rows = Array.from(tableTasks.querySelectorAll('#tableTasksBody tr'))

    rows.sort((a, b) => {
        const taskA = a.querySelector('.taskname').textContent.toLowerCase()
        const taskB = b.querySelector('.taskname').textContent.toLowerCase()
        return taskA.localeCompare(taskB)
    })

    // Append rows in sorted order
    rows.forEach(row => tableTasksBody.appendChild(row))
}

const confirmClear = e => {
    return new Promise((resolve, reject) => {
        if (e) {
            reloadTableTask.querySelector('#reload').classList.add('ing')
            reloadTableTask.classList.add('open')
            setTimeout(() => {
                resolve(e)
            }, 2000)
        } else {
            reject(false)
        }
    })
}

const saveToStorage = (tid, data) => {
    localStorage.setItem(tid, JSON.stringify(data))
}

document.addEventListener('DOMContentLoaded', () => {
    if (!archiveTable) return // Safeguard against missing elements

    const toggleActiveClass = () => {
        if (window.innerWidth > 768) {
            archiveTable.classList.add('active')
            archiveTable.classList.remove('bg')
        } else {
            archiveTable.classList.remove('active')
            closeTableTask()
        }
    }

    // Initial check on page load
    toggleActiveClass()

    // Listen for window resize
    window.addEventListener('resize', toggleActiveClass)
})

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') addBtn.click()
})

inpItem.addEventListener('focus', e => {
    errorInp.innerText = ''
})

inpItem.addEventListener('keypress', e => {
    if (e.target.value.length > 20) e.preventDefault()
})

addBtn.addEventListener('click', async () => {
    try {
        if (!inpItem.value || inpItem.value.trim() === '') throw Error('Your input is invalid try again')
        if (pattern.test(inpItem.value)) throw Error('Excepted @#$%^(){}=')
        if (countTasks >= 20) throw Error('Cannot add tasks anymore')
        tid++
        countTasks++

        d = new Date()
        const h = String(d.getHours()).padStart(2, '0')
        const m = String(d.getMinutes()).padStart(2, '0')
        const s = String(d.getSeconds()).padStart(2, '0')

        if (ulist.firstElementChild.tagName === 'DIV') ulist.removeChild(ulist.children[0])

        const checkboxList = await createNewElement('input', null, [['class', 'checkListBox'], ['data-tid', tid], ['type', 'checkbox']])
        const spanText = await createNewElement('span', inpItem.value, [['class', 'textList']])
        const wrapper1 = await createNewElement('div', null, [['class', 'sv045g2']], [checkboxList, spanText])
        const createTime = await createNewElement('span', `created ${h} : ${m} : ${s}`, [['class', 'timeCreateList']])
        const removeBtn = await createNewElement('button', '🗑️', [['class', 'removeBtn'], ['type', 'button'], ['data-tid', tid]])
        const wrapper2 = await createNewElement('div', null, [['class', 'sv045g2']], [createTime, removeBtn])
        const li = await createNewElement('li', null, [['class', 'listTodo w-100'], ['data-tid', tid], ['data-created', d.getTime()], ['data-done', '']], [wrapper1, wrapper2])

        await checkDone(checkboxList, li)
        await removeItem(removeBtn)
        await checkTaskDone(checkboxList, li, inpItem.value)
        await hoverEffect(li)
        
        if (ulist.children.length > 0 && ulist.lastElementChild.classList.contains('latest')) {
            ulist.lastElementChild.classList.remove('latest')
        }
        
        await saveToStorage(tid, [d.getTime(), inpItem.value])
        await ulist.appendChild(li)
        li.classList.add('latest')
        inpItem.focus()
    } catch (err) {
        errorInp.innerText = err
        inpItem.blur()
    }
    ulist.scrollTop = ulist.scrollHeight
    inpItem.value = ''
    pattern.lastIndex = 0
})

showArchiveBtn.addEventListener('click', e => {
    if (window.innerWidth < 768) {
        archiveTable.classList.add('active bg')
    } else {
        e.preventDefault()
        return
    }
})

closeAchiveBtn.addEventListener('click', e => {
    if (window.innerWidth < 768) {
        if (archiveTable.classList.contains('active')) {
            closeTableTask()
        }
    } else {
        e.preventDefault()
        return
    }
})

saveListsBtn.addEventListener('click', e => {

})

sortTableTaskBtn.addEventListener('click', e => {
    if (tableTasksBody.children.length <= 1) {
        e.preventDefault()
        return
    }
    sortTable()
})

clearTableTaskBtn.addEventListener('click', e => {
    if (tableTasksBody.children.length < 1) {
        e.preventDefault()
        return
    }
    confirmClear(confirm('Confirm'))
        .catch(err => {
            throw err
        })
        .then(res => {
            tableTasksBody.innerHTML = ''
            reloadTableTask.querySelector('#reload').classList.remove('ing')
            reloadTableTask.classList.remove('open')
        })
        .catch(err => {
            console.log(err)
        })
})

clearListsBtn.addEventListener('click', e => {
    if (ulist.children.length < 1) {
        e.preventDefault()
        return
    }
    ulist.innerHTML = ''
    resetEmptyLists()
    tid = 0
    countTasks = 0
    localStorage.clear()
})