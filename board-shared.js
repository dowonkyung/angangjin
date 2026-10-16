const menu={ '안강진소식':{'새소식':[],'고시 공고':['고시 공고','입찰 공고','입법 예고','일반 공고','안강진 구보'],'언론 보도':['보도자료','기자회견(브리핑)','사실은 이렇습니다']},'민원참여':{'민원/제안/신고':[],'구민의견':['자유게시판','칭찬게시판']},'안강진소개':{'안강진구 소개':['구의 상징','구의 동식물','구민의 노래(구가)','행정구역'],'안강진 역사':['안강진구 연혁','역대 구청장'],'총괄 조직도':['조직도','업무 검색'],'청사 안내':['청사 안내','청사개방시설 안내','오시는 길'],'교류 도시':['국외','국내']}};
const $=s=>document.querySelector(s);
const navList=document.querySelector('#gnb>ul');
for(const [name,groups] of Object.entries(menu)){
 const li=document.createElement('li'),a=document.createElement('a');a.href='#none';a.textContent=name;a.setAttribute('aria-expanded','false');a.title='하위 메뉴 열기';
 const panel=document.createElement('div');panel.className='gnb-wrap type-depth3';panel.id='gnb-panel-'+navList.children.length;a.setAttribute('aria-controls',panel.id);
 const inner=document.createElement('div');inner.className='inner';const wrap=document.createElement('div');wrap.className='wrap';const ul=document.createElement('ul');
 for(const [title,children] of Object.entries(groups)){
  const item=document.createElement('li'),link=document.createElement('a');link.href='#none';link.textContent=title;link.dataset.page=title;item.append(link);
  if(children.length){delete link.dataset.page;link.setAttribute('aria-expanded','false');const depth=document.createElement('div');depth.className='depth3-wrap';const list=document.createElement('ul');for(const child of children){const row=document.createElement('li'),childLink=document.createElement('a');childLink.href='#none';childLink.textContent=child;childLink.dataset.page=child;row.append(childLink);list.append(row)}const titleBlock=document.createElement('div');titleBlock.className='tit';const titleLink=document.createElement('a');titleLink.href='#none';titleLink.dataset.page=title;titleLink.append(document.createTextNode(title));titleBlock.append(titleLink);depth.append(titleBlock,list);item.append(depth);const select=()=>{[...ul.children].forEach(row=>{row.classList.remove('active');if(row.querySelector('.depth3-wrap'))row.firstElementChild.setAttribute('aria-expanded','false');else row.firstElementChild.removeAttribute('aria-expanded')});item.classList.add('active');link.setAttribute('aria-expanded','true')};link.onclick=e=>{e.preventDefault();select()};if(ul.children.length===0){item.classList.add('active');link.setAttribute('aria-expanded','true')}}ul.append(item);
 }
 wrap.append(ul);inner.append(wrap);panel.append(inner);li.append(a,panel);navList.append(li);
 a.onclick=e=>{e.preventDefault();const active=li.classList.contains('active');closeGnb();li.classList.toggle('active',!active);a.setAttribute('aria-expanded',String(!active))};
}
function closeGnb(){document.querySelectorAll('#gnb>ul>li').forEach(li=>{li.classList.remove('active');li.firstElementChild.setAttribute('aria-expanded','false')})}
const bottom=document.querySelector('.header-bottom'),all=document.querySelector('#menuAll');
all.onclick=e=>{e.preventDefault();const open=!bottom.classList.contains('all-open');closeGnb();bottom.classList.toggle('all-open',open);all.setAttribute('aria-expanded',String(open));if(open&&matchMedia('(max-width:1023px)').matches)navList.firstElementChild.firstElementChild.click()};
function closeAll(){bottom.classList.remove('all-open');all.setAttribute('aria-expanded','false');closeGnb()}
document.querySelector('.mobile-close a').onclick=e=>{e.preventDefault();closeAll();all.focus()};
const toggles=document.querySelectorAll('.top-menu .button-bottom,.total-search');
toggles.forEach(a=>a.onclick=e=>{e.preventDefault();const open=a.getAttribute('aria-expanded')!=='true';closeDropdowns();a.setAttribute('aria-expanded',String(open));document.getElementById(a.getAttribute('aria-controls')).hidden=!open;if(a.classList.contains('total-search')&&open)document.querySelector('#applyTotalSearchTop').focus()});
function closeDropdowns(){toggles.forEach(a=>{a.setAttribute('aria-expanded','false');document.getElementById(a.getAttribute('aria-controls')).hidden=true})}
document.addEventListener('click',e=>{if(!e.target.closest('.header-bottom')&&!e.target.closest('#menuAll'))closeAll();if(!e.target.closest('.top-menu')&&!e.target.closest('.total-search')&&!e.target.closest('.header-search'))closeDropdowns();if(e.target.closest('a[href="#none"]'))e.preventDefault()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();closeDropdowns();all.focus()}});
document.querySelectorAll('[data-zoom]').forEach(a=>a.onclick=e=>{e.preventDefault();document.body.style.zoom=a.dataset.zoom;document.querySelectorAll('[data-zoom]').forEach(z=>z.classList.toggle('active',z===a));closeDropdowns()});
function headerSearch(){const q=document.querySelector("#applyTotalSearchTop").value;location.href="news.html?q="+encodeURIComponent(q)}
document.querySelector('.header-search-btn').onclick=e=>{e.preventDefault();headerSearch()};document.querySelector('#applyTotalSearchTop').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();headerSearch()}};

function detail(title,text){$('#detail-title').textContent=title;$('#detail-body').textContent=text;if(!$('#detail').open)$('#detail').showModal()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-page]');if(a){e.preventDefault();detail(a.dataset.page,'이 메뉴의 상세 서비스는 준비 중입니다.')}});$('#close-detail').onclick=()=>$('#detail').close();
