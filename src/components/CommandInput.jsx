import React, { useState, useCallback } from 'react';
import Present from "./Present";
import Select from "react-select";

const CommandInput = ({ setScenario }) => { // (1)

  const [command, setCommand] = useState('');
  const [sticker, setSticker] = useState('');
  const [options] = useState([
    { value: "leave", label: "퇴장" },
    { value: "join", label: "입장" },
    { value: "chat", label: "채팅" },
    { value: "present", label: "스푼" },
    { value: "like", label: "좋아요" },
  ])

  const [period, setPeriod] = useState(1000);
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState('');
  const [combo, setCombo] = useState('');

  const onChangeAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const onChangeComboInput = (e) => {
    setCombo(e.target.value);
  };

  const onChangeStickerInput = (e) => {
    setSticker(e.target.value)
  };

  const onChangePeriodInput = (e) => {
    setPeriod(e.target.value);
  };

  const onChangeCountInput = (e) => {
    setCount(e.target.value);
  };

  const onHandleChange = (e) => {
    const inputValue = e.target;
    setCommand(inputValue)
  }
  // const handleChange = useCallback((inputValue) => {
  //   console.log('inputValue', inputValue);
  //   setValue(inputValue);
  // }, [setValue]);

  // const handleCreate = useCallback(
  //   (inputValue) => {
  //     const newValue = { command: inputValue.toLowerCase(), label: inputValue };
  //
  //     setOptions([...options, newValue]);
  //     setValue(newValue);
  //   },
  //   [options]
  // );


  const onClickAddButton = () => {
    console.log('command', command)
    const commandData = command;
    let updateCommands = null;
    let data = null;
      if (/present/gi.test(commandData?.value)) {
        console.log('amount ', amount, 'combo ', combo, 'sticker ', sticker);
        if (!(amount && combo && sticker)) return alert('필수값 입력');

        data = { amount, combo, sticker }
      }

      updateCommands = { period, count, ...data ? { data } : null, ...{ command } }

      setScenario(updateCommands);
      setCommand('');
  };


  return (
    <div className="input-box-container">
        {/* 필수값 */}
        <div className="select_events_box">
          <select
              className="select_os_box"
              onChange={onHandleChange}
              value={command}
              placeholder="청취자 행위를 선택해주세요"
          >
            {
              options.map((data, key) => {
                return (
                    <option key={key} value={data}>
                      {data?.label}
                    </option>
                )
              })
            }
          </select>
          {/*<Select*/}
          {/*  type="text"*/}
          {/*  name="scenarioItem"*/}
          {/*  value={value}*/}
          {/*  placeholder="청취자 행위를 선택해주세요"*/}
          {/*  options={options}*/}
          {/*  onChange={handleChange}*/}
          {/*  // onCreateOption={handleCreate}*/}
          {/*/>*/}
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
      {/present/gi.test(command.value) && (
        <Present combo={combo} amount={amount} sticker={sticker} onChangeAmountInput={onChangeAmountInput} onChangeComboInput={onChangeComboInput} onChangeStickerInput={onChangeStickerInput}/>
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

export default CommandInput;
