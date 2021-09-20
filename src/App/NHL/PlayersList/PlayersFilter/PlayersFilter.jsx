import React from "react";
import { Input, Button } from "semantic-ui-react";
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
            <div className={s.input}>
                <Input
                    fluid
                    size="small"
                    icon="search"
                    placeholder="Find player"
                    type="text"
                    value={value.query}
                    onChange={(e) => {
                        onChange(e.currentTarget.value);
                    }}
                />
            </div>
            <div className="buttonGroup">
                <Button.Group size="small">
                    {positions.map((position) => (
                        <Button
                            key={position.id}
                            active={
                                value.checked &&
                                value.checked.includes(position.id)
                            }
                            onClick={() => handleToggle(position.id)}
                        >
                            {position.name}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    );
};
