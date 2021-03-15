import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";

import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:id" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
