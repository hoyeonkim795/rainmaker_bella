import React from 'react';

const Users = ({ users, selectedUser, setSelectedUser }) => {


    const handleChange = (e) => {
      const selectedUser = e.target.value;

      setSelectedUser(selectedUser);
    }

    return (
      <div className='Users'>
        <select
          className="user_number"
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
