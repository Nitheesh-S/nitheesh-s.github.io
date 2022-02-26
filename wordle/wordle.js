import '/style/wordle.css'
import dictionary from '/wordle/five_letter_words.js'


const handleKeyDown = e => {
	if(!/[A-z]/.test(e.key)) return

	let key = e.key.toLowerCase()
	console.log('key :>> ', key);
}
document.addEventListener('keypress', handleKeyDown, false)
console.log('dictionary.length :>> ', dictionary.length);


const chars = 'abcdefghijklmnopqrstuvwxyz';

const charStats = {}

chars.split('').forEach(c => {
	charStats[c] = {
		char: c,
		count: 0,
		countByPosition: [0,0,0,0,0]
	}
})

dictionary.forEach(word => {
	word.split('').forEach((c,i) => {
		charStats[c].count += 1
		charStats[c].countByPosition[i] += 1
	})
})

let probabilityOutputEl = document.querySelector('.probability-output')

const showStats = stats => {
	let listStr = stats.map(data => {
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
	
	probabilityOutputEl.innerHTML = listStr
}

const showOverallStats = () => {
	console.log('showOverallStats :>> ', showOverallStats);
	let totalValue = 0;
	let stats = Object.values(charStats).sort((a,b) => b.count - a.count).map(x => {
		totalValue += x.count
		return {
			char: x.char,
			value: x.count
		}
	})
	stats.map(x => {
		x.percent = Math.round(((x.value / totalValue) * 100) * 100) / 100
		return x
	})
	showStats(stats)
}

const showPositionStats = position => {
	let totalValue = 0;
	let i = position - 1;
	let stats = Object.values(charStats).sort((a,b) => b.countByPosition[i] - a.countByPosition[i]).map(x => {
		totalValue += x.count
		return {
			char: x.char,
			value: x.countByPosition[i]
		}
	})
	stats.map(x => {
		x.percent = Math.round(((x.value / totalValue) * 100) * 100) / 100
		return x
	})

	showStats(stats)
}

let probabilityInputEls = document.querySelectorAll('.probability-input li');
probabilityInputEls.forEach(inputEl => {
	inputEl.addEventListener('click', function() {
		probabilityInputEls.forEach(el => el.classList.remove('active'))
		this.classList.add('active')
		if(this.dataset.name == "overall")
			showOverallStats()
		else
			showPositionStats(parseInt(this.dataset.probabiltyId))
	})
})
// Object.values(temp1).sort((a,b) => b.count - a.count)
console.log('charStats :>> ', charStats);