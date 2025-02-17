import{a as b,S as L,i as l}from"./assets/vendor-hwdYKDic.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const w="48881929-8a2d26e052171fbda160d8dd0",q="https://pixabay.com/api/";async function S(s,t=1,r=40){try{return(await b.get(q,{params:{key:w,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r}})).data}catch(i){throw console.error("Error fetching images:",i),i}}function E(s){const t=document.querySelector(".gallery"),r=s.map(({webformatURL:e,largeImageURL:o,tags:n,likes:m,views:g,comments:h,downloads:v})=>`
        <div class="gallery-item">
          <a href="${o}" class="gallery-link">
            <img src="${e}" alt="${n}" class="gallery-image">
          </a>
          <div class="image-info">
            <div class="info-item">
              <p class="info-title">Likes</p>
              <p class="info-value">${m}</p>
            </div>
            <div class="info-item">
              <p class="info-title">Views</p>
              <p class="info-value">${g}</p>
            </div>
            <div class="info-item">
              <p class="info-title">Comments</p>
              <p class="info-value">${h}</p>
            </div>
            <div class="info-item">
              <p class="info-title">Downloads</p>
              <p class="info-value">${v}</p>
            </div>
          </div>
        </div>
      `).join("");t.insertAdjacentHTML("beforeend",r),new L(".gallery a").refresh()}const R=document.querySelector("#search-form"),d=document.querySelector("#loader"),u=document.querySelector(".gallery"),a=document.querySelector("#load-more");let c=1,p="",f=0;a.style.display="none";R.addEventListener("submit",async s=>{s.preventDefault();const t=s.target.elements.query.value.trim();if(!t){l.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}c=1,p=t,u.innerHTML="",a.style.display="none",await y(t,c)});a.addEventListener("click",async()=>{c+=1,await y(p,c)});async function y(s,t){d.style.display="block";try{const r=await S(s,t);if(f=r.totalHits,r.hits.length===0)t===1?l.warning({title:"No Results",message:"Sorry, no images found. Try again!",position:"topRight"}):(l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.style.display="none");else if(E(r.hits),t*40<f?a.style.display="block":(a.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),t>1){const i=u.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}}catch{l.error({title:"Error",message:"Failed to fetch images. Try again later.",position:"topRight"})}finally{d.style.display="none"}}
//# sourceMappingURL=index.js.map
