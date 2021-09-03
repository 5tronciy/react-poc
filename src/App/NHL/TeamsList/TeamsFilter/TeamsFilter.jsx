import React from "react";
import { Input } from "semantic-ui-react";
import s from "./TeamsFilter.less";

export const TeamsFilter = ({ onChange, value }) => {
    return (
        <div className={s.container}>
            <Input
                size="large"
                icon="search"
                placeholder="Find team"
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
            />
        </div>
    );
};
