!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([r]).join("\n")}var a,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);i&&r[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){"use strict";t.a=n.p+"JosefinSans-VariableFont_wght.ttf"},function(e,t,n){"use strict";t.a=n.p+"FiraCode-VariableFont_wght.ttf"},function(e,t,n){var i=n(5),r=n(6);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var o={insert:"head",singleton:!1};i(r,o);e.exports=r.locals||{}},function(e,t,n){"use strict";var i,r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},i=[],r=0;r<e.length;r++){var o=e[r],c=t.base?o[0]+t.base:o[0],l=n[c]||0,u="".concat(c," ").concat(l);n[c]=l+1;var f=s(u),d={css:o[1],media:o[2],sourceMap:o[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:u,updater:v(d,t),references:1}),i.push(u)}return i}function l(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var r=n.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var u,f=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function d(e,t,n,i){var r=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=f(t,r);else{var o=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function p(e,t,n){var i=n.css,r=n.media,o=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),o&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var h=null,g=0;function v(e,t){var n,i,r;if(t.singleton){var o=g++;n=h||(h=l(t)),i=d.bind(null,n,o,!1),r=d.bind(null,n,o,!0)}else n=l(t),i=p.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var r=s(n[i]);a[r].references--}for(var o=c(e,t),l=0;l<n.length;l++){var u=s(n[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}n=o}}}},function(e,t,n){"use strict";n.r(t);var i=n(1),r=n.n(i),o=n(0),a=n.n(o),s=n(2),c=n(3),l=r()(!1),u=a()(s.a),f=a()(c.a);l.push([e.i,"@font-face{font-family:'JosefinSansVF';src:url("+u+")}@font-face{font-family:'FiraCodeVF';src:url("+f+")}*,*:before,*:after{box-sizing:border-box}:root{--vintage-green: #3f3}html{--bg-1: #000;--text-fg-1: #fff}body{background:var(--bg-1);color:var(--text-fg-1);font-family:monospace;margin:0;display:grid;align-content:flex-start;font-family:'JosefinSansVF';min-height:85vh;overflow:hidden}@media (min-width: 600px){body{min-height:100vh}}h1{font-family:'FiraCodeVF', monospace;font-variation-settings:'wght' 400}.title-container{display:grid;align-items:center;padding:0 20px;min-height:100vh}@media (min-width: 600px){.title-container{justify-self:center;min-width:600px}}.title-container h1{margin:0;font-size:1.3rem;text-align:left;max-width:600px}@media (min-width: 360px){.title-container h1{font-size:1.5rem}}header{display:grid;grid-auto-flow:column;justify-content:space-between;width:100%;margin:0 auto;position:fixed;top:0;left:0}@media (min-width: 600px){header{padding:0 30px}}header ul{list-style:none;margin:0;padding:0}header ul.right li{font-variation-settings:'wght' 300;transition:all 0.2s linear}header ul.right li:hover{font-variation-settings:'wght' 300}header li{cursor:pointer;padding:20px;margin:0;line-height:1}header .logo{font-size:20px;font-variation-settings:'wght' 500}header a{text-decoration:none;color:var(--text-c-1);position:relative}header a:before{content:'';width:0;height:2px;position:absolute;bottom:0;left:0;background:var(--text-c-1);transition:all 0.2s ease-in}header a:hover:before{width:100%}.typer{--typer-c: var(--vintage-green)}.typer span.block{display:inline-flex;position:relative;background:var(--typer-c);color:var(--typer-c);line-height:1}.typer.blink span.block{animation:blink 1s infinite}@keyframes blink{0%{--typer-c: var(--vintage-green)}50%{--typer-c: transparent}100%{--typer-c: var(--vintage-green)}}\n",""]),t.default=l},function(e,t,n){"use strict";n.r(t);n(4),n.p;function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=document.querySelector("h1"),o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t,this.content="string"==typeof n?[n]:n,this.initialHTML=t.innerHTML,this.updatedContent="",t.classList.add("typer"),t.insertAdjacentHTML("beforeend",'<span class="block">H</span>'),this.updateInterval=setInterval(this.update.bind(this),100)}var t,n,r;return t=e,(n=[{key:"update",value:function(){if(this.stopBlinking(),0==this.content.length)return this.startBlinking(),clearInterval(this.updateInterval),console.log("cleared"),!0;this.updatedContent+=this.content[0][0]?this.content[0][0]:this.content[1]?"</br>":"",this.el.innerHTML=this.initialHTML+this.updatedContent+'<span class="block">&#8192;</span>',this.content[0][0]?this.content[0]=this.content[0].slice(1):this.content=this.content.slice(1)}},{key:"startBlinking",value:function(){this.el.classList.add("blink")}},{key:"stopBlinking",value:function(){this.el.classList.remove("blink")}}])&&i(t.prototype,n),r&&i(t,r),e}();window.addEventListener("load",(function(){setTimeout((function(){new o(r,["Hi, I am Nitheesh.","I'm a Software Engineer based in Chennai.","Currently, working at Iderize."])}),1e3)}))}]);