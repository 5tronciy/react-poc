import React, { useEffect, useState } from "react";
import { Input, Button, Icon, Checkbox } from "semantic-ui-react";
import s from "./PlayersFilter.less";
import { positions } from "../PlayersList";

export const PlayersFilter = ({ onChange, value, checked, setChecked }) => {
    const [tempSearch, setTempSearch] = useState("");

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

    useEffect(() => {
        setTempSearch(value.search);
    }, [value]);

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
                    action={
                        <Button
                            icon
                            onClick={() => {
                                onChange(tempSearch);
                            }}
                        >
                            <Icon name="search" />
                        </Button>
                    }
                    placeholder={`Find ${value.name}`}
                    type="text"
                    value={tempSearch}
                    onChange={(e) => {
                        setTempSearch(e.currentTarget.value);
                    }}
                />
            </div>
        </div>
    );
};
