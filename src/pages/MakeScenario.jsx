import React, { useState, useEffect } from 'react';
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
  const [users, setUsers] = useState(Array.from({length: parsed.scenarioCount}, (v,i)=> {
    /* "label": i,
    "value": {
      "access_control": true,
      "user_agent":"",
      "app_version": "",
      "scenario": {
        "commands": []
      }
    } */
    return { 
      user_agent: '',
      app_version: '',
      scenario: {
        commands: []
      }
    }
  }));
  const [selectedUser, setSelectedUser] = useState(null);
  const [appVersion, setAppVersion] = useState('');
  const [userAgent, setUserAgent] = useState('');

  const isScenarioEmpty = () => {
    const key = parseInt(selectedUser, 10);
    
    console.log('commands length', users[key]?.scenario?.commands?.length);

    return users[key]?.scenario?.commands?.length === 0;
  }

  const updateScenario = (updateCommands) => {
    console.log('update commands', updateCommands, 'selectedUser ', selectedUser);

    const updateUsers = users.map((data, key) => {
      if (parseInt(selectedUser, 10) !== key) return data;

      const prevCommands = data?.scenario?.commands;
      const updateScenario = { 
        commands: prevCommands.concat(updateCommands)
      }

      return { ...data, ...{ scenario: updateScenario } }
    });

    console.log('updateUsers', updateUsers);
    setUsers(updateUsers);
  }

  const onClickSubmit = () => {    
    axios.post("url", {scenario})
      .then(function (response) {
        // response
      }).catch(function (error) {
      // 오류발생시 실행
    });
    // 체이닝이 많으면, 가독성이 떨어짐. 이런 경우 asyn, await 권장
    // .then(function() {
    // 항상 실행
    // console.log(scenario)
    // });
  };

  useEffect(() => {
    // if (selectedUser) 는 0의 경우, false 
    if (!isNaN(parseInt(selectedUser, 0))) {
      console.log('selectedUser', selectedUser);
    }
  }, [selectedUser]);

  useEffect(() => {
    // selectedUser 초기 세팅
    if (users.length > 0 && users) {
      console.log('update users', users)

      // 인덱스 0번재
      setSelectedUser(0);
    }
  }, [users, userAgent]);

  useEffect(() => {
    if (userAgent || appVersion) {
      // 데이터 변경 보기 위해 설정
      console.log('update userAgent', userAgent, 'appVersion ',appVersion);
    }
  }, [userAgent, appVersion]);

  return (
      <div>
        <div className="MakeScenario">
          <div className="user-list-wrap">
            <h1>청취자 선택</h1>
            <Users users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          </div>

          <div className="user-agent-wrap">
            <h1>청취자 환경</h1>
            <UserType users={users} setUsers={setUsers} selectedUser={selectedUser} appVersion={appVersion} setAppVersion={setAppVersion} userAgent={userAgent} setUserAgent={setUserAgent}/>
          </div>

          <div className="user-event-wrap">
            <h1>청취자 이벤트</h1>
            <CommandInput setScenario={updateScenario}/>
          </div>

        { /* <CommandInput selectedUser={selectedUser} users={users} setUsers={setUsers} appVersion={appVersion} userAgent={userAgent} scenario={scenario} setScenario={updateScenario} /> */}        
        
          <DndProvider backend={HTML5Backend}>
            <Scenario    // (1)
                title={'시나리오'}
                users={users}
                setUsers={setUsers}
                scenario={scenario}
                setScenario={setScenario}
            />
          </DndProvider>

        {!isScenarioEmpty() &&
          <div className='scenario-btn-box'>
            <button
              type="submit"
              onClick={onClickSubmit}
              className="create-scenario-btn"
            >
              시나리오 생성하기
            </button>
          </div>}
      </div>
    </div>
  );
};

export default MakeScenario;
