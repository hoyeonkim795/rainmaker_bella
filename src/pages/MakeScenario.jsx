import React, { useState } from 'react';
import CommandInput from '../components/CommandInput';
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import queryString from 'query-string';
import Select from 'react-select';
import axios from "axios";
import UserType from "../components/UserType";
import Users from "../components/Users";

const MakeScenario = ({ location }) => {
  const [scenario, setScenario] = useState([]);

  const parsed = queryString.parse(location.search);
  // query string 넘기기
  // console.log(parsed.roomId, parsed.userCount, parsed.scenarioCount)

  const [users, setUsers] = useState(Array.from({length: parsed.scenarioCount}, (v,i)=> i = {
    "label": i,
    "value": {
      "access_control": true,
      "user_agent":"",
      "app_version": "",
      "scenario": {
        "commands": [

        ]
    }
    }
  }));

  const [selectedUser, setSelectedUser] = useState([]);
  const [appVersion, setAppVersion] = useState('')
  const [userAgent, setUserAgent] = useState('')


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
      <div>
        <div className="MakeScenario">
          <Users users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          <div>
            <h1>청취자 환경</h1>
          </div>
          <UserType users={users} setUsers={setUsers} selectedUser={selectedUser} appVersion={appVersion} setAppVersion={setAppVersion} userAgent={userAgent} setUserAgent={setUserAgent}/>

          <div>
            <h1>청취자 이벤트</h1>
          </div>

          <CommandInput selectedUser={selectedUser} users={users} setUsers={setUsers} appVersion={appVersion} userAgent={userAgent} scenario={scenario} setScenario={setScenario} />

          {/* 할 일 Item 리스트 */}
          <DndProvider backend={HTML5Backend}>
            <Scenario    // (1)
                title={'시나리오'}
                users={users}
                setUsers={setUsers}
                scenario={scenario}
                setScenario={setScenario}
            />
          </DndProvider>
        </div>
        {!isScenarioEmpty() && (
            <div className='scenario-btn-box'>
              <button
                  type="submit"
                  onClick={onClickAddButton}
                  className="create-scenario-btn"
              >
                시나리오 생성하기
              </button>
            </div>
        )}
      </div>
  );
};

export default MakeScenario;
