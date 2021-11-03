import React, {useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const ScenarioItem = ({ index, id, moveCard, scenarioItem, scenario, deleteScenario, reorderScenario }) => {
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

  const handleClick = (index) => {
    deleteScenario(index);
  }

  // 삭제 기능

  // const onSubmitDeleteButton = (selectedKey) => {
  //  if (window.confirm('삭제하시겠습니까?')) {
    // const nextScenario = scenario.map((item, key) => ({
    //   ...item,
    //   deleted: item.id === scenarioItem.id ? true : item.deleted,
    // }));
    // const nextScenario = scenario.filter((item)=> item.id != scenarioItem.id)
    // const finalScenario = nextScenario.map((item) => ({
    //   ...item,
    //   id: item.id >= scenarioItem.id ? item.id-1 : item.id,
    // }));
    // setScenario(finalScenario);
  //  console.log("삭제!!")
    
  //  onClickDeleteButton(selectedKey);
  // }};

  return(
    <li ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId} className="todoapp__item">
      {/* 아이템 내용 */}
      <div>
        <span className="todoapp__item-ctx">{scenarioItem?.label}</span>
        {/*옵션 값들*/}
        <span className="todoapp__item-ctx"> {scenarioItem?.period}</span>
        <span className="todoapp__item-ctx"> {scenarioItem?.count}</span>
        {scenarioItem?.command==="present" && (
          <span className="todoapp__item-ctx">
            {scenarioItem?.data?.sticker?.label}
            {/*{scenarioItem.data.amount} / {scenarioItem.data.combo} / {scenarioItem.data.sticker}*/}
          </span>
        )}
      </div>

      <div>
        {/* 삭제 버튼 */}
        <button type="button" className="todoapp__item-delete-btn" onClick={() => handleClick(index)}>
          🗑
        </button>
      </div>
    </li>
  );
}

// ScenarioItem.propTypes = {
//   scenarioItem: PropTypes.shape({
//     id: PropTypes.number,
//     value: PropTypes.object.isRequired,
//   }),
//   scenario: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       value: PropTypes.object.isRequired,
//     })
//   ),
//   // setScenario: PropTypes.func.isRequired,
// };

export default ScenarioItem;
