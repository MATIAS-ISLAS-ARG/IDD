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
function ytId(u){var m=String(u||'').match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);return m?m[1]:''}
function thumb(s){return s.thumbnail||(ytId(s.video_url)?'https://i.ytimg.com/vi/'+ytId(s.video_url)+'/hqdefault.jpg':'')}
var SER_DEF=[{title:'Firmeza en Tiempos de Cambio',category:'Servicio Dominical',author:'Iglesia de Dios',summary:'Un mensaje sobre permanecer anclados en la fe frente a las adversidades cotidianas.',body:'Este es un mensaje de ejemplo. Cuando publiques desde el panel admin, tus mensajes aparecerán aquí automáticamente.',video_url:'',date:''}];
var sc=$('#sermonsContainer');
if(sc)cms('predicas').then(function(a){
  a=a.length?a:SER_DEF;a.sort(function(x,y){return new Date(y.date||0)-new Date(x.date||0)});a=lim(sc,a);sc.innerHTML='';
  a.forEach(function(s){var c=document.createElement('div');reveal(c);c.className+=' media-card';
    var d=s.date&&!isNaN(new Date(s.date))?new Date(s.date).toLocaleDateString('es-AR',{day:'numeric',month:'long',year:'numeric'}):'',th=thumb(s);
    c.innerHTML='<div class="media-thumb">'+(th?'<img loading="lazy" src="'+esc(th)+'" alt="Vista previa de '+esc(s.title||'Mensaje')+'" onerror="this.remove()">':'')+'<div class="play-icon">'+(s.video_url?'▶':'📖')+'</div></div><div class="media-info"><span>'+esc(s.category||'Servicio General')+(d?' · '+d:'')+'</span><h3>'+esc(s.title||'Mensaje')+'</h3><p>'+esc(s.summary||s.body.substring(0,120)+'…')+'</p></div>';
    c.onclick=function(){openSermon(s,d)};sc.appendChild(c)})});
