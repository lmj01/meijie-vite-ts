var umap=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const e=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,t=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,n=/<[a-z][^>]+$/i,r=/>[^<>]*$/,l=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,s=/\s+$/,isNode=(e,t)=>0<t--&&(n.test(e[t])||!r.test(e[t])&&isNode(e,t)),regular=(e,n,r)=>t.test(n)?e:`<${n}${r.replace(s,"")}></${n}>`;const{isArray:o}=Array,{indexOf:a,slice:c}=[],diffable=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;const event=(e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const l=o(t)?t:[t,!1];n!==l[0]&&(n&&e.removeEventListener(r,n,l[1]),(n=l[0])&&e.addEventListener(r,n,l[1]))}};
/*! (c) Andrea Giammarchi - ISC */
var i=function(e){var t="fragment",n="template",r="content"in create(n)?function(e){var t=create(n);return t.innerHTML=e,t.content}:function(e){var r=create(t),l=create(n),s=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var o=RegExp.$1;l.innerHTML="<table>"+e+"</table>",s=l.querySelectorAll(o)}else l.innerHTML=e,s=l.childNodes;return append(r,s),r};return function(e,t){return("svg"===t?createSVG:r)(e)};function append(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function create(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function createSVG(e){var n=create(t),r=create("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",append(n,r.firstChild.childNodes),n}}(document);const reducePath=({childNodes:e},t)=>e[t],createPath=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(a.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:u,importNode:d}=document,p=1!=d.length,f=p?(e,t,n)=>d.call(document,i(e,t,n),!0):i,h=p?e=>u.call(document,e,129,null,!1):e=>u.call(document,e,129),diff=(e,t,n)=>((e,t,n,r,l)=>{const s=n.length;let o=t.length,a=s,c=0,i=0,u=null;for(;c<o||i<a;)if(o===c){const t=a<s?i?r(n[i-1],-0).nextSibling:r(n[a-i],0):l;for(;i<a;)e.insertBefore(r(n[i++],1),t)}else if(a===i)for(;c<o;)u&&u.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[i])c++,i++;else if(t[o-1]===n[a-1])o--,a--;else if(t[c]===n[a-1]&&n[i]===t[o-1]){const l=r(t[--o],-1).nextSibling;e.insertBefore(r(n[i++],1),r(t[c++],-1).nextSibling),e.insertBefore(r(n[--a],1),l),t[o]=n[a]}else{if(!u){u=new Map;let e=i;for(;e<a;)u.set(n[e],e++)}if(u.has(t[c])){const l=u.get(t[c]);if(i<l&&l<a){let s=c,d=1;for(;++s<o&&s<a&&u.get(t[s])===l+d;)d++;if(d>l-i){const s=r(t[c],0);for(;i<l;)e.insertBefore(r(n[i++],1),s)}else e.replaceChild(r(n[i++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n})(e.parentNode,t,n,diffable,e),handleAttribute=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>r=>{n!==!!r&&((n=!!r)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):n=>{e[t]=n})(e,t.slice(1));case"@":return event(e,"on"+t.slice(1));case"o":if("n"===t[1])return event(e,t)}switch(t){case"ref":return(e=>{let t;return n=>{t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}})(e);case"aria":return(e=>t=>{for(const n in t){const r="role"===n?n:"aria-"+n,l=t[n];null==l?e.removeAttribute(r):e.setAttribute(r,l)}})(e)}return((e,t)=>{let n,r=!0;const l=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(l),r=!0):(l.value=t,r&&(e.setAttributeNodeNS(l),r=!1)))}})(e,t)};function handlers(e){const{type:t,path:n}=e,r=n.reduceRight(reducePath,this);return"node"===t?(e=>{let t,n,r=[];const anyContent=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n||(n=document.createTextNode("")),n.data=l,r=diff(e,r,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,r=diff(e,r,[]));break}if(o(l)){t=l,0===l.length?r=diff(e,r,[]):"object"==typeof l[0]?r=diff(e,r,l):anyContent(String(l));break}t!==l&&"ELEMENT_NODE"in l&&(t=l,r=diff(e,r,11===l.nodeType?c.call(l.childNodes):[l]));break;case"function":anyContent(l(e))}};return anyContent})(r):"attr"===t?handleAttribute(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const m=umap(new WeakMap),g=/^(?:plaintext|script|style|textarea|title|xmp)$/i,mapTemplate=(t,n)=>{const r=((t,n,r)=>{const s=[],{length:o}=t;for(let r=1;r<o;r++){const l=t[r-1];s.push(e.test(l)&&isNode(t,r)?l.replace(e,((e,t,l)=>`${n}${r-1}=${l||'"'}${t}${l?"":'"'}`)):`${l}\x3c!--${n}${r-1}--\x3e`)}s.push(t[o-1]);const a=s.join("").trim();return r?a:a.replace(l,regular)})(n,"isµ","svg"===t),s=f(r,t),o=h(s),a=[],c=n.length-1;let i=0,u="isµ"+i;for(;i<c;){const e=o.nextNode();if(!e)throw"bad template: "+r;if(8===e.nodeType)e.data===u&&(a.push({type:"node",path:createPath(e)}),u="isµ"+ ++i);else{for(;e.hasAttribute(u);)a.push({type:"attr",path:createPath(e),name:e.getAttribute(u)}),e.removeAttribute(u),u="isµ"+ ++i;g.test(e.tagName)&&e.textContent.trim()===`\x3c!--${u}--\x3e`&&(e.textContent="",a.push({type:"text",path:createPath(e)}),u="isµ"+ ++i)}}return{content:s,nodes:a}},mapUpdates=(e,t)=>{const{content:n,nodes:r}=m.get(t)||m.set(t,mapTemplate(e,t)),l=d.call(document,n,!0);return{content:l,updates:r.map(handlers,l)}},unroll=(e,{type:t,template:n,values:r})=>{const{length:l}=r;unrollValues(e,r,l);let{entry:s}=e;s&&s.template===n&&s.type===t||(e.entry=s=((e,t)=>{const{content:n,updates:r}=mapUpdates(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:o,updates:a,wire:i}=s;for(let e=0;e<l;e++)a[e](r[e]);return i||(s.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=c.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(o))},unrollValues=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof Hole?t[r]=unroll(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):o(n)?unrollValues(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function Hole(e,t,n){this.type=e,this.template=t,this.values=n}const{create:v,defineProperties:y}=Object,tag=e=>{const t=umap(new WeakMap);return y(((t,...n)=>new Hole(e,t,n)),{for:{value(n,r){const l=t.get(n)||t.set(n,v(null));return l[r]||(l[r]=(t=>(n,...r)=>unroll(t,{type:e,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(t,...n)=>unroll({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},b=umap(new WeakMap),w=tag("html");function renderer(e,t){((e,t)=>{const n="function"==typeof t?t():t,r=b.get(e)||b.set(e,{stack:[],entry:null,wire:null}),l=n instanceof Hole?unroll(r,n):n;l!==r.wire&&(r.wire=l,e.textContent="",e.appendChild(l.valueOf()))})(t,e)}tag("svg");export{w as html,renderer};