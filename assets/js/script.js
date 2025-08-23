/*
 * Navigation behaviour script
 *
 * Highlights the active navigation dot based on scroll position. Each
 * section becomes active when it enters the viewport. Adapted to
 * support simple single-page navigation without external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.side-nav a');

  function onScroll() {
    let currentId = '';
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
});