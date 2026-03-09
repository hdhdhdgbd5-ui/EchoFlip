const grid=document.getElementById('grid');const startBtn=document.getElementById('start');const levelEl=document.getElementById('level');const scoreEl=document.getElementById('score');
let seq=[],input=[],level=1,score=0,tiles=[],coins=0,dailyBonusClaimed=false,lastLogin=null,highScore=0;
const SAVE_KEY='echoFlip_save';
function loadSave(){try{const s=localStorage.getItem(SAVE_KEY);if(s){const d=JSON.parse(s);coins=d.coins||0;dailyBonusClaimed=d.dailyBonusClaimed||false;lastLogin=d.lastLogin||null;highScore=d.highScore||0;}}catch(e){}}
function saveGame(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({coins,dailyBonusClaimed,lastLogin,highScore}));}catch(e){}}
function checkDaily(){const today=new Date().toDateString();if(lastLogin!==today){dailyBonusClaimed=false;}if(!dailyBonusClaimed){coins+=50;dailyBonusClaimed=true;lastLogin=today;saveGame();alert('Daily Bonus: +50 coins!');}}
for(let i=0;i<9;i++){const d=document.createElement('div');d.className='tile';d.dataset.i=i;d.onclick=()=>tap(i);grid.appendChild(d);tiles.push(d);}
function flash(i){tiles[i].classList.add('active');setTimeout(()=>tiles[i].classList.remove('active'),220);}
function playSeq(){let i=0;const timer=setInterval(()=>{flash(seq[i]);i++;if(i>=seq.length)clearInterval(timer);},350);}
function next(){input=[];seq.push(Math.floor(Math.random()*9));playSeq();levelEl.textContent=level;}
function tap(i){if(!seq.length)return;input.push(i);flash(i);const idx=input.length-1;if(input[idx]!==seq[idx]){onGameOver();return;}if(input.length===seq.length){score+=10*level;level++;coins+=level;saveGame();next();}}
function onGameOver(){if(score>highScore){highScore=score;}coins+=Math.floor(score/10);saveGame();seq=[];level=1;score=0;levelEl.textContent=level;scoreEl.textContent=score;setTimeout(()=>{console.log('Interstitial ad');},500);}
startBtn.onclick=()=>{seq=[];level=1;score=0;scoreEl.textContent=score;loadSave();checkDaily();next();};
