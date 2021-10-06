import React, {useCallback, useRef, useState} from 'react';
import Select from "react-select";
import CommandInput from "./CommandInput";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Scenario from "./Scenario";

const Users = ({ userCount }) => {
    // const [userScenario, setUserScenario] = useState([]);
    const [userScenario, setUserScenario] = useState([]);
    const [users, setUsers] = useState([
        {
            label: "Android", scenario: userScenario
        } ,
        {
            label: "Web", scenario: userScenario
        },
        {
            label : "IOS", scenario: userScenario
        }
        ]
    );

    console.log(users)

    const isScenarioEmpty = () => {
        return Array.isArray(userScenario) && userScenario.length === 0
    }

    const onClickAddButton = () => {
        console.log("시나리오 생성 !!!")
        console.log(userScenario)
    };

    const handleChange = useCallback((inputValue) => setUsers(inputValue), []);

    const handleCreate = useCallback(
        (inputValue) => {
            const newValue = { label: inputValue, scenario: inputValue };
            setUsers([...users, newValue]);
            setUserScenario(newValue);
        },
        [users]
    );

    return (
      <div className='Users'>
        <Select
          type="text"
          name="user"
          value={users.scenario}
          placeholder="청취자 종류를 선택하세요"
          options={users}
          onChange={handleChange}
          onCreateOption={handleCreate}
        />
          <CommandInput scenario={userScenario} setScenario={setUserScenario} />

          {/* 할 일 Item 리스트 */}
          <DndProvider backend={HTML5Backend}>
              <Scenario    // (1)
                  title={'시나리오'}
                  scenario={userScenario}
                  setScenario={setUserScenario}
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

// props 값 검증


export default Users;
