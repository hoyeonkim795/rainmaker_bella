import React, {useCallback, useState} from "react";
import Select from "react-select";

const Present = ({amount, combo, sticker, setAmount, setCombo, setSticker}) => {
    const onChangeAmountInput = (e) => {
        const amount = parseInt(e.target.value, 10)
        setAmount(amount);
    };

    const onChangeComboInput = (e) => {
        const combo = parseInt(e.target.value, 10)
        setCombo(combo);
    };

    const handleStickerChange = (e) => {
        const sticker = e.target.value;
        setSticker(sticker)
    }
    // const handleStickerChange = useCallback((inputValue) => setSticker(inputValue), []);

    const [stickerOptions, setStickerOptions] = useState([
        { value: "sticker_jp_juice", label: "sticker_jp_juice" },
        { value: "sticker_kr_juice", label: "sticker_kr_juice" },
        { value: "sticker_us_juice", label: "sticker_us_juice" },
    ])
    return (
        <div className="input_default_setting_box">
            <div>
                <div className="input_name">
                    <h3>스티커 개수를 입력하세요</h3>
                </div>
                <div className="input_box">
                    <input
                        className='input-tag'
                        type="number"
                        name="amount"
                        amount={amount}
                        placeholder="amount"
                        onChange={onChangeAmountInput}/>
                </div>
                <div className="input_name">
                    <h3>콤보 개수를 입력하세요</h3>
                </div>
                <div className="input_box">
                    <input
                        className='input-tag'
                        type="number"
                        name="combo"
                        combo={combo}
                        placeholder="combo"
                        onChange={onChangeComboInput}/>
                </div>
                <div className="input_name">
                    <h3>스티커 종류를 선택하세요</h3>
                </div>
                <div className="input_box">
                    <select
                        className="select_sticker_box"
                        onChange={handleStickerChange}
                        value={sticker}
                        placeholder={'청취자 번호를 선택하세요.'}
                    >
                        {
                            stickerOptions.map((data, key) => {
                                return (
                                    <option key={key} value={data?.value}>
                                        {data?.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {/*<Select*/}
                    {/*    type="text"*/}
                    {/*    name="sticker"*/}
                    {/*    sticker={sticker}*/}
                    {/*    placeholder="sticker"*/}
                    {/*    options={stickerOptions}*/}
                    {/*    onChange={handleStickerChange}*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
    )
};

export default Present;