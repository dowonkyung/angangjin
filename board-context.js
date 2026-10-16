(function(){
 const key=document.body.dataset.boardType;
 const labels={notice:'고시 공고',bid:'입찰 공고',legislation:'입법 예고',general:'일반 공고'};
 if(!labels[key])return;
 window.BoardContext={key,label:labels[key],list:key+'.html',write:key+'-write.html',preview:key+'-preview.html',isNotice:true};
})();
