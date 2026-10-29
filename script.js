const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  toggle.textContent = open ? '×' : '☰';
});
document.querySelectorAll('.nav-item > button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const open = !item.classList.contains('open');
    document.querySelectorAll('.nav-item').forEach(other => { other.classList.remove('open'); other.querySelector('button').setAttribute('aria-expanded', 'false'); });
    item.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  });
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-item')) document.querySelectorAll('.nav-item').forEach(item => { item.classList.remove('open'); item.querySelector('button').setAttribute('aria-expanded', 'false'); });
  if (event.target.closest('#navigation a') && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = '☰'; }
});
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
  const carousel = button.closest('.carousel-section').querySelector('.carousel');
  carousel.scrollBy({left: Number(button.dataset.scroll) * (carousel.firstElementChild.offsetWidth + 20), behavior: 'smooth'});
}));

const menuButtons = document.querySelectorAll('.activity-toggle, .section-toggle');
function closeSectionMenus() {
  menuButtons.forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls')).hidden = true;
  });
}
menuButtons.forEach(button => button.addEventListener('click', () => {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  const open = panel.hidden;
  closeSectionMenus();
  panel.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.header-bottom') || event.target.closest('.activity-menu a')) closeSectionMenus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const active = document.querySelector('.activity-toggle[aria-expanded="true"], .section-toggle[aria-expanded="true"]');
    if (active) { closeSectionMenus(); active.focus(); }
  }
});
toggle.addEventListener('click', () => { if (!nav.classList.contains('open')) closeSectionMenus(); });
