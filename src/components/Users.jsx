import React from 'react';
// import Select from "react-select";
// import CommandInput from "./CommandInput";
// import {DndProvider} from "react-dnd";
// import {HTML5Backend} from "react-dnd-html5-backend";
// import Scenario from "./Scenario";

const Users = ({ users, selectedUser, setSelectedUser }) => {
    /* const handleChange = useCallback((e) => {
      setSelectedUser(inputValue)
    }); */

    const handleChange = (e) => {
      const selectedUser = e.target.value;

      setSelectedUser(selectedUser);
    }

    return (
      <div className='Users'>
        {/* <Select
          type="text"
          name="user"
          value={users.i}
          placeholder="청취자 번호를 선택하를세요"
          options={users}
          onChange={handleChange}
        /> */}
        <select
          onChange={handleChange}
          value={selectedUser}
          placeholder={'청취자 번호를 선택하세요.'}
        >
          {
            users.map((data, key) => {
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


export default Users;
