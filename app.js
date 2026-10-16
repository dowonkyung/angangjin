const menu={ '안강진소식':{'새소식':[],'고시 공고':['고시 공고','입찰 공고','입법 예고','일반 공고','안강진 구보'],'언론 보도':['보도자료','기자회견(브리핑)','사실은 이렇습니다']},'민원참여':{'민원/제안/신고':[],'구민의견':['자유게시판','칭찬게시판']},'안강진소개':{'안강진구 소개':['구의 상징','구의 동식물','구민의 노래(구가)','행정구역'],'안강진 역사':['안강진구 연혁','역대 구청장'],'총괄 조직도':['조직도','업무 검색'],'청사 안내':['청사 안내','청사개방시설 안내','오시는 길'],'교류 도시':['국외','국내']}};
const $=s=>document.querySelector(s), mega=$('#mega');
Object.keys(menu).forEach(name=>{const b=document.createElement('button');b.textContent=name;b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','mega');b.onclick=()=>openMenu(name);$('#gnb').append(b)});
function groups(data){return Object.entries(data).map(([name,children])=>`<section class="mega-group"><h3><button data-page="${name}">${name}</button></h3>${children.map(n=>`<button data-page="${n}">· ${n}</button>`).join('')}</section>`).join('')}
let currentMenu='';function openMenu(name){const close=currentMenu===name&&!mega.hidden;mega.hidden=close;currentMenu=close?'':name;if(!close)mega.innerHTML=`<div class="mega-inner">${name==='전체'?Object.values(menu).map(groups).join(''):groups(menu[name])}</div>`;document.querySelectorAll('#gnb button').forEach(b=>b.setAttribute('aria-expanded',String(!close&&b.textContent===name)));$('#all-menu').setAttribute('aria-expanded',String(!close&&name==='전체'))}
$('#all-menu').onclick=()=>openMenu('전체');document.addEventListener('keydown',e=>{if(e.key==='Escape'){mega.hidden=true;currentMenu='';document.querySelectorAll('[aria-controls="mega"]').forEach(b=>b.setAttribute('aria-expanded','false'))}});document.addEventListener('click',e=>{if(!e.target.closest('header')){mega.hidden=true;currentMenu='';document.querySelectorAll('[aria-controls="mega"]').forEach(b=>b.setAttribute('aria-expanded','false'))}});
const serviceNames=['민원/제안/신고','고시 공고','입찰 공고','안강진 구보','자유게시판','칭찬게시판','조직도','업무 검색','청사 안내','오시는 길'];const paths=['M5 3h14v18H5z M8 8h8 M8 12h8 M8 16h5','M4 6h16v14H4z M8 3v6 M16 3v6 M4 11h16','M4 20h16 M7 17l9-9 M12 5l7 7 M10 3l3 3 M17 10l3 3','M3 5h8l1 2 1-2h8v15h-8l-1 1-1-1H3z M12 7v14','M3 4h18v13H9l-5 4v-4H3z M7 9h10 M7 13h7','M8 11V5a3 3 0 0 1 6 0v6h5v10H5V11z','M9 2h6v5H9z M2 17h6v5H2z M16 17h6v5h-6z M12 7v5 M5 17v-5h14v5','M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M15 15l6 6','M3 21h18 M5 21V8l7-5 7 5v13 M9 11v3 M15 11v3 M10 21v-4h4v4','M12 22s8-9 8-14A8 8 0 0 0 4 8c0 5 8 14 8 14z M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0'];
$('#services').innerHTML=serviceNames.map((n,i)=>`<button data-page="${n}"><span class="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[i]}"/></svg></span>${n}</button>`).join('');
const posts={'새소식':['안강진구청 홈페이지에 오신 것을 환영합니다','구민과 함께하는 안강진, 여러분의 의견을 들려주세요','안강진구 청사 및 주요 시설 이용 안내','안강진구의 상징과 이야기를 만나보세요'],'고시 공고':['안강진구 고시·공고 게시판 운영 안내','구정 소식 및 행정정보 공개 안내'],'입찰 공고':['입찰 공고 게시판 이용 안내'],'입법 예고':['입법 예고 및 구민 의견 수렴 안내'],'보도자료':['구민과 함께 여는 안강진구청 홈페이지']};
Object.keys(posts).forEach((n,i)=>{const b=document.createElement('button');b.textContent=n;b.id='tab-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls','news-list');b.onclick=()=>renderNews(n);$('#tabs').append(b)});
function renderNews(n){document.querySelectorAll('#tabs button').forEach(b=>{const active=b.textContent===n;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1});$('#news-list').setAttribute('aria-labelledby',[...$('#tabs').children].find(b=>b.textContent===n).id);$('#news-list').innerHTML=posts[n].map((title,i)=>`<button class="news-row" data-article="${n}:${i}"><small>예시</small><span>${title}</span><time datetime="2026-10-16">2026.10.16</time></button>`).join('')}
$('#tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=[...$('#tabs').children];let i=tabs.indexOf(document.activeElement);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].click();tabs[i].focus()});renderNews('새소식');
const banners=window.ANGANGJIN_BANNERS;
const track=$('#banner-slides');
for(const [index,item] of banners.entries()){
  const slide=document.createElement('div');slide.className='swiper-slide';
  const link=document.createElement(item.href?'a':'button');
  if(item.href)link.href=item.href;else link.dataset.page=item.page||'새소식';
  const image=document.createElement('img');image.src=item.src;image.alt=item.alt;
  image.width=844;image.height=440;image.decoding='async';image.loading=index===0?'eager':'lazy';
  link.append(image);slide.append(link);track.append(slide);
}
$('#slide-total').textContent=banners.length;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const slider=new Swiper('#banner',{
  loop:banners.length>1,speed:reducedMotion.matches?0:500,
  autoplay:reducedMotion.matches?false:{delay:5000,disableOnInteraction:false},
  navigation:{nextEl:'#next',prevEl:'#prev'},
  a11y:{enabled:true,prevSlideMessage:'이전 배너',nextSlideMessage:'다음 배너',slideLabelMessage:'{{index}} / {{slidesLength}}'},
  on:{slideChange(swiper){$('#slide-number').textContent=swiper.realIndex+1}}
});
let stopped=reducedMotion.matches;
function updatePause(){ $('#pause').textContent=stopped?'▷':'Ⅱ';$('#pause').setAttribute('aria-label',stopped?'배너 자동 전환 시작':'배너 자동 전환 정지');$('#pause').setAttribute('aria-pressed',String(stopped)); }
$('#pause').onclick=()=>{stopped=!stopped;if(stopped)slider.autoplay.stop();else slider.autoplay.start();updatePause()};
$('#banner').addEventListener('focusin',()=>slider.autoplay.stop());
$('#banner').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget)&&!stopped)slider.autoplay.start()});
reducedMotion.addEventListener('change',e=>{slider.params.speed=e.matches?0:500;if(e.matches){stopped=true;slider.autoplay.stop();updatePause()}});
updatePause();
function detail(title,text){$('#detail-title').textContent=title;$('#detail-body').replaceChildren();const p=document.createElement('p');p.textContent=text;$('#detail-body').append(p);if(!$('#detail').open)$('#detail').showModal()}
document.addEventListener('click',e=>{const p=e.target.closest('[data-page]');if(p)detail(p.dataset.page,`${p.dataset.page} 메뉴입니다. 현재는 메인화면 시안으로, 해당 메뉴의 상세 페이지와 실제 서비스는 추후 연결될 예정입니다.`);const a=e.target.closest('[data-article]');if(a){const [cat,i]=a.dataset.article.split(':');detail(posts[cat][i],'이 게시물은 홈페이지의 화면 구성을 보여주기 위한 예시입니다. 실제 공고나 시행 중인 정책이 아닙니다.')}const k=e.target.closest('[data-search]');if(k){$('#query').value=k.dataset.search;$('#search').requestSubmit()}});$('#close-detail').onclick=()=>$('#detail').close();$('#detail').onclick=e=>{if(e.target===$('#detail')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}};
$('#search').onsubmit=e=>{e.preventDefault();const q=$('#query').value.trim();if(!q){$('#query').focus();return}const names=[...new Set([...Object.values(menu).flatMap(x=>Object.entries(x).flatMap(([k,v])=>[k,...v])),...Object.values(posts).flat()])];const matches=names.filter(n=>n.includes(q));detail('통합검색',`“${q}” 검색 결과 ${matches.length}건 · 현재 메인화면의 메뉴와 예시 소식에서 검색합니다.`);matches.forEach(n=>{const b=document.createElement('button');b.className='news-row';b.textContent=n;b.onclick=()=>detail(n,'메인화면 시안의 검색 결과입니다. 상세 페이지는 추후 연결될 예정입니다.');$('#detail-body').append(b)})};let large=false;$('#zoom').onclick=()=>{large=!large;document.body.style.zoom=large?'1.1':'1';$('#zoom').textContent=large?'화면크기 −':'화면크기 ＋'};
