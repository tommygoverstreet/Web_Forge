'use strict';
/* init */
setView('prev');renderAll();
try{if(!localStorage.getItem('webforge:seen')){localStorage.setItem('webforge:seen','1');showWelcome()}}catch{}
