import dictionary from '/wordle/five_letter_words.js';
const getCharStats = (wordList) => {
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	const charStats = {}

	chars.split('').forEach(c => {
		charStats[c] = {
			char: c,
			count: 0,
			countByPosition: [0,0,0,0,0]
		}
	})

	wordList.forEach(word => {
		word.split('').forEach((c,i) => {
			charStats[c].count += 1
			charStats[c].countByPosition[i] += 1
		})
	})

	return charStats
}

const getSortAlgo = (position) => {
	if(position >= 0)
		return (a,b) => b.countByPosition[position] - a.countByPosition[position]
	return (a,b) => b.count - a.count
}

const getProbabilityStats = (position=null, stats=getCharStats(dictionary)) => {
	const sortAlgo = getSortAlgo(position)
	let totalValue = 0;

	let sortedStats = Object.values(stats).sort(sortAlgo)
	let statsUIData = sortedStats.map(x => {
		let value = position >= 0 ? x.countByPosition[position] : x.count
		totalValue += value
		return {
			char: x.char,
			value: value
		}
	})
	statsUIData = statsUIData.map(x => {
		x.percent = Math.round(((x.value / totalValue) * 100) * 100) / 100
		return x
	})

	return statsUIData
}

const getStatsUI = (statsUIData) => {
	let listStr = statsUIData.map(data => {
		return `<li>
			<span class="char">${data.char.toUpperCase()}</span>
			<div class="probability" data-value="${data.value}" data-percent="${data.percent}">
				<span>${data.percent}</span>
				<div class="visual">
					<span style="width:${data.percent}%"></span>
				</div>
			</div>
		</li>`
	}).join('')
	
	return listStr
}

export { getStatsUI, getCharStats, getProbabilityStats };