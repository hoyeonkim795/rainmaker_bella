import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MakeScenario from "../pages/MakeScenario";
import { Link, Route, Switch } from 'react-router-dom'

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
    <div className="DefaultSetting">
      {/* 아이템 내용 입력 input */}
        <div className="input_default_setting_box">
            <div className="input_name">
                <h3>방 번호를 입력하세요</h3>
            </div>
            <div className="input_box">
                <input
                    className='input-default-setting-tag'
                    type="number"
                    name="todoItem"
                    value={roomId}
                    ref={inputRef}
                    placeholder="방 번호"
                    onChange={onChangeRoomIdInput}
                />
            </div>
        </div>

        <div className="input_default_setting_box">
            <div className="input_name">
                <h3>전체 청취자 수를 입력하세요</h3>
            </div>
            <div className="input_box">
                <input
                    className='input-default-setting-tag'
                    type="number"
                    name="userCount"
                    value={userCount}
                    ref={inputRef}
                    placeholder="청취자 전체 수"
                    onChange={onChangeUserCountInput}
                />
            </div>
        </div>

        <div className="input_default_setting_box">
            <div className="input_name">
                <h3>생성할 시나리오 개수를 입력하세요</h3>
            </div>
            <div className="input_box">
                <input
                    className='input-default-setting-tag'
                    type="number"
                    name="scenarioCount"
                    value={scenarioCount}
                    ref={inputRef}
                    placeholder="시나리오 개수"
                    onChange={onChangeScenarioCountInput}
                />
            </div>
        </div>
        {/* Todo params change string to Int */}
        <div className="default-setting-btn-box">
            <Link to={`/scenario?roomId=${roomId}&userCount=${userCount}&scenarioCount=${scenarioCount}`}>
                <button
                    type="submit"
                    className="create-default-setting-btn"
                    onClick={onClickAddButton}
                >
                    입력 완료
                </button>
            </Link>
        </div>
    </div>
  );
};

// props 값 검증


export default DefaultSetting;