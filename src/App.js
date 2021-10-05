import React from 'react';
import Home from './pages/Home';
import MakeScenario from "./pages/MakeScenario";
import {Link, Switch, Route} from "react-router-dom";
// import './App.css';
// 추후에 기능이 고도화되면 라우팅하여 여러개의 페이지를 관리
const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/scenario/:roomId/:userCount/:scenarioCount" component={MakeScenario} />
    </Switch>

  );
};

export default App;
