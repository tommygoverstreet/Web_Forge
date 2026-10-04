'use strict';
/* editing actions */
function mut(fn,full){snap();fn();full?renderAll():refresh()}
function dl(name,text,type='text/plain'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function project(){return{format:'webforge-project',version:'1.0',project:{name:'My Project'},html:{tree:S.tree},css:{rules:S.css},javascript:{events:S.events,code:S.js||''},json:{text:S.json},components:[],settings:{}}}
function load(p){if(p?.format!=='webforge-project')throw new Error('Not a WebForge project file');snap();S={tree:p.html.tree||[],css:p.css.rules||[],events:p.javascript.events||[],js:p.javascript.code||'',json:p.json.text||'{}'};uid=Math.max(0,...all().map(x=>x.uid));sel=null;renderAll()}
