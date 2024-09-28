const e="QCStfBADCgUfROJuwwK6ZG3GIMWuxnyg";let t=0,n=[];const r=document.getElementById("burger"),l=document.getElementById("nav-links");r.addEventListener("click",()=>{l.classList.toggle("show")}),document.addEventListener("DOMContentLoaded",()=>{fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${e}`).then(e=>{if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);return e.json()}).then(e=>{let r=document.getElementById("news-grid"),l=document.getElementById("carousel");r.innerHTML="",l.innerHTML="",n=[],e.results.forEach((e,t)=>{let l=document.createElement("div");l.className="news-card",l.innerHTML=`
                    <a href="${e.url}" target="_blank">
                        <img src="${e.multimedia.length>0?e.multimedia[0].url:"placeholder-image-url.jpg"}" alt="${e.title}">
                    </a>
                    <h3>${e.title}</h3>
                    <p>${e.abstract}</p>
                `,r.appendChild(l),t<5&&n.push(e.multimedia[0]?.url||"placeholder-image-url.jpg")}),function(){let e=document.getElementById("carousel");n.forEach((t,n)=>{let r=document.createElement("img");r.src=t,r.style.display=0===n?"block":"none",e.appendChild(r)}),setInterval(()=>{e.children[t].style.display="none",t=(t+1)%n.length,e.children[t].style.display="block"},2e3)}()}).catch(e=>console.error("Error fetching news:",e)),document.querySelectorAll("nav ul li a").forEach(t=>{t.addEventListener("click",t=>{t.preventDefault(),function(t){fetch(`https://api.nytimes.com/svc/topstories/v2/${t}.json?api-key=${e}`).then(e=>e.json()).then(e=>{let t=document.getElementById("news-grid");t.innerHTML="",e.results.forEach(e=>{let n=document.createElement("div");n.className="news-card",n.innerHTML=`
                    <a href="${e.url}" target="_blank">
                        <img src="${e.multimedia.length>0?e.multimedia[0].url:"placeholder-image-url.jpg"}" alt="${e.title}">
                    </a>
                    <h3>${e.title}</h3>
                    <p>${e.abstract}</p>
                `,t.appendChild(n)})}).catch(e=>console.error("Error fetching section news:",e))}(t.target.getAttribute("data-section"))})})}),document.addEventListener("DOMContentLoaded",function(){fetch(`https://api.nytimes.com/svc/topstories/v2/opinion.json?api-key=${e}`).then(e=>e.json()).then(e=>{let t=document.getElementById("opinion-sidebar");t.innerHTML="<h2>Opinion</h2>",e.results.forEach(e=>{let n=document.createElement("div");n.className="opinion-item",n.innerHTML=`
                    <h3>${e.title}</h3>
                    <p>${e.abstract}</p>
                `,t.appendChild(n)})}).catch(e=>console.error("Error fetching opinion articles:",e))});
//# sourceMappingURL=index.af6c5a3e.js.map
