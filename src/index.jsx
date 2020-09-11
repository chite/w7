import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/style.scss';
import App from './components/App';
import store from "./store/configureStore";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faPaperPlane, faCamera, faFileAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleLeft, faPaperPlane, faCamera, faFileAlt);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')); 