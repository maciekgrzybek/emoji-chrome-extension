import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-montserrat';

import './styles/main.css';
import 'tippy.js/dist/tippy.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './styles/sprite.css';
export { ReactSVG as default } from 'react-svg';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
