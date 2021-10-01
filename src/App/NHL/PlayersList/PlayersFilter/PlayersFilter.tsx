import * as React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import s from "./PlayersFilter.less";
import { positions } from "../../../../utils/constants";
import { PlayerEditor } from "../../PlayerEditor/PlayerEditor";

type Props = {
    onChange: Dispatch<SetStateAction<string>>;
    value: {
        query: string;
        checked: number[];
        setChecked: Dispatch<SetStateAction<number[]>>;
    };
};

export const PlayersFilter = (props: Props) => {
    const [open, setOpen] = useState(false);

    const handleToggle = (val: number) => {
        const currentIndex = props.value.checked.indexOf(val);
        const newChecked = [...props.value.checked];
        if (currentIndex === -1) {
            newChecked.push(val);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        props.value.setChecked(newChecked);
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
                    value={props.value.query}
                    onChange={(e) => {
                        props.onChange(e.currentTarget.value);
                    }}
                />
            </div>
            <div className="buttonGroup">
                <Button.Group size="small">
                    {positions.map((position) => (
                        <Button
                            key={position.id}
                            active={
                                props.value.checked &&
                                props.value.checked.includes(position.id)
                            }
                            onClick={() => handleToggle(position.id)}
                        >
                            {position.name}
                        </Button>
                    ))}
                </Button.Group>
            </div>
            {open && (
                <PlayerEditor open={open} onClose={() => setOpen(false)} />
            )}
        </div>
    );
};
