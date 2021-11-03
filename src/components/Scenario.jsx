import React, {useCallback} from 'react';
import ScenarioItem from './ScenarioItem';
import update from 'immutability-helper';

const Scenario = ({ listeners, setListeners, title, scenario, setScenario, deleteScenario, reorderScenario, setIsDraged }) => {
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = scenario[dragIndex];

    setScenario(update(scenario, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    }));
    
    setIsDraged(true);
  }, [scenario, setScenario, setIsDraged]);

  const renderCard = (scenarioItem, index, deleteScenario, reorderScenario) => {
    console.log('scenarioItem', scenarioItem, 'index', index);

    return (
      <ScenarioItem
        key={index}
        index={index}
        id={index}
        scenarioItem={scenarioItem}
        listeners={listeners}
        setListeners={setListeners}
        scenario={scenario}
        setScenario={setScenario}
        moveCard={moveCard}
        deleteScenario={deleteScenario}
      />
    );
  }

  return(
    <div className="todoapp__list">
      <h2 className="todoapp__list-tit">{title}</h2>
      <div className="todoapp__list-thead">
        <span className='todoapp__item-ctx'>EVENT</span>
        <span className='todoapp__item-ctx'>DELAY TIME</span>
        <span className='todoapp__item-ctx'>COUNT</span>
        <span className='todoapp__item-ctx'>DATA</span>
      </div>
      <ul className="todoapp__list-ul">
        {scenario?.length > 0 && scenario.map((scenarioItem, i) => {
          console.log('scenarioItem', scenarioItem);
          return(
            renderCard(scenarioItem, i, deleteScenario)
          );
        })}
      </ul>
    </div>
  );
}

export default Scenario;
