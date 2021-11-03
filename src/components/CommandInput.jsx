import React, { useState, useCallback } from 'react';

import CommandInputOption from "./CommandInputOption";
import Present from "./Present";

const CommandInput = ({ setScenario }) => { // (1)

  const [command, setCommand] = useState('');
  const [label, setLabel] = useState('');
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

  const onHandleChange = (e) => {
    setCommand(e.target.value)
  }
  // const onHandleChange = useCallback((inputValue) => {
  //   console.log('inputValue', inputValue);
  //   setCommand(inputValue);
  // }, [setCommand]);

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
    console.log('command !!', command)
    const commandData = command;
    let updateCommands = null;
    let data = null;
      if (/present/gi.test(commandData)) {
        console.log('amount ', amount, 'combo ', combo, 'sticker ', sticker);
        if (!(amount && combo && sticker)) return alert('필수값 입력');

        data = { amount, combo, sticker }
      }


      updateCommands = { period, count, ...data ? { data } : null, ... { command } }

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
                    <option key={key} value={data?.value} >
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
      <div>
        <CommandInputOption command={command} period={period} count={count} combo={combo} amount={amount} sticker={sticker}
                            setCommand={setCommand} setPeriod={setPeriod} setCount={setCount}
                            setCombo={setCombo} setAmount={setAmount} setSticker={setSticker}
        />
        {/*{/present/gi.test(command) && (*/}
        {/*    <Present combo={combo} amount={amount} sticker={sticker} setCombo={setCombo} setAmount={setAmount} setSticker={setSticker}/>*/}
        {/*)}*/}
      </div>
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
