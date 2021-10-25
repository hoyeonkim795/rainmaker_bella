import React, { useCallback, useState, useEffect } from 'react';
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
  const parsed = queryString.parse(location.search);
  // query string 넘기기
  // console.log(parsed.roomId, parsed.userCount, parsed.scenarioCount)
  const [users, setUsers] = useState(Array.from({length: parsed.scenarioCount}, (v,i)=> {
    // "label": i,
    // "value": {
    //   "access_control": true,
    //   "user_agent":"",
    //   "app_version": "",
    //   "scenario": {
    //     "commands": []
    //   }
    // }
    return { 
      user_agent: '',
      app_version: '',
      scenario: []
    }
  }));
  const [selectedUser, setSelectedUser] = useState(0);
  const [appVersion, setAppVersion] = useState('');
  const [userAgent, setUserAgent] = useState('Android');
  const [scenario, setScenario] = useState([]);
  const [isInit, setIsInit] = useState(true);

  const updateUserAgent = useCallback((userAgent) => {
    const updateUsers = users.map((data, key) => {
      if (parseInt(selectedUser, 10) !== key) return data;

      return { ...data, ...{user_agent: userAgent}}
    });

    console.log('update users with user agent', updateUsers);
    setUserAgent(userAgent);
    setUsers(updateUsers);
  }, [setUserAgent, users, setUsers, selectedUser]);
  
  const updateAppVersion = useCallback(() => {
    const updateUsers = users.map((data, key) => {
      if (parseInt(selectedUser, 10) !== key) return data;

      return {...data, ...{app_version: appVersion}}
    });

    console.log('update users with app version', updateUsers);
    setUsers(updateUsers);
  }, [appVersion, users, setUsers, selectedUser]);
  // onEnter, submit btn
  // const updateAppVersion = useCallback(() => {
  // }, [setAppVersion, users, ]);


  const isScenarioEmpty = () => {
    const key = parseInt(selectedUser, 10);

    return users[key]?.scenario?.length === 0;
  }

  const updateScenario = (updateCommands) => {
    console.log('update commands', updateCommands, 'selectedUser ', selectedUser);

    const updateUsers = users.map((data, key) => {
      if (parseInt(selectedUser, 10) !== key) return data;

      const prevScenario = data?.scenario;
      const updateScenario = prevScenario.concat(updateCommands);

      setScenario(updateScenario);
      return { ...data, ...{ scenario: updateScenario } }
    });

    console.log('updateUsers', updateUsers);
    setUsers(updateUsers);
  }

  const deleteScenario = (deletedKey) => {
    console.log('deletecommands', deletedKey);

    const updatedUsers = users.map((data, key) => {
      if (parseInt(selectedUser, 10) !== key) return data;

      const updateScenario = data?.scenario.filter((data, key) => deletedKey !== key);
      return Object.assign({}, data, {scenario: updateScenario});
    })

    setUsers(updatedUsers);
  }

  const reorderScenario = () => {

  }

  const onClickSubmit = () => {
    // TODO: users(listener) 를 params 으로 보내기
    console.log('listeners', users);

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
      const userAgent = users[selectedUser]?.user_agent ?? '';
      const appVersion = users[selectedUser]?.app_version ?? '';
      const scenario = users[selectedUser]?.scenario;
      
      setUserAgent(userAgent);
      setAppVersion(appVersion);
      setScenario(scenario);
    }
  }, [selectedUser, setAppVersion, setUserAgent, setScenario, users]);

  useEffect(() => {
    if (isInit) {
      const initUsers = users.map((data, key) => {
        if (selectedUser !== key) return data;

        return Object.assign({}, data, {user_agent: userAgent});
      });

      setUsers(initUsers);
      setIsInit(false);
    }
  }, [isInit, setUsers, users, selectedUser, userAgent]);

  return (
      <div>
        <div className="MakeScenario">
          <div className="user-list-wrap">
            <h1>청취자 선택</h1>
            <Users users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          </div>

          <div className="user-agent-wrap">
            <h1>청취자 환경</h1>
            { /* <UserType users={users} setUsers={setUsers} selectedUser={selectedUser} appVersion={appVersion} setAppVersion={setAppVersion} userAgent={userAgent} setUserAgent={setUserAgent}/> */}
            <UserType userAgent={userAgent} appVersion={appVersion} setAppVersion={setAppVersion} setUserAgent={updateUserAgent} updateAppVersion={updateAppVersion}/>
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
              deleteScenario={deleteScenario}
              reorderScenario={reorderScenario}
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
