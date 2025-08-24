(function(){
  const PAGE_SIZE = 9;
  let page = 1;
  let drops = [];
  const galleryEl = document.getElementById('gallery');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfo = document.getElementById('pageInfo');

  function cardHTML(item) {
    const href = `/drops/?slug=${encodeURIComponent(item.slug)}`;
    const dateStr = new Date(item.date).toLocaleDateString();
    return `
      <article class="card">
        <a href="${href}">
          <img src="${item.cover}" alt="${item.title}" loading="lazy">
        </a>
        <div class="card-content">
          <h3><a href="${href}">${item.title}</a></h3>
          <p>${item.excerpt || ''}</p>
          <div class="meta">${dateStr}</div>
        </div>
      </article>
    `;
  }

  function render() {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const items = drops.slice(start, end);
    galleryEl.innerHTML = items.map(cardHTML).join('');

    prevBtn && (prevBtn.disabled = page === 1);
    nextBtn && (nextBtn.disabled = end >= drops.length);
    pageInfo && (pageInfo.textContent = `Page ${page} / ${Math.max(1, Math.ceil(drops.length / PAGE_SIZE))}`);
  }

  function setPage(p){ page = p; render(); }
  prevBtn && prevBtn.addEventListener('click', () => setPage(page - 1));
  nextBtn && nextBtn.addEventListener('click', () => setPage(page + 1));

  fetch('/data/drops.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(json => { drops = (json.drops||[]).sort((a,b)=> new Date(b.date)-new Date(a.date)); render(); })
    .catch(()=>{ galleryEl.innerHTML = '<p>Unable to load gallery.</p>'; });
})();