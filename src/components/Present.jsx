import React, {useCallback, useState} from "react";
import Select from "react-select";

const Present = (amount, combo, sticker, onChangeAmountInput, onChangeComboInput, onChangeStickerInput) => {
    const [stickerOptions, setStickerOptions] = useState([
        { value: "sticker_jp_juice", label: "sticker_jp_juice" },
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
                    <Select
                        type="text"
                        name="sticker"
                        sticker={sticker}
                        placeholder="sticker"
                        options={stickerOptions}
                        onChange={onChangeStickerInput}
                    />
                </div>
            </div>
        </div>
    )
};

export default Present;