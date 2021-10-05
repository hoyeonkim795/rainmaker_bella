import React, { useState } from 'react';
import CommandInput from '../components/CommandInput';
import DefaultSetting from "../components/DefaultSetting";
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import OptionInput from "../components/OptionInput";

const MakeScenario = () => {
  const [scenario, setScenario] = useState([]);

  const onClickAddButton = () => {

  };
  return (
    <div>
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