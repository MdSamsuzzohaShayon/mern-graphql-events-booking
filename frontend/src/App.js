import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Redirect from="/" to="/auth" exact />
        {/* <Route path="/" component={null} /> */}
        <Route path="/auth" component={Auth} />
        <Route path="/events" component={Events} />
        <Route path="/bookings" component={Bookings} />
      </Switch>

    </BrowserRouter>

  );
}

export default App;
