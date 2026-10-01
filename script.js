const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize(){
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars = Array.from({length: Math.min(260, Math.floor(innerWidth/5))}, ()=>({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: Math.random()*1.5+.2,
    a: Math.random()*.75+.15,
    s: Math.random()*.15+.02
  }));
}
addEventListener("resize", resize);
resize();

function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const st of stars){
    st.y += st.s;
    if(st.y > innerHeight){ st.y = 0; st.x = Math.random()*innerWidth; }
    ctx.beginPath();
    ctx.arc(st.x,st.y,st.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(215,235,255,${st.a})`;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
animate();

document.getElementById("startBtn").addEventListener("click", ()=>{
  document.querySelector(".orbit-section").scrollIntoView({behavior:"smooth"});
});

const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", async ()=>{
  if(audio.paused){
    try{
      await audio.play();
      musicBtn.textContent = "♫ Música: on";
      musicBtn.setAttribute("aria-pressed","true");
    }catch(e){
      alert("Añade un archivo llamado music.mp3 a la carpeta para activar la música.");
    }
  }else{
    audio.pause();
    musicBtn.textContent = "♫ Música: off";
    musicBtn.setAttribute("aria-pressed","false");
  }
});

function confetti(){
  const chars = ["#67e9ff","#8b6bff","#ff64ce","#ffffff","#3188ff"];
  for(let i=0;i<90;i++){
    const el = document.createElement("i");
    el.className = "confetti";
    el.style.left = Math.random()*100 + "vw";
    el.style.background = chars[Math.floor(Math.random()*chars.length)];
    el.style.setProperty("--x", (Math.random()*220-110) + "px");
    el.style.animationDelay = (Math.random()*.6)+"s";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),3500);
  }
}

document.getElementById("surpriseBtn").addEventListener("click", (e)=>{
  const secret = document.getElementById("secret");
  secret.hidden = !secret.hidden;
  if(!secret.hidden){
    confetti();
    e.currentTarget.textContent = "Sorpresa abierta ✨";
  }else{
    e.currentTarget.textContent = "Abrir sorpresa";
  }
});
