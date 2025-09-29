(function(){
  const OWNER="Elcapitanoe";
  const REPO="Komodo-Build-Prop";

  function getToken(){return (window.GH_TOKEN||"").trim()}
  async function gh(path,{method="GET"}={}){const headers={"Accept":"application/vnd.github+json"};const t=getToken();if(t)headers["Authorization"]=`Bearer ${t}`;return fetch(`https://api.github.com${path}`,{method,headers})}

  function esc(s){return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}
  function fmtDate(s){try{return new Date(s).toLocaleDateString("en-GB",{year:"numeric",month:"short",day:"2-digit"})}catch{return s||""}}
  function pad2(n){return String(n).padStart(2,"0")}
  function tagFromDate(s){const d=new Date(s);if(isNaN(d))return "";const yy=pad2(d.getFullYear()%100);const mm=pad2(d.getMonth()+1);const dd=pad2(d.getDate());return `v${yy}${mm}${dd}`}
  function assetList(items){if(!items||!items.length)return `<p class="muted">No assets</p>`;return `<ul>`+items.map(a=>`<li><a href="${esc(a.browser_download_url)}" target="_blank" rel="noopener noreferrer">${esc(a.name)}</a> <span class="meta">(${(a.download_count??0)}x)</span></li>`).join("")+`</ul>`}

  async function fetchAllReleases(owner,repo){
    let page=1,releases=[];
    while(true){
      const res=await gh(`/repos/${owner}/${repo}/releases?per_page=100&page=${page}`);
      if(!res.ok)throw new Error(`GitHub /releases ${res.status}`);
      const chunk=await res.json();
      releases=releases.concat(chunk);
      const link=res.headers.get("Link")||"";
      if(!link.includes('rel="next"'))break;
      page++;
      if(page>10)break;
    }
    return releases.filter(r=>!r.draft);
  }

  async function main(){
    const latestEl=document.getElementById("latestBlock");
    const prevEl=document.getElementById("previousBlock");

    try{
      const latestRes=await gh(`/repos/${OWNER}/${REPO}/releases/latest`);
      if(!latestRes.ok){const body=await latestRes.text();throw new Error(`GitHub /releases/latest ${latestRes.status}: ${body}`)}
      const latest=await latestRes.json();

      const all=await fetchAllReleases(OWNER,REPO);

      const pub=(latest.published_at||latest.created_at);
      const tag=tagFromDate(pub)||esc(latest.tag_name||latest.name||"Untitled");
      latestEl.innerHTML=`
        <p class="meta"><strong>${esc(tag)}</strong> · published ${esc(fmtDate(pub))}</p>
        ${assetList(latest.assets||[])}
      `;

      const previous=all.filter(r=>r.id!==latest.id);
      const prevAssets=[];
      for(const rel of previous){if(!rel||!rel.assets)continue;for(const a of rel.assets)prevAssets.push(a)}
      prevEl.innerHTML=prevAssets.length?assetList(prevAssets):`<p class="muted">No previous builds</p>`;
    }catch(err){
      const msg=(err&&err.message)?err.message:String(err);
      latestEl.innerHTML=`<div class="err"><strong>Error:</strong> ${esc(msg)}</div>`;
      prevEl.innerHTML="";
    }
  }

  main();
})();