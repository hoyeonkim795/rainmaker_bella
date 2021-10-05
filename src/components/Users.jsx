import React, {useCallback, useRef, useState} from 'react';
import Select from "react-select";

const Users = ({ scenario, setScenario }) => {
    const [user, setUser] = useState('');
    const [users, setUsers] = useState([
        {
            name: "Android", scenario: []
        },
        {
            name: "IOS", scenario: []
        },
        {
            name: "Web", scenario: []
        }

    ]);


    const handleChange = useCallback((inputValue) => setUser(inputValue), []);

    const handleCreate = useCallback(
        (inputValue) => {
            const newValue = { scenario: inputValue.toLowerCase(), name: inputValue };
            setUsers([...users, newValue]);
            setUsers(newValue);
        },
        [users]
    );

    return (
      <div className='Users'>
        <Select
          type="text"
          name="user"
          value={user}
          // ref={inputRef}
          placeholder="청취자 종류를 선택하세요"
          options={users}
          onChange={handleChange}
          onCreateOption={handleCreate}
        />
      </div>
    );
};

// props 값 검증


export default Users;
