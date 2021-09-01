import React from "react";
import { Input } from "semantic-ui-react";
import s from "./TeamsFilter.less";

export const TeamsFilter = ({ onChange, value }) => {
    return (
        <div className={s.searchBar}>
            <Input
                size="large"
                placeholder={"Find team"}
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
            />
        </div>
    );
};
