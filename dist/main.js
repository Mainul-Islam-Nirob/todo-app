(()=>{const t=(e,t,n,o)=>({title:e,description:t,dueDate:n,priority:o}),n=e=>({name:e,todos:[]}),o=[];let l=null;const d=()=>{const e=document.getElementById("project-list");e.innerHTML="",o.forEach(((t,n)=>{const c=document.createElement("div");c.classList.add("project");const s=document.createElement("span");s.classList.add("project-name"),s.textContent=t.name,s.addEventListener("click",(()=>{const e=document.querySelectorAll(".project-name");document.querySelectorAll(".nav-link").forEach((e=>{e.classList.remove("nav-active")})),e.forEach((e=>e.classList.remove("project-active"))),s.classList.add("project-active"),a(n)}));const m=document.createElement("div");m.classList.add("projectBtns");const r=document.createElement("i");r.classList.add("projectBtn","fa-solid","fa-pen-to-square"),r.onclick=()=>(e=>{l=e,document.getElementById("projectName").value=o[e].name,document.getElementById("projectModalTitle").textContent="Update Project",i("projectModal")})(n);const p=document.createElement("i");p.classList.add("projectBtn","fa-regular","fa-trash"),p.onclick=()=>(e=>{confirm("Are you sure you want to delete this project and all its todos?")&&(o.splice(e,1),y(),d(),document.getElementById("todo-list").innerHTML="")})(n);const E=document.createElement("i");E.classList.add("projectBtn","fa-sharp","fa-solid","fa-plus"),E.onclick=()=>{u=n,i("todoModal")},m.appendChild(r),m.appendChild(p),m.appendChild(E),c.appendChild(s),c.appendChild(m),e.appendChild(c)}))};let c=null;const a=(e=null,t=null)=>{const n=document.getElementById("todo-list");n.innerHTML="";let l=[];"all"===t?l=o.flatMap((e=>e.todos.map((t=>({...t,projectName:e.name}))))):"important"===t?l=o.flatMap((e=>e.todos.filter((e=>"High"===e.priority)).map((t=>({...t,projectName:e.name}))))):null!==e&&o[e]&&(l=o[e].todos.map((t=>({...t,projectName:o[e].name})))),0!==l.length?l.forEach(((t,l)=>{const d=document.createElement("div");d.classList.add("todoItem");const s=document.createElement("div");s.classList.add("t-title"),s.textContent=t.title,d.appendChild(s);const m=document.createElement("div");m.classList.add("t-description"),m.textContent=t.description,d.appendChild(m);const E=document.createElement("div");E.classList.add("t-priority"),E.textContent=`Priority: ${t.priority}`,d.appendChild(E);const g=document.createElement("div");g.classList.add("t-dueDate"),g.textContent=`Due: ${t.dueDate}`,d.appendChild(g);const h=document.createElement("div");h.classList.add("projectName"),h.textContent=`Project: ${t.projectName}`,d.appendChild(h);const v=document.createElement("div");v.classList.add("edit-item");const L=document.createElement("span");L.classList.add("edit-btn"),L.textContent="Edit",L.onclick=()=>((e,t)=>{c=t;const n=o[e].todos[t];document.getElementById("title").value=n.title,document.getElementById("details").value=n.description,document.getElementById("date").value=n.dueDate,r=n.priority,u=e,p("Low"===r?"low-btn":"high-btn","High"===r?"low-btn":"high-btn"),document.getElementById("todoModalTitle").textContent="Update Task",i("todoModal")})(null!==e?e:0,l),v.appendChild(L);const B=document.createElement("span");B.classList.add("edit-btn"),B.textContent="Delete",B.onclick=()=>((e,t)=>{o[e].todos.splice(t,1),a(e),y()})(null!==e?e:0,l),v.appendChild(B),d.appendChild(v),n.appendChild(d)})):n.innerHTML="<p>No todos found.</p>"},s=()=>{document.getElementById("todo-form").reset(),document.getElementById("project-form").reset(),r="",c=null,l=null,document.querySelectorAll(".priority-btn .btn").forEach((e=>{e.classList.remove("selected")})),document.getElementById("todoModalTitle").textContent="New Task",document.getElementById("projectModalTitle").textContent="New Project"},i=t=>{const n=document.getElementById(t);n.style.display="block",n.querySelector(".closeBtn").addEventListener("click",(()=>{n.style.display="none",s()})),window.addEventListener("click",m(e,t))};function m(e,t){const n=document.getElementById(t);document.getElementById(".modal-content").contains(e.target)||(n.style.display="none",s(),window.removeEventListener("click",(e=>m(e,t))))}let r="";document.getElementById("low-btn").addEventListener("click",(()=>{r="Low",p("low-btn","high-btn")})),document.getElementById("high-btn").addEventListener("click",(()=>{r="High",p("high-btn","low-btn")}));let u=null;function p(e,t){console.log("Selected ID:",e),console.log("Other ID:",t);const n=document.getElementById(e),o=document.getElementById(t);n&&(n.classList.add("selected"),console.log(n),console.log("change selected button style")),o&&(o.classList.remove("selected"),console.log("change other button style"))}const E=e=>{const t=document.querySelectorAll(".nav-link");document.querySelectorAll(".project-name").forEach((e=>{e.classList.remove("project-active")})),t.forEach((e=>{e.classList.remove("nav-active")}));const n=document.getElementById(e);n&&n.classList.add("nav-active")};document.getElementById("show-project-modal").addEventListener("click",(()=>i("projectModal"))),document.getElementById("todo-form").addEventListener("submit",(e=>{e.preventDefault();const n=document.getElementById("title").value,l=document.getElementById("details").value,d=document.getElementById("date").value;if(!r)return void alert("Please select a priority!");const i=r;if(null!==c){const e=u;o[e].todos[c]=t(n,l,d,i),a(e),c=null}else{const e=t(n,l,d,i);((e,t)=>{o[e].todos.push(t),y(),a(e)})(u,e)}y(),document.getElementById("todoModal").style.display="none",p(),s()})),document.getElementById("project-form").addEventListener("submit",(e=>{e.preventDefault();const t=document.getElementById("projectName").value;null!==l?(o[l].name=t,d(),l=null):(e=>{const t=n(e);o.push(t),y(),d()})(t),y(),document.getElementById("projectModal").style.display="none",s()})),document.getElementById("show-all-todos").addEventListener("click",(()=>{a(null,"all"),E("show-all-todos")})),document.getElementById("importantNav").addEventListener("click",(()=>{a(null,"important"),E("importantNav")}));const y=()=>{localStorage.setItem("todoAppData",JSON.stringify(o))};document.addEventListener("DOMContentLoaded",(()=>{(()=>{const e=localStorage.getItem("todoAppData");e&&(JSON.parse(e).forEach((e=>{const l=n(e.name);e.todos.forEach((e=>{l.todos.push(t(e.title,e.description,e.dueDate,e.priority))})),o.push(l)})),d(),a(null,"all"),E("show-all-todos"))})()}))})();