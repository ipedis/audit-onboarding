function getLastSegment(url) {
  try {
    const parsedUrl = new URL(url, location.href);
    const lastSegment = parsedUrl.pathname.split('/').pop();
    return lastSegment || 'index.html';
  } catch {
    const parts = url.split('/');
    return parts.pop() || 'index.html';
  }
}

function setActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navbar .nav-link, .dropdown-item');

  links.forEach((link) => {
    const lastSegment = getLastSegment(link.getAttribute('href') || '');
    link.classList.toggle('active', lastSegment === current);
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);
