import React from 'react';
import Home from './pages/Home';
import MakeScenario from "./pages/MakeScenario";
import {Link, Switch, Route} from "react-router-dom";
import './App.css';

const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/scenario/:roomId/:userCount/:scenarioCount" component={MakeScenario} />
    </Switch>

  );
};

export default App;
