import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";

const CommandInput = ({ user, scenario, setScenario }) => { // (1)

  console.log(user)

  const [value, setValue] = useState('');
  const [sticker, setSticker] = useState('');
  const inputRef = useRef(null);
  const [options, setOptions] = useState([
    { value: "leave", label: "퇴장" },
    { value: "join", label: "입장" },
    { value: "chat", label: "채팅" },
    { value: "present", label: "스푼" },
    { value: "like", label: "좋아요" },
  ])

  const [period, setPeriod] = useState('');
  const [count, setCount] = useState('');
  const [amount, setAmount] = useState('');
  const [combo, setCombo] = useState('');
  const [stickerOptions, setStickerOptions] = useState([
    { value: "sticker_jp_juice", label: "sticker_jp_juice" },
  ])

  const onChangePeriodInput = (e) => {
    setPeriod(e.target.value);
  };

  const onChangeCountInput = (e) => {
    setCount(e.target.value);
  };

  const onChangeAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const onChangeComboInput = (e) => {
    setCombo(e.target.value);
  };


  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  const handleStickerChange = useCallback((inputValue) => setSticker(inputValue), []);

  const handleStickerCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setStickerOptions([...stickerOptions, newValue]);
      setSticker(newValue);
    },
    [stickerOptions]
  );

  const onClickAddButton = () => {
    if (value == '') {
      alert("필수값 입력")
    } else {
      if (value.value == "present") {
        if (amount != '' && combo != '' && sticker != '') {
          const data = {
            "amount":amount,
            "combo":combo,
            "sticker":sticker.value
          }

          const nextScenario = scenario.concat({ // (2)
            id: scenario.length, // (2-1)
            value, // (2-2)
            period,
            count,
            data,
            deleted: false
          });
          setScenario(nextScenario);
          console.log(nextScenario)  
        }
        else {
          alert("필수 값 입력")
        }
        
      } else {
        const nextScenario = scenario.concat({ // (2)
          id: scenario.length, // (2-1)
          value, // (2-2)
          period,
          count,
          deleted: false
        });
        setScenario(nextScenario);
        console.log(nextScenario)
      }
    }

    // input 값 초기화 및 포커싱
    setValue('');
    // setCombo('');
    // setPeriod('');
    // setCount('');
    // setSticker('');
    // setAmount('');
    // inputRef.current.focus();
  };


  return (
    <div className="input-box-container">
        {/* 필수값 */}
        <div className="select_events_box">
          <Select
            type="text"
            name="scenarioItem"
            value={value}
            // ref={inputRef}
            placeholder="청취자 행위를 선택해주세요"
            options={options}
            onChange={handleChange}
            onCreateOption={handleCreate}
          />
        </div>
      <div className="input_default_setting_box">
        <div className="input_name">
          <h3>이벤트 발생 후 Delay time을 입력하세요</h3>
        </div>
        <div className="input_box">
          <input
            className='input-tag'
            type="number"
            name="period"
            period={period}
            // ref={inputRef}
            placeholder="delay time"
            onChange={onChangePeriodInput}
          />
        </div>
      </div>
      <div className="input_default_setting_box">
        <div className="input_name">
          <h3>이벤트 발생 횟수를 입력하세요</h3>
        </div>
        <div className="input_box">
          <input
            className='input-tag'
            type="number"
            name="count"
            count={count}
            // ref={inputRef}
            placeholder="count"
            onChange={onChangeCountInput}
          />
        </div>
      </div>
      {value.value=="present" && (
        <div className="input_default_setting_box">
          <div>
            <div className="input_name">
              <h3>스티커 개수를 입력하세요</h3>
            </div>
            <div className="input_box">
              <input
                className='input-tag'
                  type="number"
                  name="amount"
                  amount={amount}
                  // ref={inputRef}
                  placeholder="amount"
                  onChange={onChangeAmountInput}
              />
            </div>
            <div className="input_name">
              <h3>콤보 개수를 입력하세요</h3>
            </div>
            <div className="input_box">
              <input
                  className='input-tag'
                  type="number"
                  name="combo"
                  combo={combo}
                  // ref={inputRef}
                  placeholder="combo"
                  onChange={onChangeComboInput}
              />
            </div>
            <div className="input_name">
              <h3>스티커 종류를 선택하세요</h3>
            </div>
            <div className="input_box">
              <Select
                  type="text"
                  name="sticker"
                  sticker={sticker}
                  placeholder="sticker"
                  options={stickerOptions}
                  onChange={handleStickerChange}
                  onCreateOption={handleStickerCreate}
              />
            </div>
          </div>
        </div>
      )}

      {/* 입력 후 아이템 추가 버튼 */}
      <div className="input-button-box">
        <button
          type="submit"
          className="todoapp-add-btn"
          onClick={onClickAddButton}
        >
          추가
        </button>
      </div>
    </div>
  );
};

// props 값 검증
CommandInput.propTypes = {
  scenario: PropTypes.arrayOf( // (3)
    PropTypes.shape({ // (3-1)
      id: PropTypes.number.isRequired, // (3-2)
      count: PropTypes.string.isRequired,
      period: PropTypes.string.isRequired,
      value: PropTypes.object.isRequired, // (3-3)
    }).isRequired
  ),
  setScenario: PropTypes.func.isRequired, // (4)
};

export default CommandInput;
