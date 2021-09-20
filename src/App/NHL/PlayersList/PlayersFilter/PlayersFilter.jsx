import React, { useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import s from "./PlayersFilter.less";
import { positions } from "../../../../utils/constants";
import { PlayerCreator } from "../PlayerCreator/PlayerCreator";

export const PlayersFilter = ({ onChange, value }) => {
    const [open, setOpen] = useState(false);
    const player = { id: 8475788 };
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
            <div className="addPlayer">
                <Button
                    size="small"
                    icon
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <Icon name="add user" />
                </Button>
            </div>
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
            <PlayerCreator open={open} onClose={setOpen} value={player.id} />
        </div>
    );
};
