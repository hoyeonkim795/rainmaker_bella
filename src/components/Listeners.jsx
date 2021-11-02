import React from 'react';

const Listeners = ({ listeners, selectedListener, setSelectedListener }) => {


    const handleChange = (e) => {
      const selectedListener = e.target.value;

      setSelectedListener(selectedListener);
    }

    return (
      <div className='listeners'>
        <select
          className="user_number"
          onChange={handleChange}
          value={selectedListener}
          placeholder={'청취자 번호를 선택하세요.'}
        >
          {
            listeners.map((data, key) => {
              return (
                <option key={key} label={key}>
                  {key}
                </option>
              )
            })
          }
        </select>
      </div>
    );
};

// props 값 검증


export default Listeners;
