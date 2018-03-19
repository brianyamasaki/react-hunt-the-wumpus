import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';

const body = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(body, document.getElementById('root'));
registerServiceWorker();
