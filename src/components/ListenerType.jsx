import React, {useState} from 'react';

const ListenerType=({updateAppVersion, appVersion, setAppVersion, listenerAgent, setListenersAgent}) => {
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
        const listenerAgent = e.target.value;

        setListenersAgent(listenerAgent)
    }

    const onKeyDownAppVersionInput = (e) => {
        if (e.keyCode !== 13) return;

        updateAppVersion();
    }

    const onSubmitAppVersionInput = () => {
        console.log('listenerAgent', appVersion);

        updateAppVersion();    
    }

    /* const handleChange = useCallback((inputValue) => setListenerAgent(inputValue)
        , []); */

    return (
        <div>
            <select
                className="select_os_box"
                onChange={handleChange}
                value={listenerAgent}
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


export default ListenerType;