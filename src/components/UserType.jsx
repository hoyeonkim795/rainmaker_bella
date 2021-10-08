import React, {useCallback, useRef, useState} from 'react';
import Select from "react-select";

const UserType=({}) => {
    const [value, setValue] = useState([]);
    const [os, setOS] = useState([
            {
                label: "Android", value: "Android"
            } ,
            {
                label: "Web", value: "Web"
            },
            {
                label : "IOS", value: "iOS"
            }
        ]
    );

    const [appVersion, setappVersion] = useState(
        {
            label: "PRD"
        }
    )

    const handleChange = useCallback((inputValue) => setValue(inputValue), []);

    const handleCreate = useCallback(
        (inputValue) => {
            const newValue = { label: inputValue, value: inputValue };
            setOS([...os, newValue]);
            setValue(newValue);
        },
        [os]
    );

    return (
        <Select
            type="text"
            name="user"
            value={value}
            placeholder="청취자 종류를 선택하세요"
            options={os}
            onChange={handleChange}
            onCreateOption={handleCreate}
        />
    );
};


export default UserType;