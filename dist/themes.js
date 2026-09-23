(() => {
  const designs = [
    ['original', 'Original', 'The original portfolio', '#ceff62'],
    ['studio', 'Studio', 'Bootstrap · Product studio', '#316bff'],
    ['editorial', 'Editorial', 'Bulma · Editorial portfolio', '#b15335'],
    ['gallery', 'Gallery', 'UIkit · Interface gallery', '#c2c9b0'],
    ['bold', 'Bold', 'Semantic UI · Graphic portfolio', '#fc713a']
  ];
  const match = location.pathname.match(/^\/design\/(studio|editorial|gallery|bold)(\/.*)?$/);
  const current = match ? match[1] : 'original';
  const pagePath = match ? (match[2] || '/') : location.pathname;
  // The URL owns the selection. Original is always accessible without redirects.
  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.createElement('div');
    picker.className = 'design-picker';
    picker.innerHTML = '<button class="design-toggle" type="button" aria-expanded="false" aria-controls="design-panel">Design <span class="design-current"></span><span aria-hidden="true">◐</span></button><div class="design-panel" id="design-panel" role="group" aria-label="Website design" hidden><p>Choose a website</p></div>';
    const toggle = picker.querySelector('.design-toggle');
    const panel = picker.querySelector('.design-panel');
    picker.querySelector('.design-current').textContent = designs.find(([id]) => id === current)[1];
    const close = () => { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    for (const [id, name, description, color] of designs) {
      const link = document.createElement('a');
      link.className = 'design-option';
      link.dataset.design = id;
      link.href = (id === 'original' ? '' : `/design/${id}`) + pagePath + location.search + location.hash;
      if (id === current) link.setAttribute('aria-current', 'page');
      link.innerHTML = `<span class="design-swatch" style="background:${color}" aria-hidden="true"></span><span><strong>${name}</strong><small>${description}</small></span><span class="design-check" aria-hidden="true">✓</span>`;
      panel.append(link);
    }
    toggle.addEventListener('click', () => { panel.hidden = !panel.hidden; toggle.setAttribute('aria-expanded', String(!panel.hidden)); });
    picker.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); toggle.focus(); } });
    document.addEventListener('click', event => { if (!picker.contains(event.target)) close(); });
    document.body.append(picker);
  });
})();
