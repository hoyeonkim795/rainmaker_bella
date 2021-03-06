import React, { useState } from 'react';

import CommandInputOption from "./CommandInputOption";

const CommandInput = ({ setScenario }) => { // (1)
  const [sticker, setSticker] = useState('');
  const [options] = useState([
    { command: "leave", label: "퇴장" },
    { command: "join", label: "입장" },
    { command: "chat", label: "채팅" },
    { command: "present", label: "스푼" },
    { command: "like", label: "좋아요" },
  ]);
  const [command, setCommand] = useState(options[0]?.command);
  const [period, setPeriod] = useState(1000);
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState('');
  const [combo, setCombo] = useState('');

  const onHandleChange = (e) => {
    setCommand(e.target.value)
  }

  const onClickAddButton = () => {
    const commandData = options.find(data => data?.command === command);
    let updateCommands = null;
    let data = null;
      if (/present/gi.test(command)) {
        if (!(amount && combo && sticker)) return alert('필수값 입력');

        data = { amount, combo, sticker }
      }

      updateCommands = { period, count, ...data ? { data } : null, ...commandData }

      setScenario(updateCommands);
      setCommand(options[0]?.command);
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
                    <option key={key} value={data?.command} >
                      {data?.label}
                    </option>
                )
              })
            }
          </select>
        </div>
      <div>
        <CommandInputOption command={command} period={period} count={count} combo={combo} amount={amount} sticker={sticker}
                            setCommand={setCommand} setPeriod={setPeriod} setCount={setCount}
                            setCombo={setCombo} setAmount={setAmount} setSticker={setSticker}
        />
      </div>
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
