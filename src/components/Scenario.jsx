import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import ScenarioItem from './ScenarioItem';
import update from 'immutability-helper';

const Scenario = ({ users, setUsers, title, scenario, setScenario }) => {
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard =scenario[dragIndex];
    setScenario(update(scenario, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    }));
  }, [scenario, setScenario]);

  const renderCard = (scenarioItem, index) => {
    console.log('scenarioItem', scenarioItem);

    return (
      <ScenarioItem
        key={scenarioItem.id}
        index={index}
        id={scenarioItem.id}
        scenarioItem={scenarioItem}
        users={users}
        setUsers={setUsers}
        scenario={scenario}
        setScenario={setScenario}
        moveCard={moveCard}
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
        {scenario && scenario.map((scenarioItem, i) => {
          return(
            renderCard(scenarioItem, i)
          );
        })}
      </ul>
    </div>
  );
}

Scenario.propTypes = {
  title: PropTypes.string.isRequired,
  scenario: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.object.isRequired,
    })
  ),
  setScenario: PropTypes.func.isRequired,
};

export default Scenario;
