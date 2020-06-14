const wowzaJS = (callback, src) => {
    const existingScript = document.getElementById('player_embed');
  
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = src;
      script.id = 'player_embed';
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    }
  
    if (existingScript && callback) callback();
};

export default wowzaJS