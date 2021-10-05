import React, { useState } from 'react';
import CommandInput from '../components/CommandInput';
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Select from 'react-select';
import Users from "../components/Users";

const MakeScenario = ({ match }) => {
  const [scenario, setScenario] = useState([]);
  const [users, setUsers] = useState()

  // TODO: query string 사용
  const { params } = match
  console.log(params) // {roomId: '1', userCount: '1000', scenarioCount: '3'}

  const isScenarioEmpty = () => {
    return Array.isArray(scenario) && scenario.length === 0
  }

  const onClickAddButton = () => {
    console.log("시나리오 생성 !!!")
    console.log(scenario)
  };
  return (
    <div className="MakeScenario">
      <Users scenario={scenario} setScenario={setScenario} />

      <CommandInput scenario={scenario} setScenario={setScenario} />

      {/* 할 일 Item 리스트 */}
      <DndProvider backend={HTML5Backend}>
        <Scenario    // (1)
          title={'시나리오'}
          scenario={scenario}
          setScenario={setScenario}
        />
      </DndProvider>

      {!isScenarioEmpty() && (
        <div className='scenario-btn-box'>
          <button
            type="submit"
            onClick={onClickAddButton}
            className="create-scenario-btn"
          >
            해당 시나리오 생성하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MakeScenario;
