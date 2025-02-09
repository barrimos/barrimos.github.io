"use strict"

import { createNewElement } from './utils/createNewElement.js'

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
const saveTableListsBtn = document.querySelector('#saveTableListsBtn')
const clearTableTaskBtn = document.querySelector('#clearTableTaskBtn')
const reloadTableTask = document.querySelector('#reloadTableTask')

const errorInp = document.querySelector('#errorInp')
const pattern = /[@#$%^(){}=]/g

const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent)

let processing = false
const queue = []

let totalCreatedToday = 0
let countTasks = 0

const generateTid = () => {
	return 'xxxxx-yyyyy'.replace(/[xy]/g, () => {
		return Math.random(255).toString(32).slice(2)[3]
	})
}

const hoverEffect = elem => {
	if (!isMobileDevice) elem.classList.add('hover')
}

const resetEmptyLists = () => {
	ulist.innerHTML += '<div class="mty">Empty list</div>'
}

const closeTableTask = () => {
	archiveTable.classList.remove('active')
}

const displayDoneState = (elem, targetElem) => {
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
		enquere(e.target.parentElement.parentElement.dataset.uuid, deleteItemInStorage)
	})
}

/**
 * 
 * @param {*} timestamp milliseconds
 * @returns 
 */
const convertReadableTime = milliseconds => {
	return new Date(Number(milliseconds)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const addToAchieveDoneTable = async ([uuid, isChecking, listElem, taksName]) => {
	const elemList = getItemFromStorage(uuid)
	if (isChecking) {
		const created = convertReadableTime(Number(listElem.dataset.created))
		const nowMilliseconds = Number(listElem.dataset.done) || new Date().getTime()
		const doneTimestamp = convertReadableTime(nowMilliseconds)
		const tr = `<tr data-uuid=${uuid} data-created=${listElem.dataset.created} data-done=${nowMilliseconds}>
										<td class="taskname" data-task=${taksName}>${taksName}</td>
										<td data-created=${listElem.dataset.created}>${created}</td>
										<td data-done=${nowMilliseconds}>${doneTimestamp}</td>
								</tr>`
		tableTasksBody.innerHTML += tr
		if (!listElem.dataset.done) {
			// add timestamp done
			listElem.dataset.done = nowMilliseconds
			elemList.push(nowMilliseconds)
			enquere([uuid, elemList], updateItemToStorage)
		}
	} else {
		tableTasksBody.removeChild(document.querySelector(`tr[data-uuid="${uuid}"]`))
		
		// remove timestamp done
		listElem.dataset.done = ''
		elemList.pop()
		enquere([uuid, elemList], updateItemToStorage)
	}
}

const checkTaskDone = (checkboxInp, listElem, taksName) => {
	checkboxInp.addEventListener('click', e => {
		const uuid = e.target.dataset.uuid
		enquere([uuid, e.target.checked, listElem, taksName], addToAchieveDoneTable)
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

const enquere = (data, task) => {
	queue.push([data, task])
	if (!processing) dequere()
}

const dequere = async () => {
	if (processing) return

	processing = true
	while (queue.length > 0) {
		const [data, task] = queue.shift()
		if (data && task) {
			console.log(`Processing...${task.name}`)
			await task(data)
		}
	}
	console.log('------All tasks done------')
	processing = false
}

const getCurrTaskInStorage = () => {
	return JSON.parse(localStorage.getItem('lists')) || {}
}

const getItemFromStorage = uuid => {
	const currLists = getCurrTaskInStorage()
	return JSON.parse(currLists[uuid])
}

const saveToStorage = data => {
	localStorage.setItem('lists', JSON.stringify(data))
}

const updateItemToStorage = ([uuid, data]) => {
	const currLists = getCurrTaskInStorage()
	currLists[uuid] = JSON.stringify(data)
	enquere(currLists, saveToStorage)
}

const deleteItemInStorage = uuid => {
	const currLists = getCurrTaskInStorage()
	delete currLists[uuid]
	enquere(currLists, saveToStorage)
}

const resetToEmptyLists = () => {
	ulist.innerHTML = ''
	resetEmptyLists()
	countTasks = 0
	localStorage.removeItem('lists')
}

/**
 * 
 * @param {*} fromListsOrAchieve is select lists that from Achieve table or Lists to-do
 * how difference 
 * - Achieve table: is store only tasks that done
 * - Lists to-do: is whole lists to-do includes done and undone
 */
const saveCsv = ([elem, fromListsOrAchieve]) => {
	let csv = `data:text/csv;charset=utf-8,Today: total create lists,${totalCreatedToday}\r\nCheck,Tasks,Created,Done\r\n`

	elem.map(list => {
		if (fromListsOrAchieve === 'lists') {
			csv += list.querySelector('.checkListBox').checked + ','
			csv += list.querySelector('.textList').innerText + ','
			csv += convertReadableTime(list.dataset.created) + ','
			csv += `${list.dataset.done ? convertReadableTime(list.dataset.done) : ','}` + '\r\n'
		} else if (fromListsOrAchieve === 'achieve') {
			csv += true + ','
			csv += list.querySelector('td[data-task]').innerText + ','
			csv += convertReadableTime(list.dataset.created) + ','
			csv += convertReadableTime(list.dataset.done) + '\r\n'
		}
	})

	const encodedUri = encodeURI(csv)
	const link = document.createElement('a')
	link.setAttribute('href', encodedUri)
	link.setAttribute('download', `todolist-${fromListsOrAchieve}-${new Date().toLocaleDateString()}.csv`)
	document.body.appendChild(link)

	link.click()
	URL.revokeObjectURL(link.href)
}

const createNewListItem = async (newTodo, uuid) => {
	totalCreatedToday++
	countTasks++

	d = new Date()

	const checkboxList = await createNewElement('input', null, [['class', 'checkListBox'], ['data-uuid', uuid], ['type', 'checkbox']])
	const spanText = await createNewElement('span', newTodo, [['class', 'textList']])
	const wrapper1 = await createNewElement('div', null, [['class', 'sv045g2']], [checkboxList, spanText])
	const createTime = await createNewElement('span', `created ${convertReadableTime(d.getTime())}`, [['class', 'timeCreateList']])
	const removeBtn = await createNewElement('button', '🗑️', [['class', 'removeBtn'], ['type', 'button'], ['data-uuid', uuid]])
	const wrapper2 = await createNewElement('div', null, [['class', 'sv045g2']], [createTime, removeBtn])
	const li = await createNewElement('li', null, [['class', 'listTodo w-100'], ['data-uuid', uuid], ['data-created', d.getTime()], ['data-done', '']], [wrapper1, wrapper2])

	await displayDoneState(checkboxList, li)
	await removeItem(removeBtn)
	await checkTaskDone(checkboxList, li, newTodo)
	await hoverEffect(li)

	return li
}

const loadCache = async () => {
	try {
		const cacheLists = getCurrTaskInStorage()
		if (Object.keys(cacheLists).length > 0) {
			if (ulist.firstElementChild.tagName === 'DIV') ulist.removeChild(ulist.children[0])
			for (let key in cacheLists) {
				const data = JSON.parse(cacheLists[key])
	
				// validate
				if (!data[1] || data[1].trim() === '') throw Error('Your input is invalid try again')
				if (pattern.test(data[1])) throw Error('Excepted @#$%^(){}=')
	
				const cacheListsItem = await createNewListItem(data[1], key)
				cacheListsItem.querySelector('.timeCreateList').innerText = `created ${convertReadableTime(data[0])}`
				cacheListsItem.dataset.created = data[0]
				if (data[2]) {
					cacheListsItem.dataset.done = data[2]
					cacheListsItem.querySelector('.checkListBox').checked = true
	
					await enquere([key, true, cacheListsItem, data[1]], addToAchieveDoneTable)
				}
				await ulist.appendChild(cacheListsItem)
			}
		}
	} catch (err) {
		console.error(`Error to load old to-do lists: ${err}`)
	}
}

document.addEventListener('DOMContentLoaded', async () => {
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

	// load cache
	await loadCache()

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
		if (countTasks >= 20) throw Error('Cannot add tasks anymore')
		const uuid = generateTid()
		const newListItem = await createNewListItem(inpItem.value, uuid)

		if (ulist.firstElementChild.tagName === 'DIV') ulist.removeChild(ulist.children[0])

		// save every single list that added
		await enquere([uuid, [d.getTime(), inpItem.value]], updateItemToStorage)
		localStorage.setItem('total', totalCreatedToday)

		// adding to lists to-do
		await ulist.appendChild(newListItem)

		// animation show latest list
		newListItem.classList.add('latest')
		setTimeout(() => {
			newListItem.classList.remove('latest')
		}, 500)

		// easily to adding new list with focus at input
		inpItem.focus()
	} catch (err) {
		console.error(err)
		errorInp.innerText = err
		inpItem.blur()
	}
	ulist.scrollTop = ulist.scrollHeight
	inpItem.value = ''
	pattern.lastIndex = 0
})

showArchiveBtn.addEventListener('click', e => {
	e.preventDefault()
	if (window.innerWidth < 768) {
		archiveTable.classList.add('active')
		archiveTable.classList.add('bg')
	} else {
		return
	}
})

saveListsBtn.addEventListener('click', e => {
	e.preventDefault()

	// if list empty
	if (ulist.children[0].classList.contains('mty')) return
	enquere([Array.from(ulist.children), 'lists'], saveCsv)
})

closeAchiveBtn.addEventListener('click', e => {
	e.preventDefault()
	if (window.innerWidth < 768) {
		if (archiveTable.classList.contains('active')) {
			closeTableTask()
		}
	} else {
		return
	}
})

saveTableListsBtn.addEventListener('click', e => {
	e.preventDefault()
	if (!tableTasksBody.children.length) return

	enquere([Array.from(tableTasksBody.children), 'achieve'], saveCsv)
})

sortTableTaskBtn.addEventListener('click', e => {
	e.preventDefault()
	if (tableTasksBody.children.length <= 1) {
		return
	}
	enquere(true, sortTable)
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
			// clear in lists to-do
			Array.from(tableTasksBody.childNodes).map(item => {
				if (document.querySelector(`.listTodo[data-uuid="${item.dataset.uuid}"]`)) {
					document.querySelector(`.listTodo[data-uuid="${item.dataset.uuid}"]`).remove()

					// clear in storage
					enquere(item.dataset.uuid, deleteItemInStorage)
				}
			})

			// clear in done table
			tableTasksBody.innerHTML = ''
			reloadTableTask.querySelector('#reload').classList.remove('ing')
			reloadTableTask.classList.remove('open')

			// if after clear and no one list remaining back to show empty display
			if (!ulist.children.length) enquere(true, resetToEmptyLists)
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
	enquere(true, resetToEmptyLists)
})