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
