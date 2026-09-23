(() => {
  const themes = [
    ['original', 'Original', 'Current design', '#ceff62'],
    ['graphite', 'Graphite', 'Dark monochrome', '#e7e7e7'],
    ['ivory', 'Ivory', 'Warm paper & terracotta', '#ad4829'],
    ['midnight', 'Midnight', 'Deep blue & electric cyan', '#70e6ff'],
    ['plum', 'Plum', 'Plum & soft rose', '#f5b7d2']
  ];
  const key = 'wocnerg-design';
  const valid = value => themes.some(([id]) => id === value);
  let current = 'original';
  try { const saved = localStorage.getItem(key); if (valid(saved)) current = saved; } catch (_) {}
  const apply = id => {
    current = valid(id) ? id : 'original';
    if (current === 'original') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = current;
  };
  apply(current);
  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.createElement('div');
    picker.className = 'design-picker';
    picker.innerHTML = '<button class="design-toggle" type="button" aria-expanded="false" aria-controls="design-panel">Design <span class="design-current"></span><span aria-hidden="true">◐</span></button><div class="design-panel" id="design-panel" role="group" aria-label="Website design" hidden><p>Choose a design</p></div>';
    const toggle = picker.querySelector('.design-toggle');
    const panel = picker.querySelector('.design-panel');
    const label = picker.querySelector('.design-current');
    const update = () => {
      label.textContent = themes.find(([id]) => id === current)[1];
      panel.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === current)));
    };
    const close = () => { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    for (const [id, name, description, color] of themes) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.theme = id;
      button.innerHTML = `<span class="design-swatch" style="background:${color}" aria-hidden="true"></span><span><strong>${name}</strong><small>${description}</small></span><span class="design-check" aria-hidden="true">✓</span>`;
      button.addEventListener('click', () => {
        apply(id);
        try { localStorage.setItem(key, id); } catch (_) {}
        update();
      });
      panel.append(button);
    }
    toggle.addEventListener('click', () => { panel.hidden = !panel.hidden; toggle.setAttribute('aria-expanded', String(!panel.hidden)); });
    picker.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); toggle.focus(); } });
    document.addEventListener('click', event => { if (!picker.contains(event.target)) close(); });
    window.addEventListener('storage', event => { if (event.key === key) { apply(event.newValue); update(); } });
    document.body.append(picker);
    update();
  });
})();
