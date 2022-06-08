let D=document;
const sl=q=>D.querySelector(q);
const sla=q=>D.querySelectorAll(q);
class Selector{
	constructor(s,d){
		if (s&&d||s&&!d) {
			if (s&&!d&&typeof s=='function') {
				D.addEventListener('DOMContentLoaded', s, {once: true})
			} else {
				let e;
				if (typeof s=='string') {
					const mt = s.match(/<(\w+)>/)
					if (mt) {
						this.selector = mt[1]
						e = D.createElement(mt[1])
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
				else if (typeof s=='object') {e = s}

				if (e) {
					this.element = e
					this.appendTo = e => {
						if (e instanceof Document || e instanceof Element) {
							e.appendChild(this.element)
						} else if (e instanceof Selector) {
							e.element.appendChild(this.element)
						}
					};
					this.text = t => {
						if (!t) {
							return this.element.textContent;
						}
						this.element.textContent = t;
						return this
					};
					this.on = (e, f, d) => this.element.addEventListener(e, f, d);
					this.click = (f, d) => this.on('click', f, d);
					this.dblclick = (f, d) => this.on('dblclick', f, d);
					this.remove = () => {try{this.element.remove()}catch{}}
				}
			}
		}
	}
};

const $ = (s, d) => new Selector(s, d)