(()=>{"use strict";const t={linux:"Linux",devops:"DevOps",bash:"Bash",uncategorized:"Uncategorized",docker:"docker",sql:"SQL",cms:"CMS",code:"Code"};!function(){const e=document.getElementById("quiz-selector");document.createElement("div"),e.setAttribute("method","GET"),e.setAttribute("action","quiz.html");const n="categoryConfig",i="categoryId",d=document.createElement("input");d.setAttribute("list",n),d.setAttribute("name","category"),d.setAttribute("id",i),d.setAttribute("placeholder","quiz category");const o=document.createElement("label");o.setAttribute("for",i),o.innerText="Category";const u=document.createElement("datalist");u.setAttribute("id",n),Object.entries(t).forEach((([t,e])=>{const n=document.createElement("option");n.value=t,u.appendChild(n)}));const c=document.createElement("div");c.setAttribute("id","questionCategoryGroup"),c.appendChild(o),c.appendChild(d),c.appendChild(u);const r=document.createElement("legend"),s=document.createTextNode("Number Of Questions");r.appendChild(s);const a=document.createElement("input");a.setAttribute("name","limit"),a.setAttribute("id","noOfQuestionsInput"),a.setAttribute("type","number"),a.setAttribute("min",1),a.setAttribute("max",20),a.setAttribute("value",5);const l=document.createElement("button");l.setAttribute("type","submit"),l.innerText="Start Quiz";const m=document.createElement("div");m.setAttribute("id","questionSizeGrpElement"),m.appendChild(r),m.appendChild(a),e.appendChild(c),e.appendChild(m),e.appendChild(l)}()})();