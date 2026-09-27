
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function setupNav(){
  const menu=$('.menu'), links=$('.nav-links');
  if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
}
function setupReveal(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
  $$('.reveal').forEach(e=>io.observe(e));
}
let selectedRequest='Запрос';
function openForm(type='Узнать стоимость'){
  selectedRequest=type;
  const modal=$('#formModal'); if(!modal)return;
  $('#modalTitle').textContent=type;
  $('#formSub').textContent=type.includes('диагност')?'Оставьте контакты — менеджер расскажет о формате диагностики и стоимости.':'Оставьте контакты — менеджер подберёт формат обучения и расскажет о стоимости.';
  $('#leadForm').style.display='grid'; $('#success').style.display='none';
  modal.classList.add('show'); document.body.style.overflow='hidden';
}
function closeForm(){const m=$('#formModal');if(m){m.classList.remove('show');document.body.style.overflow=''} }
function bindForms(){
  $$('.js-price').forEach(b=>b.addEventListener('click',()=>openForm(b.dataset.course||'Узнать стоимость')));
  const form=$('#leadForm');
  if(form) form.addEventListener('submit',e=>{
    e.preventDefault();
    $('#leadForm').style.display='none'; $('#success').style.display='block';
  });
  const m=$('#formModal');
  if(m)m.addEventListener('click',e=>{if(e.target===m)closeForm()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeForm()});
}
function setupSlider(){
 const track=$('#reviewsTrack'); if(!track)return;
 let index=0;
 const cards=()=>$$('.review');
 function move(dir){
   const count=cards().length;
   const visible=window.innerWidth<850?1:3;
   const max=Math.max(0,count-visible); index=Math.max(0,Math.min(max,index+dir));
   const gap=18; const width=cards()[0].getBoundingClientRect().width+gap;
   track.style.transform=`translateX(${-index*width}px)`;
 }
 $('#prev')?.addEventListener('click',()=>move(-1)); $('#next')?.addEventListener('click',()=>move(1));
 window.addEventListener('resize',()=>move(0));
}
function init(){
 setupNav(); setupReveal(); bindForms(); setupSlider();
 $$('.year').forEach(x=>x.textContent=new Date().getFullYear());
}
document.addEventListener('DOMContentLoaded',init);
