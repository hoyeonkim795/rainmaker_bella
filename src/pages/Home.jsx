import React, { useState } from 'react';
import CommandInput from '../components/CommandInput';
import ScenarioItem from '../components/ScenarioItem';
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Home = () => {
  const [scenario, setScenario] = useState([]);

  return (
    <div className="homepage__container">
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <CommandInput scenario={scenario} setScenario={setScenario} />

      {/* 할 일 Item 리스트 */}
      <DndProvider backend={HTML5Backend}>
      <Scenario    // (1)
        title={'할 일'}
        scenario={scenario}
        setScenario={setScenario}
      />
      </DndProvider>

    </div>
  );
};

export default Home;