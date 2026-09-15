(() => {
  const video = document.getElementById('hero-video');
  const button = document.getElementById('video-toggle');
  if (!video || !button) return;
  const icon = button.querySelector('path');
  let wantsPlayback = true;
  video.muted = true;
  video.defaultMuted = true;
  button.hidden = false;
  function syncButton() {
    const playing = !video.paused;
    const label = playing ? 'Pause background video' : 'Play background video';
    button.setAttribute('aria-label', label);
    button.title = label;
    icon.setAttribute('d', playing ? 'M6 5h4v14H6zM14 5h4v14h-4z' : 'M8 5v14l11-7Z');
  }
  async function play() {
    try { await video.play(); } catch { syncButton(); }
  }
  button.addEventListener('click', () => {
    wantsPlayback = video.paused;
    if (wantsPlayback) play(); else video.pause();
  });
  video.addEventListener('play', syncButton);
  video.addEventListener('canplay', () => {
    if (wantsPlayback && video.paused && !document.hidden) play();
  }, { once: true });
  video.addEventListener('pause', syncButton);
  video.addEventListener('error', () => {
    video.hidden = true;
    button.hidden = true;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (wantsPlayback) play();
  });
  syncButton();
  if (wantsPlayback && !document.hidden) play();
})();
