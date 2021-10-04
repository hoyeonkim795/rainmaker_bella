import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const ScenarioItem = ({ index, id, moveCard, scenarioItem, scenario, setScenario }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ScenarioItem,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect(); // rendering 된 사각형에 값을 받아옴.
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; //다른 컴포넌트의 높이값 절반 이상일때
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ScenarioItem,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return(
    <li ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId} className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <input type="checkbox" className="todoapp__item-checkbox" />
      {/* 아이템 내용 */}
      <span className="todoapp__item-ctx">{scenarioItem.value.label}</span>
      {/* 수정 버튼 */}
      <button type="button" className="todoapp__item-edit-btn">
        ✏
      </button>
      {/* 삭제 버튼 */}
      <button type="button" className="todoapp__item-delete-btn">
        🗑
      </button>
    </li>
  );
}

ScenarioItem.propTypes = {
  scenarioItem: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.object.isRequired,
  }),
  scenario: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.object.isRequired,
    })
  ),
  setScenario: PropTypes.func.isRequired,
};

export default ScenarioItem;