import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import Receipt from './components/Receipt';

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route exact path="/receipt" component={Receipt}/>
        </div>
    </Router>
), document.getElementById('root'));
registerServiceWorker();