const clockElement=document.getElementById("clock"),dateElement=document.getElementById("date");
const stopwatchElement=document.getElementById("stopwatch"),startBtn=document.getElementById("startBtn"),pauseBtn=document.getElementById("pauseBtn"),resetBtn=document.getElementById("resetBtn"),lapBtn=document.getElementById("lapBtn"),lapsElement=document.getElementById("laps"),emptyLaps=document.getElementById("emptyLaps"),languageBtn=document.getElementById("languageBtn"),themeBtn=document.getElementById("themeBtn");

const translations={en:{title:"Digital Clock & Stopwatch",live:"LIVE",currentTime:"Current Time",timer:"TIMER",stopwatch:"Stopwatch",start:"Start",pause:"Pause",reset:"Reset",laps:"Lap Times",lap:"Lap",noLaps:"No lap times yet.",footer:"Part of my JavaScript learning journey"},fa:{title:"ساعت دیجیتال و کرنومتر",live:"زنده",currentTime:"زمان فعلی",timer:"زمان‌سنج",stopwatch:"کرنومتر",start:"شروع",pause:"توقف",reset:"ریست",laps:"زمان دورها",lap:"دور",noLaps:"هنوز زمانی برای دورها ثبت نشده است.",footer:"بخشی از مسیر یادگیری JavaScript من"}};

let language=localStorage.getItem("clockLanguage")||"en",isDark=localStorage.getItem("clockTheme")==="dark",stopwatchStart=0,elapsed=0,stopwatchTimer=null,lapCount=0;
const pad=(v,n=2)=>String(v).padStart(n,"0");

function updateClock(){const now=new Date();clockElement.textContent=`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;dateElement.textContent=new Intl.DateTimeFormat(language==="fa"?"fa-IR":"en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(now)}
function renderStopwatch(){const cs=Math.floor(elapsed/10),centiseconds=cs%100,totalSeconds=Math.floor(cs/100),seconds=totalSeconds%60,totalMinutes=Math.floor(totalSeconds/60),minutes=totalMinutes%60,hours=Math.floor(totalMinutes/60);stopwatchElement.textContent=`${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`}
function startStopwatch(){if(stopwatchTimer)return;stopwatchStart=Date.now()-elapsed;stopwatchTimer=setInterval(()=>{elapsed=Date.now()-stopwatchStart;renderStopwatch()},10)}
function pauseStopwatch(){if(!stopwatchTimer)return;clearInterval(stopwatchTimer);stopwatchTimer=null;elapsed=Date.now()-stopwatchStart;renderStopwatch()}
function resetStopwatch(){pauseStopwatch();elapsed=0;lapCount=0;lapsElement.innerHTML="";emptyLaps.hidden=false;renderStopwatch()}
function addLap(){if(elapsed<=0)return;lapCount++;const item=document.createElement("li");item.innerHTML=`<strong>${language==="fa"?`دور ${lapCount}`:`Lap ${lapCount}`}</strong><span>${stopwatchElement.textContent}</span>`;lapsElement.prepend(item);emptyLaps.hidden=true}
function applyTranslations(){document.documentElement.lang=language;document.documentElement.dir=language==="fa"?"rtl":"ltr";document.querySelectorAll("[data-i18n]").forEach(e=>{const key=e.dataset.i18n;if(translations[language][key])e.textContent=translations[language][key]});languageBtn.textContent=language==="en"?"FA":"EN";updateClock()}
function toggleLanguage(){language=language==="en"?"fa":"en";localStorage.setItem("clockLanguage",language);applyTranslations()}
function applyTheme(){document.body.classList.toggle("dark",isDark);themeBtn.textContent=isDark?"☀":"☾"}
function toggleTheme(){isDark=!isDark;localStorage.setItem("clockTheme",isDark?"dark":"light");applyTheme()}

startBtn.addEventListener("click",startStopwatch);pauseBtn.addEventListener("click",pauseStopwatch);resetBtn.addEventListener("click",resetStopwatch);lapBtn.addEventListener("click",addLap);languageBtn.addEventListener("click",toggleLanguage);themeBtn.addEventListener("click",toggleTheme);
applyTheme();applyTranslations();renderStopwatch();updateClock();setInterval(updateClock,1000);
