import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const DefaultSetting = ({ defaultSetting, setDefaultSetting }) => {
  const [roomId, setRoomId] = useState('');
  const [userCount, setUserCount] = useState('');
  const [scenarioCount, setScenarioCount] = useState('');

  const inputRef = useRef(null);

  // input 값 가져오기
  const onChangeRoomIdInput = (e) => {
    setRoomId(e.target.value);

  };


  const onChangeUserCountInput = (e) => {
    setUserCount(e.target.value);

  };

  const onChangeScenarioCountInput = (e) => {
    setScenarioCount(e.target.value);

  };

  const onClickAddButton = () => {
    const newDefaultSetting = {
      roomId: roomId,
      userCount: userCount,
      scenarioCount: scenarioCount
    }

    setDefaultSetting(newDefaultSetting)

  };

  return (
    <div className="todoapp__inputbox">
      {/* 아이템 내용 입력 input */}
      <input
        type="number"
        name="todoItem"
        value={roomId}
        ref={inputRef}
        placeholder="방 번호를 입력하세요"
        className="todoapp__inputbox-inp"
        onChange={onChangeRoomIdInput}
      />

      <input
        type="number"
        name="todoItem"
        value={userCount}
        ref={inputRef}
        placeholder="청취자 전체 수를 입력해주세요"
        className="todoapp__inputbox-inp"
        onChange={onChangeUserCountInput}
      />

      <input
        type="number"
        name="todoItem"
        value={scenarioCount}
        ref={inputRef}
        placeholder="시나리오 개수를 입력해주세요"
        className="todoapp__inputbox-inp"
        onChange={onChangeScenarioCountInput}
      />

      {/* 입력 후 아이템 추가 버튼 */}
      <button
        type="submit"
        className="todoapp__inputbox-add-btn"
        onClick={onClickAddButton}
      >
        추가
      </button>
    </div>
  );
};

// props 값 검증
DefaultSetting.propTypes = {
  userCount: PropTypes.arrayOf( // (3)
    PropTypes.shape({ // (3-1)
      id: PropTypes.number.isRequired, // (3-2)
      userCount: PropTypes.number.isRequired, // (3-3)
    }).isRequired
  ),
  setUserCount: PropTypes.func.isRequired, // (4)
};

export default DefaultSetting;