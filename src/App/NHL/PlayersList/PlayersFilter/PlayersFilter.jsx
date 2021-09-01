import React, { useEffect, useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import s from "./PlayersFilter.less";

export const PlayersFilter = ({ onChange, value }) => {
    const [tempSearch, setTempSearch] = useState("");
    useEffect(() => {
        setTempSearch(value.search);
    }, [value]);
    return (
        <div className={s.searchBar}>
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
    );
};
