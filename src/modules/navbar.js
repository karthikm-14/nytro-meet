const navbarJS = (callback) => {
    const existingScript = document.getElementById('navbar-js');
  
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '/assets/js/navbar.js';
      script.id = 'navbar-js';
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    }
  
    if (existingScript && callback) callback();
};

export default navbarJS