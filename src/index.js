import 'regenerator-runtime';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.js'
import 'popper.js';
import '@fortawesome/fontawesome-free/js/all.min.js';
import './component/footer-app.js';
import logo from './images/logo.png';

import main from './scripts/main';

document.querySelector('.logo-img').src = logo;

main();