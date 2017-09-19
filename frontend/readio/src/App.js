import React, { Component } from 'react';
import { Route,  BrowserRouter as Router, Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import Page1 from './components/Page1/index'
import Page2 from './components/Page2/index'
import Page3 from './components/Page3/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Page1</Link></li>
            <li><Link to="/page2">Page2</Link></li>
            <li><Link to="/page3">Page3</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Page1}/>
          <Route path="/page2" component={Page2}/>
          <Route path="/page3" component={Page3}/>
        </div>
      </Router>
    );
  }
}

export default App;
