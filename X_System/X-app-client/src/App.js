import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/Home/Home';

class Title extends Component {
  render(){
      return(
          <div id="page-wrapper">
              <div className="row">
                  <div className="col-lg-12">
                      <h1 className="page-header">This is Admin System Page</h1>
                  </div>
              </div>
          </div>
      );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
          <Route exact={true} path={"/"} component={Home} />
          <Route path={"/title"} component={Title} />
      </div>
      </BrowserRouter>
  );
  }
}

export default App;
