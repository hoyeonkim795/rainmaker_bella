import React, { useState } from 'react';
import CommandInput from '../components/CommandInput';
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import queryString from 'query-string';
import Select from 'react-select';
import axios from "axios";

const MakeScenario = ({ location }) => {
  const [scenario, setScenario] = useState([]);

  const parsed = queryString.parse(location.search);
  console.log(parsed.roomId, parsed.userCount, parsed.scenarioCount)


  const isScenarioEmpty = () => {
    return Array.isArray(scenario) && scenario.length === 0
  }

  const onClickAddButton = () => {
    //삭제한 이벤트

    console.log("시나리오 생성 !!!")
    axios.post("url", {
      scenario
    })
        .then(function (response) {
          // response
        }).catch(function (error) {
      // 오류발생시 실행
    }).then(function() {
      // 항상 실행
      console.log(scenario)
    });

  };
  return (
    <div className="MakeScenario">

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
