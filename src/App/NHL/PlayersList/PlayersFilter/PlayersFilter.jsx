import React from "react";
import { Input, Checkbox } from "semantic-ui-react";
import s from "./PlayersFilter.less";
import { positions } from "../../../../utils/constants";

export const PlayersFilter = ({ onChange, value }) => {
    const handleToggle = (val) => {
        const currentIndex = value.checked.indexOf(val);
        const newChecked = [...value.checked];
        if (currentIndex === -1) {
            newChecked.push(val);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        value.setChecked(newChecked);
    };

    return (
        <div className={s.container}>
            <div className={s.checkBoxes}>
                {positions.map((position) => (
                    <div className={s.checkBox} key={position.id}>
                        <Checkbox
                            label={position.name}
                            onChange={() => handleToggle(position.id)}
                            checked={
                                value.checked &&
                                value.checked.includes(position.id)
                            }
                        />
                    </div>
                ))}
            </div>
            <div className={s.input}>
                <Input
                    size="large"
                    icon="search"
                    placeholder="Find player"
                    type="text"
                    value={value.query}
                    onChange={(e) => {
                        onChange(e.currentTarget.value);
                    }}
                />
            </div>
        </div>
    );
};
