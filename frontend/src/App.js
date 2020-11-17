import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import Navigation from "./components/Navigation";
import AuthContext from "./context/auth-context";

class App extends Component {
  state = {
    token: null,
    userId: null
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  }
  logout = () => {
    this.setState({ token: null, userId: null });
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <React.Fragment>
            <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
              <Navigation />
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && <Redirect from="/auth" to="/events" exact />}
                {/* <Route path="/" component={null} /> */}
                {!this.state.token && <Route path="/auth" component={Auth} />}
                <Route path="/events" component={Events} />
                {this.state.token && <Route path="/bookings" component={Bookings} />}
              </Switch>
            </AuthContext.Provider>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
