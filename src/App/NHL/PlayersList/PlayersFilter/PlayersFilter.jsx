import React, { useEffect, useState } from "react";
import { Input, Checkbox } from "semantic-ui-react";
import s from "./PlayersFilter.less";
import { positions } from "../PlayersList";

export const PlayersFilter = ({ onChange, value, checked, setChecked }) => {
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <div className={s.filter}>
            <div className={s.checkBoxes}>
                {positions.map((position) => (
                    <div className={s.checkBox} key={position.id}>
                        <Checkbox
                            label={position.name}
                            onChange={() => handleToggle(position.id)}
                            checked={checked && checked.includes(position.id)}
                        />
                    </div>
                ))}
            </div>
            <div>
                <Input
                    size="large"
                    placeholder={"Find player"}
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.currentTarget.value);
                    }}
                />
            </div>
        </div>
    );
};
