import React, { useState } from 'react';
import CommandInput from '../components/CommandInput';
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Select from 'react-select';
import Users from "../components/Users";

const MakeScenario = () => {
  const [scenario, setScenario] = useState([]);

  const [users, setUsers] = useState()

  const onClickAddButton = () => {
    console.log("시나리오 생성 !!!")
    console.log(scenario)

  };
  return (
    <div className="inputs_box">
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
      {scenario &&
      <button
        type="submit"
        onClick={onClickAddButton}
        className="todoapp__createbox-add-btn"
      >
        CREATE
      </button>
      }

    </div>
  );
};

export default MakeScenario;