import '/style/wordle.css'
import dictionary from '/wordle/five_letter_words.js'
import { getStatsUI, getCharStats, getProbabilityStats } from '/wordle/stats.js'

const colorsOrder = ['GREY', 'YELLOW', 'GREEN']

colorsOrder.next = function(value) {
    let position = (this.indexOf(value) + 1) % this.length
    return this[position]
}

const wordleContainerEl = document.querySelector('.wordle-container')
const probabilityOutputEl = document.querySelector('.probability-output')
const probabilityInputEl = document.querySelector('.probability-input');
const probabilityInputEls = probabilityInputEl.querySelectorAll('li');
let tries = []

const getProbabilityPosition = el => parseInt(el.dataset.probabiltyId) - 1

const updateProbabilityUI = (el, stats=null) => {
	el.classList.add('active')
		
	let position = getProbabilityPosition(el)
	let statsUIData = getProbabilityStats(position, stats)
	probabilityOutputEl.innerHTML = getStatsUI(statsUIData)
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

const getYellowExistsRegExp = tries => {
	let yellowExists = false
	let yellowCharSet = tries.flat().reduce((prev, curr) => {
		if(curr.color != 'YELLOW') return prev
		yellowExists = true
		prev.add(curr.char)
		return prev
	}, new Set())
	return {
		regExp: new RegExp(`[${[...yellowCharSet].join('')}]`),
		exists: yellowExists
	}
}

const getGreyRegExp = tries => {
	let greyCharSet = tries.flat().reduce((prev, curr) => {
		if(curr.color == 'GREY')
			prev.add(curr.char)
		return prev
	}, new Set())
	return new RegExp(`[${[...greyCharSet].join('')}]`)
}

const filterWords = (tries) => {
	const greenRegExp = getGreenRegExp(tries)
	const greyRegExp = getGreyRegExp(tries)
	const {
		regExp: yellowExistsRegExp,
		exists: yellowExists
	} = getYellowExistsRegExp(tries)
	const yellowPositionRegExp = getYellowPositionRegExp(tries)

	return dictionary.filter(word => {
		if(greyRegExp.test(word)) return false
		if(!greenRegExp.test(word)) return false
		if(!yellowPositionRegExp.test(word)) return false
		if(yellowExists)
			if(!yellowExistsRegExp.test(word)) return false
			
		return true
	})
}

const getTries = (tries, key) => {
	if(key == 'backspace') {
		if(!tries.length) return

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
	el.dataset.charIndex = null
	el.dataset.color = ''
	el.textContent = ''
}

const updateWordleUI = (tries) => {	
	tries.forEach((word,i) => {
		let listEls = wordleContainerEl.querySelectorAll(`[data-row-id="${i + 1}"] li`);
		
		word.forEach((charDetail,i) => {
			listEls[i].dataset.charIndex = i
			listEls[i].dataset.color = charDetail.color
			listEls[i].textContent = charDetail.char
		})
		
		listEls.forEach((el, i) => {
			if(i < word.length) return
			resetLi(el)
		})
	})

	if(!tries.length) {
		let listEls = wordleContainerEl.querySelectorAll(`[data-row-id] li`);
		listEls.forEach(resetLi)
	}
	for (let i = tries.length; i <= 6; i++) {
		let listEls = wordleContainerEl.querySelectorAll(`[data-row-id="${i + 1}"] li`);
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
	
	console.groupCollapsed();
	console.log('%c' + filteredWordList.join('  '), 'text-transform: uppercase; line-height: 1.5;')
	console.groupEnd();
	return getCharStats(filteredWordList)
}

const handleTriesUpdate = tries => {
	let validTries = getValidTries(tries)
	if(!validTries.length) return

	const stats = getCharStatsFromTries(validTries)

	let activeProbabilityInput = probabilityInputEl.querySelector('li.active')
	updateProbabilityUI(activeProbabilityInput, stats)
}

const handleKeyDown = (e) => {
	if(!/^[A-z]{1}$|^Backspace$/.test(e.key)) return
	
	let key = e.key.toLowerCase()
	tries = getTries(tries, key)
	updateWordleUI(tries)
	handleTriesUpdate(tries)
}

wordleContainerEl.querySelectorAll('li').forEach(el => {
	el.addEventListener('click', function(){
		let rowIndex = parseInt(this.parentElement.dataset.rowId) - 1
		let charIndex = parseInt(this.dataset.charIndex)
		
		let currentColor = tries[rowIndex][charIndex].color
		let nextColor = colorsOrder.next(currentColor)

		tries.forEach(attempt => {
			if(attempt[charIndex]?.char == tries[rowIndex][charIndex].char)
				attempt[charIndex].color = nextColor
		})

		this.dataset.color = nextColor
		
		updateWordleUI(tries)
		handleTriesUpdate(tries)
	}, false)
})

document.addEventListener('keydown', handleKeyDown, false)
probabilityInputEls.forEach(inputEl => {
	inputEl.addEventListener('click', function() {
		probabilityInputEls.forEach(el => el.classList.remove('active'))
		let validTries = getValidTries(tries)
		let stats = null
		if(validTries) stats = getCharStatsFromTries(tries)
		updateProbabilityUI(this, stats)
	})
})
