function e(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(t=>{t.preventDefault();const n=document.querySelector('input[name="delay"]'),o=document.querySelector('input[name="step"]'),i=document.querySelector('input[name="amount"]'),l=parseInt(n.value),r=parseInt(o.value),u=parseInt(i.value);for(let t=1;t<=u;t++){e(t,l+r*(t-1)).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}}));
//# sourceMappingURL=03-promises.f52221e4.js.map
