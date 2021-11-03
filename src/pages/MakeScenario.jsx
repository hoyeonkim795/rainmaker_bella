import React, { useCallback, useState, useEffect } from 'react';
import CommandInput from '../components/CommandInput';
import Scenario from "../components/Scenario";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import queryString from 'query-string';
import Listeners from "../components/Listeners";
import ListenerType from "../components/ListenerType";
import {postScenarioCreate} from "../lib/Api";

const MakeScenario = ({ location }) => {
  const parsed = queryString.parse(location.search);
  const [listeners, setListeners] = useState(Array.from({length: parsed.scenarioCount}, (v,i)=> {
    return { 
      user_agent: '',
      app_version: '',
      commands: []
    }
  }));
  const [selectedListener, setSelectedListener] = useState(0);
  const [appVersion, setAppVersion] = useState('');
  const [listenerAgent, setListenerAgent] = useState('Android');
  const [scenario, setScenario] = useState([]);
  const [isInit, setIsInit] = useState(true);
  const [isDraged, setIsDraged] = useState(false);

  const updateListenerAgent = useCallback((listenerAgent) => {
    const  updateListeners = listeners.map((data, key) => {
      if (parseInt(selectedListener, 10) !== key) return data;

      return { ...data, ...{user_agent: listenerAgent}}
    });

    console.log('update users with user agent', updateListeners);
    setListenerAgent(listenerAgent);
    setListeners( updateListeners);
  }, [setListenerAgent, listeners, setListeners, selectedListener]);


  const updateAppVersion = useCallback(() => {
    const updateListeners = listeners.map((data, key) => {
      if (parseInt(selectedListener, 10) !== key) return data;

      return {...data, ...{app_version: appVersion}}
    });

    console.log('update listeners with app version', updateListeners);
    setListeners(updateListeners);
  }, [appVersion, listeners, setListeners, selectedListener]);


  const isScenarioEmpty = () => {
    const key = parseInt(selectedListener, 10);

    return listeners[key]?.commands?.length === 0;
  }

  const updateScenario = (updateCommands) => {
    console.log('update commands', updateCommands, 'selectedListener ', selectedListener);

    const updateListeners = listeners.map((data, key) => {
      if (parseInt(selectedListener, 10) !== key) return data;

      const prevScenario = data?.commands;
      const updateScenario = prevScenario.concat(updateCommands);

      setScenario(updateScenario);
      return { ...data, ...{ commands: updateScenario } }
    });

    console.log('updateListeners', updateListeners);
    setListeners(updateListeners);
  }

  const deleteScenario = (deletedKey) => {
    const updatedlisteners = listeners.map((data, key) => {
      if (parseInt(selectedListener, 10) !== key) return data;

      const updateScenario = data?.commands.filter((data, key) => deletedKey !== key);
      return Object.assign({}, data, {commands: updateScenario});
    })

    setListeners(updatedlisteners);
  }

  const reorderScenario = () => {
    const updateListeners = listeners.map((data, key) => {
      if (selectedListener !== key) return data;

      return Object.assign({}, data, { commands: scenario });
    });

    setListeners(updateListeners);
  }

  const onClickSubmit = () => {
    console.log(listeners);
    postScenarioCreate({ "file_name": parsed.fileName, "listener_count": parsed.listenerCount, "listeners" : listeners});
  };

  useEffect(() => {
    // if (selectedListener) 는 0의 경우, false 
    if (!isNaN(parseInt(selectedListener, 0))) {
      const listenerAgent = listeners[selectedListener]?.user_agent ?? '';
      const appVersion = listeners[selectedListener]?.app_version ?? '';
      const scenario = listeners[selectedListener]?.commands;
      
      setListenerAgent(listenerAgent);
      setAppVersion(appVersion);
      setScenario(scenario);
    }
  }, [selectedListener, setAppVersion, setListenerAgent, setScenario, listeners]);

  useEffect(() => {
    if (isInit) {
      const initlisteners = listeners.map((data, key) => {
        if (selectedListener !== key) return data;

        return Object.assign({}, data, {user_agent: listenerAgent});
      });

      setListeners(initlisteners);
      setIsInit(false);
    }
  }, [isInit, setListeners, listeners, selectedListener, listenerAgent]);
  
  useEffect(() => {
    if (isDraged && scenario) {
      reorderScenario();
      setIsDraged(false);
    }
  }, [isDraged, scenario, reorderScenario]);

  return (
      <div>
        <div className="MakeScenario">
          <div className="user-list-wrap">
            <h1>청취자 선택</h1>
            <Listeners listeners={listeners} selectedListener={selectedListener} setSelectedListener={setSelectedListener}/>
          </div>

          <div className="user-agent-wrap">
            <h1>청취자 환경</h1>
            <ListenerType listenerAgent={listenerAgent} appVersion={appVersion} setAppVersion={setAppVersion} setListenerAgent={updateListenerAgent} updateAppVersion={updateAppVersion}/>
          </div>

          <div className="user-event-wrap">
            <h1>청취자 이벤트</h1>
            <CommandInput setScenario={updateScenario}/>
          </div>

          <DndProvider backend={HTML5Backend}>
            <Scenario    // (1)
              title={'시나리오'}
              listeners={listeners}
              setListeners={setListeners}
              scenario={scenario}
              setScenario={setScenario}
              deleteScenario={deleteScenario}
              reorderScenario={reorderScenario}
              setIsDraged={setIsDraged}
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
