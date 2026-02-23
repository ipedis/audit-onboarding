// Loads HTML partials from /partials and injects into elements with data-include
(function(){
  async function includePartial(name, selector){
    try{
      const resp = await fetch('partials/' + name + '.html');
      if (!resp.ok) throw new Error('Failed to load ' + name);
      const html = await resp.text();
      const container = document.querySelector(selector);
      if (container) container.innerHTML = html;
    }catch(e){
      console.error(e);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    includePartial('header', '#site-header');
    includePartial('footer', '#site-footer');
  });
})();
