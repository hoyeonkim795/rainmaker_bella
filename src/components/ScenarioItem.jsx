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
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect(); // rendering 된 사각형에 값을 받아옴.
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; //다른 컴포넌트의 높이값 절반 이상일때
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
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
            {scenarioItem?.data?.sticker}
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

export default ScenarioItem;
