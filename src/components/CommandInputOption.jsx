import React from "react";
import Present from "./Present";

const CommandInputOption = ({value, period, count, combo, amount, sticker, setAmount, setCombo, setSticker, setPeriod, setCount}) => {
    const onChangeAmountInput = (e) => {
        const amount = parseInt(e.target.value, 10)
        setAmount(amount);
    };

    const onChangeComboInput = (e) => {
        const combo = parseInt(e.target.value, 10)
        setCombo(combo);
    };

    const onChangeStickerInput = (e) => {
        setSticker(e.target.value)
    };

    const onChangePeriodInput = (e) => {
        const period = parseInt(e.target.value, 10)
        console.log('period',e.target.value)
        setPeriod(period);
    };

    const onChangeCountInput = (e) => {
        const count = parseInt(e.target.value, 10)
        setCount(count);
    };
    return (
        <div>
            <div className="input_default_setting_box">
                <div className="input_name">
                    <h3>이벤트 발생 후 Delay time을 입력하세요</h3>
                </div>
                <div className="input_box">
                    <input
                        className='input-tag'
                        type="number"
                        name="period"
                        period={period}
                        placeholder="delay time"
                        onChange={onChangePeriodInput}
                    />
                </div>
            </div>
            <div className="input_default_setting_box">
                <div className="input_name">
                    <h3>이벤트 발생 횟수를 입력하세요</h3>
                </div>
                <div className="input_box">
                    <input
                        className='input-tag'
                        type="number"
                        name="count"
                        count={count}
                        placeholder="count"
                        onChange={onChangeCountInput}
                    />
                </div>
            </div>
            {/*{/present/gi.test(value.command) && (*/}
            {/*    <Present combo={combo} amount={amount} sticker={sticker} onChangeAmountInput={onChangeAmountInput} onChangeComboInput={onChangeComboInput} onChangeStickerInput={onChangeStickerInput}/>*/}
            {/*)}*/}
        </div>
    )
};

export default CommandInputOption