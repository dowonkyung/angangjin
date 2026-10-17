(function(){
 const routes={'조직도':'organization.html','총괄 조직도':'organization.html','자유게시판':'free.html','칭찬게시판':'praise.html','열린구청장실':'mayor.html','구청장실':'mayor.html','공약과 실천':'mayor.html#promise','공약과실천':'mayor.html#promise','포토갤러리':'photo.html','영상갤러리':'video.html','민원/제안/신고':'civil.html','민원참여':'civil.html','오시는 길':'directions.html','청사 안내':'building.html','역대 구청장':'mayors.html','안강진 역사':'history.html','안강진구 연혁':'history.html','행정구역':'administration.html','구민의 노래(구가)':'song.html','구의 동식물':'nature.html','구의 상징':'symbols.html','새소식':'news.html','고시 공고':'notice.html','입찰 공고':'bid.html','입법 예고':'legislation.html','일반 공고':'general.html','안강진 구보':'gazette.html','보도자료':'press.html','기자회견(브리핑)':'briefing.html','사실은 이렇습니다':'facts.html'};
 const side=document.querySelector('.lnb-list');if(side&&!document.body.dataset.communityBoard&&!['sitemap','symbols','song','nature','administration','history','mayors','building','directions','civil','organization'].includes(document.body.dataset.boardMode)){const current=window.BoardContext?.key||'news';const groups=[{label:'새소식',href:'news.html',keys:['news'],children:[]},{label:'고시 공고',href:'notice.html',keys:['notice','bid','legislation','general','gazette'],children:['고시 공고','입찰 공고','입법 예고','일반 공고','안강진 구보']},{label:'언론 보도',href:'press.html',keys:['press','briefing','facts'],children:['보도자료','기자회견(브리핑)','사실은 이렇습니다']}];side.innerHTML='<h2>안강진소식</h2><ul>'+groups.map(g=>{const active=g.keys.includes(current);return '<li'+(active?' class="active"':'')+'><div class="depth2"><a href="'+g.href+'"'+(!g.children.length&&active?' aria-current="page"':'')+'>'+g.label+'</a></div>'+(g.children.length?'<div class="depth3" style="display:'+(active?'block':'none')+'"><ul>'+g.children.map(label=>{const href=routes[label]||'#none',selected=href===current+'.html';return '<li'+(selected?' class="active"':'')+'><a href="'+href+'"'+(selected?' aria-current="page"':'')+(!routes[label]?' data-page="'+label+'"':'')+'>'+label+'</a></li>'}).join('')+'</ul></div>':'')+'</li>'}).join('')+'</ul>'}

 // Reference LNB: one expanded group, animated height, and keyboard support.
 if(side){
  const groups=[...side.querySelectorAll(':scope>ul>li')].map(row=>({row,trigger:row.querySelector(':scope>.depth2>a'),panel:row.querySelector(':scope>.depth3')})).filter(g=>g.trigger&&g.panel);
  const animations=new Map();
  function setExpanded(group,open,animate=true){
   const {row,trigger,panel}=group,previous=animations.get(panel),from=panel.hidden?0:panel.getBoundingClientRect().height;
   if(previous){previous.cancel();animations.delete(panel)}
   row.classList.toggle('active',open);trigger.setAttribute('aria-expanded',String(open));trigger.title=open?'접기':'펼치기';panel.inert=!open;panel.hidden=false;panel.style.removeProperty('display');panel.style.height='auto';
   if(!animate||matchMedia('(prefers-reduced-motion:reduce)').matches){panel.hidden=!open;return}
   const to=open?panel.scrollHeight:0;
   const animation=panel.animate([{height:from+'px'},{height:to+'px'}],{duration:260,easing:'ease-in-out'});
   animations.set(panel,animation);
   animation.finished.then(()=>{if(animations.get(panel)!==animation)return;panel.hidden=!open;panel.style.height='auto';animations.delete(panel)}).catch(()=>{});
  }
  let opened=false;
  groups.forEach((group,index)=>{const {trigger,panel,row}=group;trigger.classList.add('arrow');trigger.setAttribute('role','button');panel.classList.add('depth');if(!panel.id)panel.id='lnb-depth-'+index;trigger.setAttribute('aria-controls',panel.id);const open=!opened&&row.classList.contains('active');if(open)opened=true;setExpanded(group,open,false);
   function toggle(e){e.preventDefault();e.stopImmediatePropagation();const open=trigger.getAttribute('aria-expanded')!=='true';if(open)side.querySelectorAll(':scope>ul>li').forEach(row=>{if(row!==group.row)row.classList.remove('active')});groups.forEach(other=>{if(other!==group&&other.trigger.getAttribute('aria-expanded')==='true')setExpanded(other,false)});setExpanded(group,open)}
   trigger.addEventListener('click',toggle);trigger.addEventListener('keydown',e=>{if(e.key===' '){toggle(e)}});
  });
 }

 function hrefFor(a){if(routes[a.dataset.page])return routes[a.dataset.page];const article=a.dataset.article;if(article){const split=article.lastIndexOf(':'),name=article.slice(0,split);if(routes[name])return routes[name]+'?id=sample-'+(Number(article.slice(split+1))+1)}return null}
 document.querySelectorAll('[data-page],[data-article]').forEach(a=>{const href=hrefFor(a);if(href&&a.tagName==='A')a.href=href});
 document.addEventListener('click',e=>{const a=e.target.closest('[data-page],[data-article]');if(!a||a.hasAttribute('aria-expanded'))return;const href=hrefFor(a);if(!href)return;e.preventDefault();e.stopImmediatePropagation();if(e.ctrlKey||e.metaKey)window.open(href,'_blank','noopener');else location.href=href},true);

 // Keep the current municipal page selected independently of an opened menu.
 const pageFile=(location.pathname.split('/').pop()||'index.html').replace(/-(write|preview)\.html$/,'.html').replace('organization-directory.html','organization.html');
 const currentLeaf=[...document.querySelectorAll('#gnb a[data-page]')].find(a=>!a.closest('.tit')&&routes[a.dataset.page]===pageFile);
 if(currentLeaf){const top=currentLeaf.closest('#gnb>ul>li'),item=currentLeaf.closest('.gnb-wrap .wrap>ul>li');currentLeaf.setAttribute('aria-current','page');top.classList.add('current-section');item.classList.add('current-item');function selectCurrent(){[...item.parentElement.children].forEach(row=>{row.classList.toggle('active',row===item);if(row.querySelector('.depth3-wrap'))row.firstElementChild.setAttribute('aria-expanded',String(row===item));else row.firstElementChild.removeAttribute('aria-expanded')})}top.firstElementChild.addEventListener('click',selectCurrent);selectCurrent();}

 const config=window.ANGANGJIN_BOARD_CONFIG,panel=document.querySelector('#news-list');
 if(document.body.classList.contains('board-page')||!panel||!config?.supabaseUrl||!config?.publishableKey)return;
 const types={'고시 공고':'notice','입찰 공고':'bid','입법 예고':'legislation','일반 공고':'general'},cache=new Map();
 const selected=()=>document.querySelector('#tabs [aria-selected=true]')?.textContent;
 function message(text){const p=document.createElement('p');p.className='empty';p.textContent=text;panel.replaceChildren(p)}
 function render(rows,name){if(!rows.length){message('등록된 '+name+'이 없습니다.');return}panel.replaceChildren();for(const row of rows){const div=document.createElement('div');div.className='cont';const p=document.createElement('p'),a=document.createElement('a'),span=document.createElement('span');a.href=routes[name]+'?id='+encodeURIComponent(row.id);span.textContent=row.title;a.append(span);p.append(a);const date=document.createElement('div');date.className='date';for(const value of [row.department,new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(row.created_at))]){const part=document.createElement('span');part.textContent=value;date.append(part)}div.append(p,date);panel.append(div)}}
 async function load(name){if(!routes[name])return;const more=document.querySelector('.notice-list .more-btn');if(more)more.href=routes[name];if(cache.has(name)){render(cache.get(name),name);return}message('소식을 불러오는 중입니다.');try{await window.HeaderAuth.ready;const client=window.HeaderAuth.client;if(!client)throw Error('연결되지 않았습니다.');let query=client.from(name==='보도자료'?'publication_posts':types[name]?'notice_posts':'news_posts').select('id,title,department,created_at').eq('status','published');if(types[name])query=query.eq('board_type',types[name]);if(name==='보도자료')query=query.eq('board_type','press');const r=await query.order('created_at',{ascending:false}).limit(5);if(r.error)throw r.error;cache.set(name,r.data);if(selected()===name)render(r.data,name)}catch{if(selected()===name)message(name+'을 불러오지 못했습니다. 게시판 연결 상태를 확인해 주세요.')}}
 if(typeof window.renderNews==='function'){const original=window.renderNews;window.renderNews=function(name){original(name);load(name)}}
 load(selected()||'새소식');
})();
