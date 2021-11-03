import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

const DefaultSetting = ({ setDefaultSetting }) => {
  const [fileName, setFileName] = useState('');
  const [listenerCount, setListenerCount] = useState('');
  const [scenarioCount, setScenarioCount] = useState('');

  const inputRef = useRef(null);

  const onChangeFileNameInput = (e) => {
    setFileName(e.target.value);

  };

  const onChangeListenerCountInput = (e) => {
    setListenerCount(e.target.value);

  };

  const onChangeScenarioCountInput = (e) => {
    setScenarioCount(e.target.value);

  };

  const onClickAddButton = () => {
      if (fileName===''||listenerCount===''||scenarioCount==='') {
          alert("필수값 입력 !")
      }
      else {
          const newDefaultSetting = {
              fileName: fileName,
              listenerCount: listenerCount,
              scenarioCount: scenarioCount
          }
          setDefaultSetting(newDefaultSetting)
      }
  };

  return (
    <div className="DefaultSetting">
      {/* 아이템 내용 입력 input */}
        <div className="input_default_setting_box">
            <div className="input_name">
                <h3>시나리오 이름을 작성하세요</h3>
            </div>
            <div className="input_box">
                <input
                    className='input-default-setting-tag'
                    type="text"
                    name="fileName"
                    value={fileName}
                    ref={inputRef}
                    placeholder="시나리오 이름"
                    onChange={onChangeFileNameInput}
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
                    name="listenerCount"
                    value={listenerCount}
                    ref={inputRef}
                    placeholder="청취자 전체 수"
                    onChange={onChangeListenerCountInput}
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
        <div className="default-setting-btn-box">
            {
                fileName!==''&& listenerCount!=='' && scenarioCount!=='' ? <Link to={ `/scenario?fileName=${fileName}&listenerCount=${listenerCount}&scenarioCount=${scenarioCount}`}>
                        <button
                            type="submit"
                            className="create-default-setting-btn"
                            onClick={onClickAddButton}
                        >
                            입력 완료
                        </button>
                    </Link> :
                    <button
                        type="submit"
                        className="create-default-setting-btn"
                        onClick={onClickAddButton}
                    >
                        입력 완료
                    </button>
            }
        </div>
    </div>
  );
};

export default DefaultSetting;