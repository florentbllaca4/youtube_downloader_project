import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importoni komponentin kryesor të aplikacionit tuaj
//import './index.css'; // Opsionale: mund të shtoni stilizime nëse është e nevojshme

// Ky është vendi ku React do të "renderojë" aplikacionin tuaj dhe do ta lidhi me div-in me id 'root' në index.html
ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Komponenti kryesor */}
  </React.StrictMode>,
  document.getElementById('root') // Ky është div-i në index.html ku do të shfaqen komponentët tuaj
);

