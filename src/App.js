import React, { Component } from 'react';
import Header from './components/public/header';
import Footer from './components/public/footer';
import LoginBox from './components/login/loginbox';
import VoteItem from './components/vote/voteitem';
import VotePage from './components/vote/votepage';
import SelectedPage from  './components/selected/selectedpage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
           <VotePage/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
