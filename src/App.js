import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router'
//import Header from './components/public/header';
//import Footer from './components/public/footer';
import LoginBox from './components/login/loginbox';
//import VoteItem from './components/vote/voteitem';
import VotePage from './components/vote/votepage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <Router history={hashHistory}>
               <Route path="/" component={LoginBox}/>
               <Route path="/vote/:token/:sid" component={VotePage}/>
            </Router>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;