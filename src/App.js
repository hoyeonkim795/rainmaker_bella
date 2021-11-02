import React from 'react';
import Home from './pages/Home';
import MakeScenario from "./pages/MakeScenario";
import {Switch, Route} from "react-router-dom";
import './App.css';

const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/scenario" component={MakeScenario} />
    </Switch>

  );
};

export default App;
