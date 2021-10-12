import React from 'react';
import Home from './pages/Home';
import MakeScenario from "./pages/MakeScenario";
import {Link, Switch, Route} from "react-router-dom";
import './App.css';

const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
        {/*scenario?roomId=0&userCount=1&scenarioCount=1*/}
      <Route path="/scenario" component={MakeScenario} />
    </Switch>

  );
};

export default App;
