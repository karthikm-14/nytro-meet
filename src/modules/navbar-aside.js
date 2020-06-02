const navbarAsideJS = (callback) => {
    const existingScript = document.getElementById('navbar-aside-js');
  
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '/assets/js/navbar.aside.js';
      script.id = 'navbar-aside-js';
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    }
  
    if (existingScript && callback) callback();
};

export default navbarAsideJS