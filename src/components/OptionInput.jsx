import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";

const CommandInput = ({ scenario, setScenario }) => { // (1)
  const [period, setPeriod] = useState('');
  const [count, setCount] = useState('');
  const [amount, setAmount] = useState('');
  const [combo, setCombo] = useState('');
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
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
      setStickerOptions([...stickerOptions, newValue]);
      setValue(newValue);
    },
    [stickerOptions]
  );

  const onClickAddButton = () => {

    const nextTodoList = scenario.concat({ // (2)
      id: scenario.length, // (2-1)
      value, // (2-2)
      deleted: false
    });
    setScenario(nextTodoList);

    // input 값 초기화 및 포커싱
    setValue('');
    inputRef.current.focus();
  };


  return (

    <div className="todoapp__inputbox">

      {/* 아이템 내용 입력 input */}
      <input
        type="number"
        name="period"
        value={period}
        ref={inputRef}
        placeholder="발생시각"
        className="todoapp__inputbox-inp"
        onChange={onChangePeriodInput}
      />
      <input
        type="number"
        name="count"
        value={count}
        ref={inputRef}
        placeholder="카운트 수"
        className="todoapp__inputbox-inp"
        onChange={onChangeCountInput}
      />
      <input
        type="number"
        name="todoItem"
        value={amount}
        ref={inputRef}
        placeholder="amount"
        className="todoapp__inputbox-inp"
        onChange={onChangeAmountInput}
      />
      <input
        type="number"
        name="combo"
        value={combo}
        ref={inputRef}
        placeholder="combo"
        className="todoapp__inputbox-inp"
        onChange={onChangeComboInput}
      />
      <Select
        type="text"
        name="scenarioItem"
        value={value}
        ref={inputRef}
        placeholder="sticker"
        className="todoapp__inputbox-inp"
        options={stickerOptions}
        onChange={handleChange}
        onCreateOption={handleCreate}
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
CommandInput.propTypes = {
  scenario: PropTypes.arrayOf( // (3)
    PropTypes.shape({ // (3-1)
      id: PropTypes.number.isRequired, // (3-2)
      value: PropTypes.object.isRequired, // (3-3)
    }).isRequired
  ),
  setScenario: PropTypes.func.isRequired, // (4)
};

export default CommandInput;