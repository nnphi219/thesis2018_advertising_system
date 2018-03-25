import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AdsArea from './components/Ads_Area/AdsArea';
import PriceFactor from './components/Price_Factor/PriceFactor';
import ServicePrice from './components/Service_Price/ServicePrice';
import Root from './components/Root';

// class Title extends Component {
//   render(){
//       return(
//           <div id="page-wrapper">
//               <div className="row">
//                   <div className="col-lg-12">
//                       <h1 className="page-header">This is Admin System Page</h1>
//                   </div>
//               </div>
//           </div>
//       );
//   }
// }

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
          <Route path={"/"} component={Root} />
          <Route path={"/ads-area"} component={AdsArea} />
          <Route path={"/service-price"} component={ServicePrice} />
          <Route path={"/price-factor"} component={PriceFactor} />
          {/* <Route path={"/user/:id"} component={User} />
          <Route path={"/home"} component={Home} />
          <Route path={"home-single"} component={Home}/> */}
      </div>
      </BrowserRouter>
  );
  }
}

export default App;
