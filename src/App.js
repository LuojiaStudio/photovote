import React, { Component } from 'react';
import Header from './components/public/header';
import Footer from './components/public/footer';
import LoginBox from './components/login/loginbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
           <Header/>
           <LoginBox/>
           <Footer/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
