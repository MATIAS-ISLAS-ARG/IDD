(function(){
var REPO='MATIAS-ISLAS-ARG/IDD';
function $(s){return document.querySelector(s)}
function $$(s){return [].slice.call(document.querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}

/* ---------- Tema (escritorio + dentro del menú móvil) ---------- */
var stored=localStorage.getItem('idd_theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem('idd_theme',t);
  $$('.theme-toggle.d').forEach(function(b){b.textContent=t==='dark'?'☀️':'🌙'});
  $$('.m-theme .lbl').forEach(function(b){b.textContent=t==='dark'?'Modo claro':'Modo oscuro'});
  $$('.m-theme .i').forEach(function(b){b.textContent=t==='dark'?'☀️':'🌙'})}
setTheme(stored);
$$('.theme-toggle.d,.m-theme').forEach(function(b){b.addEventListener('click',function(){setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')})});

/* ---------- Menú móvil ---------- */
var mm=$('#mobileMenu');
$('#menuBtn').addEventListener('click',function(){mm.classList.toggle('open')});
$$('.m-link').forEach(function(l){l.addEventListener('click',function(){mm.classList.remove('open')})});

/* ---------- Versículo del día (cambia cada día) ---------- */
var V=[["Yo me alegré con los que me decían: A la casa de Jehová iremos.","Salmo 122:1"],["¡Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía!","Salmo 133:1"],["Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.","Juan 3:16"],["Jehová es mi pastor; nada me faltará.","Salmo 23:1"],["Todo lo puedo en Cristo que me fortalece.","Filipenses 4:13"],["Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.","Josué 1:9"],["Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.","Proverbios 3:5"],["No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré.","Isaías 41:10"],["Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.","Jeremías 29:11"],["Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.","Mateo 11:28"],["Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.","Romanos 8:28"],["Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.","Salmo 46:1"],["Lámpara es a mis pies tu palabra, y lumbrera a mi camino.","Salmo 119:105"],["Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.","1 Corintios 13:13"],["Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.","Hebreos 11:1"],["Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?","Salmo 27:1"],["Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.","Mateo 6:33"],["Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él.","Salmo 34:8"],["Pero yo y mi casa serviremos a Jehová.","Josué 24:15"],["Entrad por sus puertas con acción de gracias, por sus atrios con alabanza; alabadle, bendecid su nombre.","Salmo 100:4"],["Gozosos en la esperanza; sufridos en la tribulación; constantes en la oración.","Romanos 12:12"],["Porque por fe andamos, no por vista.","2 Corintios 5:7"],["Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.","Salmo 37:4"],["Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán.","Isaías 40:31"],["Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová, que hizo los cielos y la tierra.","Salmo 121:1-2"],["Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos.","Mateo 5:16"],["El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.","Salmo 91:1"],["Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.","Filipenses 4:7"],["Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.","Lamentaciones 3:22-23"],["La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.","Juan 14:27"],["Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.","Salmo 118:24"]];
var hv=$('#heroVerse');
if(hv){var n=new Date(),doy=Math.floor((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(n.getFullYear(),0,0))/864e5),v=V[doy%V.length];
  hv.textContent='«'+v[0]+'»';$('#heroCita').textContent=v[1].toUpperCase()}

/* ---------- Lector de contenido (Decap CMS → GitHub) ---------- */
function parseMd(t){var m=t.replace(/\r/g,'').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);if(!m)return null;var o={body:(m[2]||'').trim()};
  m[1].split('\n').forEach(function(l){var k=l.match(/^([\w_]+):\s*(.*)$/);if(k)o[k[1]]=k[2].replace(/^["']|["']$/g,'')});return o}
function cms(folder){return new Promise(function(res){
  var key='idd_'+folder,c;try{c=JSON.parse(sessionStorage.getItem(key))}catch(e){}
  if(c&&Date.now()-c.t<300000)return res(c.d);
  fetch('https://api.github.com/repos/'+REPO+'/contents/content/'+folder).then(function(r){return r.json()}).then(function(fs){
    if(!Array.isArray(fs))return res([]);
    return Promise.all(fs.filter(function(f){return /\.md$/.test(f.name)}).map(function(f){return fetch(f.download_url).then(function(r){return r.text()}).then(parseMd).catch(function(){return null})})).then(function(a){
      a=a.filter(Boolean);try{sessionStorage.setItem(key,JSON.stringify({t:Date.now(),d:a}))}catch(e){}res(a)})
  }).catch(function(){res([])})})}
function lim(el,a){var n=+(el&&el.dataset.limit);return n?a.slice(0,n):a}
function reveal(el){el.classList.add('rv','in')}

/* ---------- Mensajes ---------- */
var SER_DEF=[{title:'Firmeza en Tiempos de Cambio',category:'Servicio Dominical',author:'Iglesia de Dios',summary:'Un mensaje sobre permanecer anclados en la fe frente a las adversidades cotidianas.',body:'Este es un mensaje de ejemplo. Cuando publiques desde el panel admin, tus mensajes aparecerán aquí automáticamente.',video_url:'',date:''}];
var sc=$('#sermonsContainer');
if(sc)cms('predicas').then(function(a){
  a=a.length?a:SER_DEF;a.sort(function(x,y){return new Date(y.date||0)-new Date(x.date||0)});a=lim(sc,a);sc.innerHTML='';
  a.forEach(function(s){var c=document.createElement('div');reveal(c);c.className+=' media-card';
    var d=s.date&&!isNaN(new Date(s.date))?new Date(s.date).toLocaleDateString('es-AR',{day:'numeric',month:'long',year:'numeric'}):'';
    c.innerHTML='<div class="media-thumb"><div class="play-icon">▶</div></div><div class="media-info"><span>'+esc(s.category||'Servicio General')+(d?' · '+d:'')+'</span><h3>'+esc(s.title||'Mensaje')+'</h3><p>'+esc(s.summary||s.body.substring(0,120)+'…')+'</p></div>';
    c.onclick=function(){openSermon(s,d)};sc.appendChild(c)})});
function openSermon(s,d){
  $('#mTitle').textContent=s.title||'Mensaje';$('#mCategory').textContent=s.category||'Mensaje';
  $('#mAuthor').textContent='👤 '+(s.author||'Iglesia de Dios');$('#mDate').textContent='📅 '+(d||'Reciente');
  $('#mBody').innerHTML=(window.marked&&s.body)?marked.parse(s.body):'<p>'+esc(s.body||'Sin contenido adicional.')+'</p>';
  var f=$('#mVideo'),u=s.video_url||'';
  if(u){u=u.replace('watch?v=','embed/').replace('youtu.be/','www.youtube.com/embed/');f.src=u;f.style.display='block'}else{f.style.display='none';f.src=''}
  $('#sermonModal').classList.add('active');document.body.style.overflow='hidden'}
window.closeSermonModal=function(){$('#sermonModal').classList.remove('active');$('#mVideo').src='';document.body.style.overflow=''};

/* ---------- Horarios ---------- */
var DN=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
var HOR_DEF=[[2,'20:00','Red de Adoración',''],[3,'19:30','Estudio Bíblico','Enseñanza'],[4,'19:30','Red de Mujeres',''],[5,'19:30','Red de Hombres',''],[5,'21:30','Red de Jóvenes','Jóvenes'],[6,'17:30','Red de Niños','Infantil'],[6,'20:00','Servicio General','Principal'],[0,'20:00','Servicio Dominical','Principal']].map(function(a){return {dia:a[0],hora:a[1],nombre:a[2],etiqueta:a[3]}});
function nextDate(h){var p=String(h.hora).split(':'),t=new Date(),now=new Date();t.setHours(+p[0]||0,+p[1]||0,0,0);t.setDate(now.getDate()+((+h.dia-now.getDay()+7)%7));if(t<now)t.setDate(t.getDate()+7);return t}
var hc=$('#servicesContainer'),cdt;
if(hc||$('#countdown'))cms('horarios').then(function(a){
  a=a.length?a:HOR_DEF;a=a.map(function(h){h.dia=+h.dia;h.next=nextDate(h);return h}).sort(function(x,y){return x.next-y.next});
  var first=a[0];
  if(hc){hc.innerHTML='';lim(hc,a).forEach(function(h,i){var r=document.createElement('div');reveal(r);r.className+=' row'+(h.dia===new Date().getDay()?' today':'');r.style.setProperty('--d',i*80+'ms');
    r.innerHTML='<span class="d">'+DN[h.dia]+'</span><span class="t">'+esc(h.hora)+'</span><span class="n">'+esc(h.nombre)+'</span>'+(h.etiqueta?'<span class="g">'+esc(h.etiqueta)+'</span>':'');hc.appendChild(r)})}
  var nt=$('#nt');if(nt&&first)nt.textContent=first.nombre+' · '+DN[first.dia]+' '+first.hora+' hs';
  if($('#countdown')&&first){function tick(){var d=first.next-new Date();if(d<0){$('#countdown').innerHTML='<b>¡Reunión en curso!</b>';return}
    $('#cd-days').textContent=pad(Math.floor(d/864e5));$('#cd-hours').textContent=pad(Math.floor(d%864e5/36e5));$('#cd-mins').textContent=pad(Math.floor(d%36e5/6e4));$('#cd-secs').textContent=pad(Math.floor(d%6e4/1e3))}
    tick();clearInterval(cdt);cdt=setInterval(tick,1000)}});

/* ---------- Redes ---------- */
var RED_DEF=[["Niños","Aprender de Dios en un ambiente seguro, lúdico y lleno de amor."],["Adolescentes","Formando una fe sólida entre amigos y buenos valores."],["Jóvenes","Propósito de vida, comunidad activa y compromiso espiritual."],["Mujeres","Un espacio de apoyo, oración, edificación y crecimiento continuo."],["Hombres","Fortaleciendo el liderazgo familiar y la fe en lo cotidiano."],["Intercesión","Unidos en oración continua por las familias y nuestra ciudad."],["Evangelización","Compartiendo la buena noticia y sirviendo al prójimo."],["Multimedia","Creatividad, sonido y tecnología al servicio de la iglesia."],["Adoración","Guiando a la congregación a alabar a Dios con excelencia."]].map(function(a,i){return {nombre:a[0],descripcion:a[1],orden:i+1}});
var gr=$('#grid');
if(gr)cms('redes').then(function(a){
  a=(a.length?a:RED_DEF).sort(function(x,y){return (+x.orden||99)-(+y.orden||99)});
  function draw(q){gr.innerHTML='';var c=0,list=q?a:lim(gr,a);list.forEach(function(r,i){
    if(q&&(r.nombre+' '+r.descripcion).toLowerCase().indexOf(q.toLowerCase())<0)return;
    var d=document.createElement('div');reveal(d);d.className+=' card';d.style.setProperty('--d',c++%3*100+'ms');
    d.innerHTML='<span class="ar">→</span><i>'+pad(i+1)+'</i><div><h3>'+esc(r.nombre)+'</h3><p>'+esc(r.descripcion)+'</p></div>';gr.appendChild(d)});
    if(!c)gr.innerHTML='<div class="empty">No encontramos redes con esa búsqueda.</div>'}
  draw('');var si=$('#searchInput');if(si)si.addEventListener('input',function(e){draw(e.target.value)})});

/* ---------- Historia (reels que se deslizan solos hacia la izquierda) ---------- */
var rt=$('#reelTrack');
if(rt)cms('historia').then(function(a){
  a.sort(function(x,y){return (+x.orden||99)-(+y.orden||99)});var base;
  if(a.length){base=a.slice();while(base.length<7)base=base.concat(a)}else base=['Pronto compartiremos aquí nuestra historia.','Las fotos se agregan desde el panel admin.','Cada momento cuenta.','Una familia, muchas historias.','Gracias por ser parte.','Dios sigue escribiendo.','Te esperamos.'].map(function(t){return {ph:t}});
  var h=base.map(function(s){return s.ph?'<div class="reel ph">'+esc(s.ph)+'</div>':'<div class="reel"><div class="bars"></div><img loading="lazy" src="'+esc(s.imagen)+'" alt="'+esc(s.titulo)+'"><div class="cap"><b>'+esc(s.titulo)+'</b>'+(s.anio?'<small>'+esc(s.anio)+'</small>':'')+'</div></div>'}).join('');
  rt.innerHTML=h+h;rt.style.setProperty('--dur',base.length*6+'s')});

/* ---------- Playlist ---------- */
var pl=$('#playerRoot');
if(pl)cms('playlist').then(function(a){
  var q=$('#queue');a.sort(function(x,y){return (+x.orden||99)-(+y.orden||99)});
  if(!a.length){pl.innerHTML='<div class="empty">Aún no hay canciones. Agrégalas desde el panel admin → Playlist.</div>';return}
  var I={prev:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM9.5 12 18 6v12z"/></svg>',next:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 18V6l8.5 6z"/></svg>',play:'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>'};
  var au=new Audio(),cur=-1,shuf=false,rep=false,$p=$('#pp');au.preload='metadata';
  $('#pv').innerHTML=I.prev;$('#nx').innerHTML=I.next;$p.innerHTML=I.play;
  q.innerHTML=a.map(function(t,i){return '<div class="track" data-i="'+i+'"><span class="n"><span>'+(i+1)+'</span><div class="eq"><i></i><i></i><i></i></div></span>'+(t.portada?'<img src="'+esc(t.portada)+'" alt="">':'<div class="th"></div>')+'<div><b>'+esc(t.titulo)+'</b><small>'+esc(t.artista||'')+'</small></div></div>'}).join('');
  function fmt(s){s=isFinite(s)?s:0;return Math.floor(s/60)+':'+pad(Math.floor(s%60))}
  function load(i,go){cur=(i+a.length)%a.length;var t=a[cur];au.src=t.audio;$('#tTitle').textContent=t.titulo;$('#tArtist').textContent=t.artista||'';
    $('#cover').innerHTML=t.portada?'<img src="'+esc(t.portada)+'" alt="">':'♪';
    $$('.track').forEach(function(e,k){e.classList.toggle('cur',k===cur)});if(go)au.play().catch(function(){})}
  function nxt(){load(shuf&&a.length>1?(cur+1+Math.floor(Math.random()*(a.length-1)))%a.length:cur+1,true)}
  q.addEventListener('click',function(e){var t=e.target.closest('.track');if(!t)return;var i=+t.dataset.i;if(i===cur){au.paused?au.play():au.pause()}else load(i,true)});
  $p.onclick=function(){cur<0?load(0,true):(au.paused?au.play():au.pause())};
  $('#nx').onclick=nxt;$('#pv').onclick=function(){au.currentTime>3?au.currentTime=0:load(cur-1,true)};
  $('#shuf').onclick=function(){shuf=!shuf;this.classList.toggle('on',shuf)};$('#rep').onclick=function(){rep=!rep;this.classList.toggle('on',rep)};
  function sync(){var pl_=!au.paused;$p.innerHTML=pl_?I.pause:I.play;$('.now').classList.toggle('playing',pl_);$$('.track').forEach(function(e,k){e.classList.toggle('pl',pl_&&k===cur)})}
  au.onplay=au.onpause=sync;au.onended=function(){if(rep||cur<a.length-1)rep&&cur===a.length-1?load(0,true):nxt();else sync()};
  var sk=$('#seek');au.ontimeupdate=function(){var p=au.duration?au.currentTime/au.duration*100:0;sk.value=p;sk.style.setProperty('--v',p+'%');$('#cT').textContent=fmt(au.currentTime);$('#dT').textContent=fmt(au.duration)};
  au.onloadedmetadata=function(){$('#dT').textContent=fmt(au.duration)};
  sk.oninput=function(){if(au.duration)au.currentTime=sk.value/100*au.duration};
  var vo=$('#vol');vo.oninput=function(){au.volume=vo.value/100;vo.style.setProperty('--v',vo.value+'%')};vo.style.setProperty('--v','80%');au.volume=.8;
  load(0,false)});

/* ---------- Atención (formulario → Netlify Forms) ---------- */
var pf=$('#prayerForm'),ts=$('#toast');
function toast(m){$('#toastMsg').textContent=m;ts.classList.add('show');setTimeout(function(){ts.classList.remove('show')},4000)}
if(pf)pf.addEventListener('submit',function(e){e.preventDefault();var nm=pf.elements.nombre.value;
  fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(pf)).toString()})
    .then(function(r){if(!r.ok)throw 0;toast('Gracias '+nm+', recibimos tu mensaje. Nos pondremos en contacto.');pf.reset()})
    .catch(function(){toast('No pudimos enviar el mensaje. Intenta nuevamente en unos minutos.')})});

/* ---------- Reveal, scroll, enlace activo ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
$$('.rv:not(.in)').forEach(function(el){io.observe(el)});
var bar=$('#bar'),hd=$('#hd'),bl=$$('.blob'),tk=false;
function onS(){var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?y/h:0)+')';hd.classList.toggle('s',y>30);bl.forEach(function(b){b.style.transform='translate3d(0,'+y*b.dataset.p+'px,0)'});tk=false}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
var links=$$('#nv a:not(.cta)');
if(links.length&&$('#mensajes')){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  ['mensajes','horarios','redes','historia','playlist','atencion'].forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)})}
var y=$('#y');if(y)y.textContent=new Date().getFullYear();
if(window.netlifyIdentity)window.netlifyIdentity.on('init',function(u){if(!u)window.netlifyIdentity.on('login',function(){location.href='/admin/'})});
})();
