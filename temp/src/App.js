import React from "react";
import { Route, Router, Switch, Link } from "react-router-dom";
import Result from './pages/Result';
import Loading from './pages/Loading';
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import './App.css';
import AppStateProvider from "./providers/AppStateProvider";

const App = () => {
  return (
    <>
      <AppStateProvider>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/loading" component={Loading} />
            <Route path="/result" component={Result} />
            <Route path="/notfound" component={NotFound} />
            {/* <Route path="/result/:url" component={NotFound} /> */}
          </Switch>
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/result">Result</Link>
            </li>
            <li>
              <Link to="/loading">Loading</Link>
            </li>
          </ul> */}
      </AppStateProvider>
    </>
  );
};

export default App;