function openSermon(s,d){
  $('#mTitle').textContent=s.title||'Mensaje';$('#mCategory').textContent=s.category||'Mensaje';
  $('#mAuthor').textContent='👤 '+(s.author||'Iglesia de Dios');$('#mDate').textContent='📅 '+(d||'Reciente');
  $('#mBody').innerHTML=(window.marked&&s.body)?marked.parse(s.body):'<p>'+esc(s.body||'Sin contenido adicional.')+'</p>';
  var f=$('#mVideo'),u=s.video_url||'',id=ytId(u);
  if(id)u='https://www.youtube.com/embed/'+id;
  if(u){f.src=u;f.style.display='block'}else{f.style.display='none';f.src=''}
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

/* ---------- Historia (reels que se deslizan solos hacia la izquierda) ---------- */
var rt=$('#reelTrack');
if(rt)cms('historia').then(function(a){
  a.sort(function(x,y){return (+x.orden||99)-(+y.orden||99)});var base;
  if(a.length){base=a.slice();while(base.length<7)base=base.concat(a)}else base=['Pronto compartiremos aquí nuestra historia.','Las fotos se agregan desde el panel admin.','Cada momento cuenta.','Una familia, muchas historias.','Gracias por ser parte.','Dios sigue escribiendo.','Te esperamos.'].map(function(t){return {ph:t}});
  var h=base.map(function(s){return s.ph?'<div class="reel ph">'+esc(s.ph)+'</div>':'<div class="reel"><div class="bars"></div><img loading="lazy" src="'+esc(s.imagen)+'" alt="'+esc(s.titulo)+'"><div class="cap"><b>'+esc(s.titulo)+'</b>'+(s.anio?'<small>'+esc(s.anio)+'</small>':'')+'</div></div>'}).join('');
  rt.innerHTML=h+h;rt.style.setProperty('--dur',base.length*6+'s')});

/* ---------- Radio IDD (música + prédicas desde Google Drive) ---------- */
function driveId(u){var m=String(u||'').match(/\/d\/([\w-]+)|[?&]id=([\w-]+)/);return m?(m[1]||m[2]):null}
function audioSrc(u,alt){u=String(u||'');var id=/drive\.google|docs\.google/.test(u)?driveId(u):null;
  if(!id)return u;return (alt?'https://docs.google.com/uc?export=download&id=':'https://drive.google.com/uc?export=download&id=')+id}
function secs(v){if(v==null||v==='')return 0;var p=String(v).split(':').map(Number);if(p.some(isNaN))return 0;return p.length===1?p[0]*60:p.reduce(function(a,b){return a*60+b})}
function fmt(s){s=isFinite(s)?s:0;var h=Math.floor(s/3600),m=Math.floor(s%3600/60);return (h?h+':'+pad(m):m)+':'+pad(Math.floor(s%60))}
var pl=$('#playerRoot');
if(pl)cms('playlist').then(function(all){
  all=all.filter(function(t){return (t.drive_url||t.audio)&&String(t.activo)!=='false'});
  all.sort(function(x,y){return (+x.orden||99)-(+y.orden||99)});
  if(!all.length){pl.className='';pl.innerHTML='<div class="empty">Aún no hay audios en la radio. Agrégalos desde el panel admin → Radio.</div>';return}
  all.forEach(function(t){t.sec=secs(t.duracion);t.url=t.drive_url||t.audio;t.src=audioSrc(t.url,false);t.k=t.tipo==='predica'?'predica':'musica'});
  var KL={musica:'Música',predica:'Prédica'},KI={musica:'♪',predica:'🎙'};
  var I={prev:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM9.5 12 18 6v12z"/></svg>',next:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 18V6l8.5 6z"/></svg>',play:'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>'};
  var au=new Audio(),cur=null,shuf=false,rep=false,live=false,filter='all',query='',seekTo=0,alt=false,errs=0,started=false,inView=false;
  var liveOK=all.every(function(t){return t.sec>0});
  var q=$('#queue'),$p=$('#pp'),sk=$('#seek'),vo=$('#vol'),now=$('#now'),lb=$('#liveBtn');
  au.preload='none';$('#pv').innerHTML=I.prev;$('#nx').innerHTML=I.next;$p.innerHTML=I.play;
  var mini=$('#mini'),mPP=$('#mPP');if(mPP)mPP.innerHTML=I.play;

  /* filtros */
  var kinds=['musica','predica'].filter(function(k){return all.some(function(t){return t.k===k})}),ch=$('#chips');
  if(kinds.length>1)ch.innerHTML='<button type="button" class="on" data-k="all">Todo</button>'+kinds.map(function(k){return '<button type="button" data-k="'+k+'">'+(k==='musica'?'Música':'Prédicas')+'</button>'}).join('');
  else ch.style.display='none';
  function match(t){return (filter==='all'||t.k===filter)&&(!query||(t.titulo+' '+(t.artista||'')).toLowerCase().indexOf(query)>=0)}
  function ctx(){return all.filter(function(t){return filter==='all'||t.k===filter})}
  function draw(){var h=all.map(function(t,i){if(!match(t))return '';
    return '<div class="track" data-i="'+i+'"><span class="n"><span>'+KI[t.k]+'</span><div class="eq"><i></i><i></i><i></i></div></span>'+(t.portada?'<img loading="lazy" src="'+esc(t.portada)+'" alt="">':'<div class="th"></div>')+'<div><b>'+esc(t.titulo)+'</b><small>'+esc(t.artista||'')+(t.artista?' · ':'')+KL[t.k]+'</small></div><span class="dur">'+(t.sec?fmt(t.sec):'')+'</span></div>'}).join('');
    q.innerHTML=h||'<div class="empty">No encontramos audios con esa búsqueda.</div>';mark()}
  function mark(){var ci=all.indexOf(cur),p=!au.paused;$$('#queue .track').forEach(function(e){var on=+e.dataset.i===ci;e.classList.toggle('cur',on);e.classList.toggle('pl',on&&p)})}

  /* reproducción */
  function play(){var p=au.play();if(p&&p.catch)p.catch(function(){})}
  function cover(t,el){el.innerHTML=t.portada?'<img src="'+esc(t.portada)+'" alt="">':KI[t.k]}
  function load(t,go,off){cur=t;alt=false;seekTo=off||0;au.src=t.src;
    $('#tTitle').textContent=t.titulo;$('#tArtist').textContent=t.artista||'Radio IDD';$('#tKind').textContent=KL[t.k];cover(t,$('#cover'));
    if(mini){$('#mT').textContent=t.titulo;$('#mA').textContent=t.artista||KL[t.k];cover(t,$('#mCover'))}
    $('#cT').textContent='0:00';$('#dT').textContent=t.sec?fmt(t.sec):'0:00';mark();session(t);if(go)play()}
  function idx(){var l=ctx(),i=l.indexOf(cur);return {l:l,i:i}}
  function next(){exitLive();var o=idx(),l=o.l;if(!l.length)return;
    var n=shuf&&l.length>1?(o.i+1+Math.floor(Math.random()*(l.length-1)))%l.length:(o.i+1)%l.length;load(l[n],true)}
  function prev(){exitLive();if(au.currentTime>3){au.currentTime=0;return}var o=idx(),l=o.l;if(!l.length)return;load(l[(o.i-1+l.length)%l.length],true)}
  function tune(){var tot=all.reduce(function(a,t){return a+t.sec},0),p=(Date.now()/1000)%tot,i=0;
    while(i<all.length-1&&p>=all[i].sec){p-=all[i].sec;i++}live=true;load(all[i],true,p);ui()}
  function exitLive(){if(live){live=false;ui()}}
  function ui(){var p=!au.paused;$p.innerHTML=p?I.pause:I.play;if(mPP)mPP.innerHTML=p?I.pause:I.play;
    now.classList.toggle('playing',p);now.classList.toggle('live',live);
    $('#modeLbl').textContent=live?'EN VIVO':(p?'Al aire':'Radio IDD');
    lb.textContent=live?'Salir del en vivo':'Sintonizar en vivo';lb.classList.toggle('on',live);
    sk.disabled=live;$('#pv').disabled=live;$('#nx').disabled=live;
    if(started&&mini)mini.classList.toggle('show',!inView);mark()}
  function toggle(){if(!cur)return live?tune():load(ctx()[0]||all[0],true);
    if(au.paused){live?tune():play()}else au.pause()}

  /* eventos */
  q.addEventListener('click',function(e){var r=e.target.closest('.track');if(!r)return;var t=all[+r.dataset.i];exitLive();
    if(t===cur){au.paused?play():au.pause()}else load(t,true)});
  ch.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;filter=b.dataset.k;
    $$('#chips button').forEach(function(x){x.classList.toggle('on',x===b)});draw()});
  $('#rSearch').addEventListener('input',function(e){query=e.target.value.trim().toLowerCase();draw()});
  $p.onclick=toggle;if(mPP)mPP.onclick=toggle;$('#nx').onclick=next;$('#pv').onclick=prev;
  $('#shuf').onclick=function(){shuf=!shuf;this.classList.toggle('on',shuf)};
  $('#rep').onclick=function(){rep=!rep;this.classList.toggle('on',rep);this.title=rep?'Repetir canción: activado':'Repetir canción'};
  if(liveOK)lb.hidden=false;lb.onclick=function(){live?exitLive():tune()};
  au.onplay=function(){started=true;errs=0;ui()};au.onpause=ui;
  au.onended=function(){if(live)tune();else if(rep){au.currentTime=0;play()}else next()};
  au.ontimeupdate=function(){var d=au.duration||(cur&&cur.sec)||0,p=d?au.currentTime/d*100:0;sk.value=p;sk.style.setProperty('--v',p+'%');$('#cT').textContent=fmt(au.currentTime)};
  au.onloadedmetadata=function(){if(seekTo>0&&au.duration){try{au.currentTime=Math.min(seekTo,Math.max(0,au.duration-2))}catch(e){}}seekTo=0;$('#dT').textContent=fmt(au.duration)};
  au.onwaiting=function(){now.classList.add('buf')};au.onplaying=function(){now.classList.remove('buf')};
  sk.oninput=function(){var d=au.duration||(cur&&cur.sec);if(d&&!live)au.currentTime=sk.value/100*d};
  au.onerror=function(){if(!cur)return;var a=audioSrc(cur.url,true);
    if(!alt&&a!==cur.src){alt=true;au.src=a;play();return}
    if(++errs>all.length){toast('No pudimos reproducir los audios. Revisa que estén compartidos en Drive como «Cualquier persona con el enlace».');return}
    toast('No se pudo reproducir «'+cur.titulo+'». Pasando al siguiente…');next()};
  vo.oninput=function(){au.volume=vo.value/100;vo.style.setProperty('--v',vo.value+'%');try{localStorage.setItem('idd_vol',vo.value)}catch(e){}};
  var sv=80;try{var raw=localStorage.getItem('idd_vol');if(raw!==null&&!isNaN(+raw))sv=+raw}catch(e){}vo.value=sv;vo.oninput();

  /* mini reproductor: aparece al salir de la sección mientras suena */
  var rs=$('#radio');if(rs&&mini)new IntersectionObserver(function(es){inView=es[0].isIntersecting;ui()}).observe(rs);

  /* controles del celular / pantalla bloqueada */
  function session(t){if(!('mediaSession' in navigator))return;try{
    navigator.mediaSession.metadata=new MediaMetadata({title:t.titulo,artist:t.artista||'Radio IDD',album:'Radio IDD',artwork:t.portada?[{src:new URL(t.portada,location.href).href,sizes:'512x512'}]:[]});
    navigator.mediaSession.setActionHandler('play',function(){toggle()});navigator.mediaSession.setActionHandler('pause',function(){au.pause()});
    navigator.mediaSession.setActionHandler('nexttrack',live?null:next);navigator.mediaSession.setActionHandler('previoustrack',live?null:prev)}catch(e){}}

  draw();load(ctx()[0]||all[0],false);ui()});

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
  ['mensajes','horarios','historia','radio','atencion'].forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)})}
var y=$('#y');if(y)y.textContent=new Date().getFullYear();
if(window.netlifyIdentity)window.netlifyIdentity.on('init',function(u){if(!u)window.netlifyIdentity.on('login',function(){location.href='/admin/'})});
})();
