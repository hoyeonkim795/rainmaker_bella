import React, {useCallback, useRef, useState} from 'react';
import Select from "react-select";

const UserType=({updateAppVersion, appVersion, setAppVersion, userAgent, setUserAgent}) => {
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

    const handleChange = (e) => {
        const userAgent = e.target.value;

        setUserAgent(userAgent)
    }

    const onKeyDownAppVersionInput = (e) => {
        if (e.keyCode !== 13) return;

        updateAppVersion();
    }

    const onSubmitAppVersionInput = () => {
        console.log('userAgent', appVersion);

        updateAppVersion();    
    }

    /* const handleChange = useCallback((inputValue) => setUserAgent(inputValue)
        , []); */

    return (
        <div>
            { /* <Select
                type="text"
                name="user"
                value={userAgent}
                placeholder="청취자 OS를 선택하세요"
                options={options}
                onChange={handleChange}
            /> */}
            <select
                className="select_os_box"
                onChange={handleChange}
                value={userAgent}
                placeholder="청취자 OS를 선택하세요"
            >
                {
                    options.map((data, key) => {
                        return (
                            <option key={key} value={data?.value}>
                                {data?.label}
                            </option>
                        )
                    })
                }
            </select>
            <br/>
            <br/>
            <div className='wrap-appversion'>
                <input
                    className='input-appversion-tag'
                    type="text"
                    name="appVersion"
                    value={appVersion}
                    placeholder="앱 버전을 입력하세요"
                    onChange={onChangeAppVersionInput}
                    onKeyDown={onKeyDownAppVersionInput}
                />
                <button className="save_usertype" onClick={onSubmitAppVersionInput}>저장</button>
            </div>
        </div>
    );
};


export default UserType;