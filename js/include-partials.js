// Loads HTML partials from /partials and injects into elements with data-include
(function(){
  async function includePartial(name, selector){
    try{
      const resp = await fetch('partials/' + name + '.html');
      if (!resp.ok) throw new Error('Failed to load ' + name);
      const html = await resp.text();
      const container = document.querySelector(selector);
      if (container) container.innerHTML = html;
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  function setActiveNavLink(){
    const getLastSegment = (url) => {
      try {
        const u = new URL(url, location.href);
        const path = u.pathname;
        const last = path.split('/').pop();
        return last || 'index.html';
      } catch(e){
        const parts = url.split('/');
        return parts.pop() || 'index.html';
      }
    };

    const current = (location.pathname.split('/').pop()) || 'index.html';
    const links = document.querySelectorAll('.navbar .nav-link, .dropdown-item');
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const last = getLastSegment(href);
      if (last === current) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', async function(){
    await includePartial('header', '#site-header');
    await includePartial('footer', '#site-footer');
    setActiveNavLink();
  });
})();
