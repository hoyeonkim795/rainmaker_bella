import React, { useState } from 'react';
import DefaultSetting from "../components/DefaultSetting";
import { Route } from 'react-router-dom';
import MakeScenario from "./MakeScenario";

const Home = () => {

  const [defaultSetting, setDefaultSetting] = useState({
  });


  return (
    <div className="homepage__container">
      <DefaultSetting defaultSetting={defaultSetting} setDefaultSetting={setDefaultSetting}/>
    </div>
  );
};

export default Home;