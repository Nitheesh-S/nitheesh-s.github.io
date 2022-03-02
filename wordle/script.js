import '/style/wordle.css'
import dictionary from '/wordle/five_letter_words.js'
import { updateStatsUI, getCharStats, getProbabilityStats } from '/wordle/stats.js'

const colorsOrder = ['GREY', 'YELLOW', 'GREEN']

colorsOrder.next = function(value) {
    let position = (this.indexOf(value) + 1) % this.length
    return this[position]
}

const wordleContainerEl = document.querySelector('.wordle-container')
const wordleEl = wordleContainerEl.querySelector('.wordle')
const wordleKeyboardEl = wordleContainerEl.querySelector('.wordle-keyboard')
const probabilityContainerEl = document.querySelector('.probability-container')
const closeProbabilityEl = probabilityContainerEl.querySelector('.close')
const probabilityOutputEls = probabilityContainerEl.querySelectorAll('.probability-output li')
const probabilityInputEl = document.querySelector('.probability-input');
const probabilityInputEls = probabilityInputEl.querySelectorAll('li');
let tries = []

const getProbabilityPosition = el => parseInt(el.dataset.probabiltyId) - 1

const updateProbabilityUI = () => {
	let validTries = getValidTries(tries)

	const stats = getCharStatsFromTries(validTries)

	let activeProbabilityInput = probabilityInputEl.querySelector('li.active')
	let position = getProbabilityPosition(activeProbabilityInput)
	let statsUIData = getProbabilityStats(position, stats)
	updateStatsUI(statsUIData, probabilityOutputEls)
}

const getGreenRegExp = tries => {
	let greenList = new Array(5).fill('.')

	tries.forEach(attempt => {
		attempt.forEach((charDetail, i) => {
			if(charDetail.color != 'GREEN') return
			greenList[i] = charDetail.char
		})
	})

	return new RegExp(`^${greenList.join('')}$`)
}

const getYellowPositionRegExp = tries => {
	let yellowList = new Array(5).fill('.')
	tries.forEach(attempt => {
		attempt.forEach((charDetail, i) => {
			if(charDetail.color != 'YELLOW') return
			if(yellowList[i] == '.') yellowList[i] = ''

			yellowList[i] += charDetail.char
		})
	})
	let yellowPattern = yellowList.map(x => {
		if(x == '.') return x
		return `[^${x}]`
	}).join('')

	return new RegExp(`^${yellowPattern}$`)
}

const getYellowCharSet = tries => {
	let yellowCharSet = tries.flat().reduce((prev, curr) => {
		if(curr.color != 'YELLOW') return prev
		
		prev.add(curr.char)
		return prev
	}, new Set())
	return yellowCharSet
}

const getGreyRegExp = tries => {
	let greyCharSet = new Set()
	let greenCharSet = new Set()

	tries.flat().forEach(charDetail => {
		if(charDetail.color == 'GREY')
			greyCharSet.add(charDetail.char)
		if(charDetail.color == 'GREEN')
			greenCharSet.add(charDetail.char)
	})
	let greyChars = [...greyCharSet].filter(c => !greenCharSet.has(c))
	return new RegExp(`[${greyChars.join('')}]`)
}

const filterWords = (tries) => {
	if(!tries.length) return dictionary
	const greenRegExp = getGreenRegExp(tries)
	const greyRegExp = getGreyRegExp(tries)
	const yellowCharSet = getYellowCharSet(tries)
	const yellowPositionRegExp = getYellowPositionRegExp(tries)

	return dictionary.filter(word => {
		if(greyRegExp.test(word)) return false
		if(!greenRegExp.test(word)) return false
		if(!yellowPositionRegExp.test(word)) return false
		if(![...yellowCharSet].every(c => word.includes(c))) return false
			
		return true
	})
}

const getTries = (tries, key) => {
	if(key == 'backspace') {
		if(!tries.length) return tries

		if(tries[tries.length - 1].length == 1) {
			tries.pop()
			return tries
		}

		tries[tries.length - 1].pop()
		return tries
	}

	// tried all attempts in wordle
	if(tries.length >= 6 && tries[5].length == 5)
		return tries

	if(!tries.length || tries[tries.length - 1].length == 5)
		tries.push([])
	
	let char = {
		char: key,
		color: 'GREY'
	}

	let currentIndex = tries[tries.length - 1].length
	for(let attempt of tries) {
		if(attempt[currentIndex]?.char == key)
			char['color'] = attempt[currentIndex].color
	}

	tries[tries.length - 1].push(char)
	return tries
}

const resetLi = (el) => {
	el.dataset.color = ''
	el.textContent = ''
}

const updateWordleUI = (tries) => {	
	tries.forEach((word,i) => {
		let listEls = wordleEl.querySelectorAll(`[data-row-id="${i + 1}"] li`);
		
		word.forEach((charDetail,i) => {
			listEls[i].dataset.color = charDetail.color
			listEls[i].textContent = charDetail.char
		})
		
		listEls.forEach((el, i) => {
			if(i < word.length) return
			resetLi(el)
		})
	})

	if(!tries.length) {
		let listEls = wordleEl.querySelectorAll(`[data-row-id] li`);
		listEls.forEach(resetLi)
	}
	for (let i = tries.length; i <= 6; i++) {
		let listEls = wordleEl.querySelectorAll(`[data-row-id="${i + 1}"] li`);
		listEls.forEach(resetLi)	
	}
}

const getValidTries = tries => {
	if(!tries.length) return tries
	let triesCopy = [...tries]
	if(tries[tries.length - 1].length < 5) triesCopy.pop()
	return triesCopy
}

const getCharStatsFromTries = validTries => {
	const filteredWordList = filterWords(validTries)
	
	return getCharStats(filteredWordList)
}

const handleKeyDown = (key) => {
	if(key == 'enter') {
		updateProbabilityUI()
		probabilityContainerEl.classList.add('active')
		return
	}
	
	tries = getTries(tries, key)
	updateWordleUI(tries)
}

wordleEl.querySelectorAll('li').forEach(el => {
	el.addEventListener('click', function(){
		let rowIndex = parseInt(this.parentElement.dataset.rowId) - 1
		let charIndex = parseInt(this.dataset.charIndex)
		
		let currentColor = tries[rowIndex]?.[charIndex]?.color
		if(!currentColor) return
		let nextColor = colorsOrder.next(currentColor)

		tries.forEach(attempt => {
			if(attempt[charIndex]?.char == tries[rowIndex][charIndex].char)
				attempt[charIndex].color = nextColor
		})

		this.dataset.color = nextColor
		
		updateWordleUI(tries)
	}, false)
})

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 13) return handleKeyDown('enter')
	if(!/^[A-z]{1}$|^Backspace$/.test(e.key)) return
	handleKeyDown(e.key.toLowerCase())
}, false)
probabilityInputEls.forEach(inputEl => {
	inputEl.addEventListener('click', function() {
		probabilityInputEls.forEach(el => el.classList.remove('active'))
		this.classList.add('active')
		updateProbabilityUI()
	})
})

wordleKeyboardEl.querySelectorAll('li[data-value]').forEach(el => {
	el.addEventListener('click', function(){
		handleKeyDown(this.dataset.value)
	})
})

document.querySelector('h2').addEventListener('click', function() {
	handleKeyDown('enter')
	probabilityContainerEl.classList.add('active')
}, false)

closeProbabilityEl.addEventListener('click', function() {
	probabilityContainerEl.classList.remove('active')
})