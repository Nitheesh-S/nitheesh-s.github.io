import '/style/index.css'


const mainTitle = document.querySelector('h1');
const workJoinDate = new Date('Jan 01 2018')

const experienceInDays = (new Date() - workJoinDate) / (1000 * 60 * 60 * 24)
const year = 365.2425;

const remainingDays = Math.floor(experienceInDays % year)

let experience = `${Math.floor(experienceInDays / year)} years`

if(remainingDays) experience += ` and ${remainingDays} days`


class Typer {
	constructor(el, content) {
		this.el = el;
		this.content = typeof content == 'string' ? [content] : content;

		this.initialHTML = el.innerHTML;
		this.updatedContent = '';

		el.classList.add('typer');
		el.insertAdjacentHTML('beforeend', `<span class="block">H</span>`);

		this.updateInterval = setInterval(this.update.bind(this), 100);
	}
	update() {
		this.stopBlinking();
		if (this.content.length == 0) {
			this.startBlinking();
			clearInterval(this.updateInterval);
			console.log('cleared');
			return true;
		}

		this.updatedContent += this.content[0][0] ? this.content[0][0] : this.content[1] ? '</br>' : '';

		this.el.innerHTML = `${this.initialHTML} ${this.updatedContent} <span class="block">&#8192;</span>`;

		if (this.content[0][0]) this.content[0] = this.content[0].slice(1);
		else this.content = this.content.slice(1);
	}
	startBlinking() {
		this.el.classList.add('blink');
	}
	stopBlinking() {
		this.el.classList.remove('blink');
	}
}

window.addEventListener('load', () => {
	setTimeout(() => {
		new Typer(mainTitle, [
			'Hi, I am Nitheesh.',
			'I\'m a Software Engineer based in Chennai.',
			'Currently, working at Techjays.',
			`I have ${experience} of experience.`
		]);
	}, 1000);
});
