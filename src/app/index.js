import '../style/app.scss';
import PdfFile from '../public/NitheeshResume.pdf';

let mainTitle = document.querySelector('h1');

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

		this.el.innerHTML = this.initialHTML + this.updatedContent + `<span class="block">&#8192;</span>`;

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
		let mainTitleTyper = new Typer(mainTitle, [
			`Hi, I am Nitheesh.`,
			`I'm a Software Engineer based in Chennai.`,
			`Currently, working at Iderize.`,
		]);
	}, 1000);
});
