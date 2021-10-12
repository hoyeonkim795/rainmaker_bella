import React, {useCallback, useRef, useState} from 'react';
import Select from "react-select";
import CommandInput from "./CommandInput";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Scenario from "./Scenario";

const User = ({ users, user, setUser }) => {

    const handleChange = useCallback((inputValue) => setUser(inputValue), []);


    return (
      <div className='Users'>
        <Select
          type="text"
          name="user"
          value={users.i}
          placeholder="청취자 번호를 선택하를세요"
          options={users}
          onChange={handleChange}
        />
      </div>
    );
};

// props 값 검증


export default User;
