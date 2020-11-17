import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <React.Fragment>
            <Navigation />
            <Switch>
              <Redirect from="/" to="/auth" exact />
              {/* <Route path="/" component={null} /> */}
              <Route path="/auth" component={Auth} />
              <Route path="/events" component={Events} />
              <Route path="/bookings" component={Bookings} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
