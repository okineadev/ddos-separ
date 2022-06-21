let D=document;
const sl=q=>D.querySelector(q);
const sla=q=>D.querySelectorAll(q);
class Selector{
	constructor(s,d){
		if (s&&(d||!d)) {
			if (s&&!d&&typeof s=='function') {
				D.addEventListener('DOMContentLoaded', s, {once: true})
			} else {
				let e;
				if (typeof s=='string') {
					const mt = s.match(/<(\w+)>/);
					if (mt) {
						this.selector = mt[1];
						e = D.createElement(mt[1]);
						if (d&&typeof d=='object') {
							for (let k in d) {
								e.setAttribute(k, d[k])
							}
						}
					} else {
						if (d&&typeof d=='string'&&d=='all') {e = sla(s)}
						else if (!d) {e = sl(s)}
					}
				} else if (s instanceof Document) {e = D} 
				else if (typeof s=='object') {e = s};

				if (e) {
					this[0] = e;
					this.appendTo = e => {
						if (e instanceof Document || e instanceof Element) {
							e.appendChild(this[0])
						} else if (e instanceof Selector) {
							e[0].appendChild(this[0])
						}
					};
					this.text = t => {
						if (!t) {
							return this[0].textContent;
						}
						this[0].textContent = t;
						return this
					};
					this.css = c => {for (let i in c) this[0].style.setProperty(i, c[i]);return this};
					this.removeCss = c => {for (let i in c) this[0].style.removeProperty(i, c[i]);return this};
					this.innerHtml = c => {this[0].innerHTML = c; return this};
					this.on = (e, f, d) => this[0].addEventListener(e, f, d);
					this.click = (f, d) => this.on('click', f, d);
					this.dblclick = (f, d) => this.on('dblclick', f, d);
					this.remove = () => {try{this[0].remove()}catch{}}
				}
			}
		}
	}
};

const $ = (s, d) => new Selector(s, d)