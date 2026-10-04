'use strict';
/* drag and drop in the structure tree (buttons remain the keyboard and touch route) */
let dragId=null;
const treeEl=document.querySelector('#tree');
const clearDrop=()=>treeEl.querySelectorAll('.drop-before,.drop-after,.drop-in').forEach(x=>x.classList.remove('drop-before','drop-after','drop-in'));
const dropPos=(e,d)=>{const r=d.getBoundingClientRect(),y=(e.clientY-r.top)/r.height;return y<.28?'before':y>.72?'after':'in'};
treeEl.addEventListener('dragstart',e=>{const d=e.target.closest('.node');if(!d)return;dragId=+d.dataset.id;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',String(dragId))});
treeEl.addEventListener('dragover',e=>{const d=e.target.closest('.node');if(!d||dragId==null)return;e.preventDefault();clearDrop();d.classList.add('drop-'+dropPos(e,d))});
treeEl.addEventListener('drop',e=>{e.preventDefault();const d=e.target.closest('.node');if(!d||dragId==null)return;const pos=dropPos(e,d),tid=+d.dataset.id;clearDrop();
 const src=find(dragId);if(!src||!find(tid)||dragId===tid||find(tid,src.node.children)){dragId=null;return}
 mut(()=>{src.list.splice(src.i,1);const t=find(tid);if(pos==='in'&&!DEFS[t.node.tag].void)t.node.children.push(src.node);else t.list.splice(t.i+(pos==='after'?1:0),0,src.node);sel=src.node.uid},true);dragId=null});
treeEl.addEventListener('dragend',()=>{dragId=null;clearDrop()});
