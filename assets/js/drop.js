(function(){
  const root = document.getElementById('drop-root');
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  if(!slug){ root.innerHTML = '<p>Missing drop slug.</p>'; return; }

  function shareLinks(url, title){
    return `<div style="margin:16px 0;">
      <strong>Share:</strong>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank">LinkedIn</a> ·
      <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}" target="_blank">X</a>
    </div>`;
  }

  fetch('/data/drops.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(json => {
      const drops = (json.drops||[]);
      const idx = drops.findIndex(d => d.slug === slug);
      if(idx === -1){ root.innerHTML = '<p>Drop not found.</p>'; return; }
      const item = drops[idx]; const prev = drops[idx+1]; const next = drops[idx-1];
      const url = `${location.origin}/drops/?slug=${encodeURIComponent(item.slug)}`;
      document.title = `${item.title} — SoulSight`;
      root.innerHTML = `<article>
        <h1>${item.title}</h1>
        <div class="meta">${new Date(item.date).toLocaleDateString()}</div>
        <img src="${item.cover}" alt="${item.title}" style="width:100%;border-radius:10px;" loading="lazy">
        ${item.excerpt ? `<p>${item.excerpt}</p>` : ''}
        ${shareLinks(url, item.title)}
        <nav style="display:flex;justify-content:space-between;margin-top:20px;">
          <div>${prev ? `<a href="/drops/?slug=${encodeURIComponent(prev.slug)}">← ${prev.title}</a>` : ''}</div>
          <div>${next ? `<a href="/drops/?slug=${encodeURIComponent(next.slug)}">${next.title} →</a>` : ''}</div>
        </nav></article>`;
    })
    .catch(()=>{ root.innerHTML = '<p>Unable to load content.</p>'; });
})();