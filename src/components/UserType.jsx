import React, {useCallback, useRef, useState} from 'react';
import Select from "react-select";

const UserType=({users, setUsers, selectedUser, setSelectedUser, appVersion, setAppVersion, userAgent, setUserAgent}) => {
    const [options] = useState([
        {
            label: "Android", value: "Android"
        },
        {
            label: "Web", value: "Web"
        },
        {
            label : "IOS", value: "iOS"
        }
    ]);

    const onChangeAppVersionInput = (e) => {

        setAppVersion(e.target.value);

    };

    const handleChange = useCallback((inputValue) => setUserAgent(inputValue)
        , []);

    return (
        <div>
            <Select
                type="text"
                name="user"
                value={userAgent}
                placeholder="청취자 OS를 선택하세요"
                options={options}
                onChange={handleChange}
            />
            <br/>
            <input
                className='input-appversion-tag'
                type="text"
                name="appVersion"
                value={appVersion}
                placeholder="앱 버전을 입력하세요"
                onChange={onChangeAppVersionInput}
            />
            <br/>

        </div>
    );
};


export default UserType;