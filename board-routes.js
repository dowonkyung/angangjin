(function(){
 'use strict';
 const root=new URL('.',document.currentScript.src).pathname;
 const keys=['news','notice','bid','legislation','general','gazette','press','briefing','facts'];
 const codes=Object.fromEntries(keys.map((key,i)=>[key,String(1001+i)]));
 const keyForCode=Object.fromEntries(keys.map(key=>[codes[key],key]));
 function list(key){return root+codes[key]}
 function article(key,post){return list(key)+'/'+encodeURIComponent(post.public_id||post.id)}
 function normalize(value){if(value.startsWith('#')&&value!=='#none')return location.pathname+location.search+value;const u=new URL(value,document.baseURI);if(u.origin!==location.origin)return value;const key=keys.find(k=>u.pathname===root+k+'.html');if(!key)return value;const id=u.searchParams.get('id');u.searchParams.delete('id');u.pathname=id?article(key,{id}):list(key);return u.pathname+u.search+u.hash}
 const canonical=normalize(location.href);if(canonical!==location.href&&canonical!==location.pathname+location.search+location.hash)history.replaceState(null,'',canonical);
 const parts=location.pathname.slice(root.length).split('/').filter(Boolean),key=keyForCode[parts[0]];
 const current=key&&parts.length<=2?{key,post:parts[1]||null}:null;
 // A directory index may be redirected to a trailing slash by Pages; keep the displayed address consistent.
 if(current&&parts.length===1&&location.pathname.endsWith('/'))history.replaceState(null,'',list(key)+location.search+location.hash);
 function links(node){if(node.nodeType!==1&&node!==document)return;const items=node.matches?.('a[href]')?[node]:[];for(const a of [...items,...node.querySelectorAll('a[href]')]){const old=a.getAttribute('href'),url=normalize(old);if(url!==old)a.setAttribute('href',url)}}
 window.BoardRoutes={root,codes,current,list,article,normalize};
 document.addEventListener('DOMContentLoaded',()=>{links(document);new MutationObserver(records=>{for(const r of records){if(r.type==='attributes')links(r.target);else for(const n of r.addedNodes)links(n)}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['href']})});
 // Dynamic controls may change their href and be activated before the observer runs.
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a){const old=a.getAttribute('href'),url=normalize(old);if(url!==old)a.setAttribute('href',url)}},true);
})();
