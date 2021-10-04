import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";

const CommandInput = ({ scenario, setScenario }) => { // (1)

  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const [options, setOptions] = useState([
    { value: "leave", label: "퇴장" },
    { value: "join", label: "입장" },
    { value: "chat", label: "채팅" },
    { value: "present", label: "스푼" },
  ])


  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
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
      <Select
        type="text"
        name="scenarioItem"
        value={value}
        ref={inputRef}
        placeholder="청취자 행위를 선택해주세요"
        className="todoapp__inputbox-inp"
        options={options}
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