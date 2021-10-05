import React, { useState } from 'react';
import DefaultSetting from "../components/DefaultSetting";
import { Route } from 'react-router-dom';
import MakeScenario from "./MakeScenario";

const Home = () => {

  const [defaultSetting, setDefaultSetting] = useState({
    roomId: 0,
    userCount: 100,
    scenarioCount: 1
  });


  return (
    <div className="homepage__container">
      {/*<Route path="/"*/}
      {/*       render={() =>*/}
      {/*         <DefaultSetting defaultSetting={defaultSetting} setDefaultSetting={setDefaultSetting} />}*/}
      {/*       exact />*/}
      {/*<Route path="pages/MakeScenario"*/}
      {/*render={() =>*/}
      {/*<MakeScenario/>} />*/}
      <DefaultSetting defaultSetting={defaultSetting} setDefaultSetting={setDefaultSetting}/>

      <MakeScenario/>
    </div>
  );
};

export default Home;