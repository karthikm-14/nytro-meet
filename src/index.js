import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from 'keycloak-js'

//keycloak init options
let initOptions = {
  url: 'https://idm-dev.nytro.ai/auth', 
  realm: 'nytro-events', 
  clientId: 'nytro-events-app', 
  onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

  if (!auth) {
      window.location.reload();
  } else {
      console.info("Authenticated");
  }

  //React Render
  ReactDOM.render(<App keycloak={keycloak} />, document.getElementById('root'));

  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
      keycloak.updateToken(70).success((refreshed) => {
          if (refreshed) {
              console.debug('Token refreshed' + refreshed);
          } else {
              console.warn('Token not refreshed, valid for '
                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
      }).error(() => {
          console.error('Failed to refresh token');
      });
  }, 60000)

}).error(() => {
  console.error("Authenticated Failed");
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();