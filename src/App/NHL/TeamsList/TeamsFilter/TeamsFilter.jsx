import React from "react";
import { Input, Label, Icon } from "semantic-ui-react";
import s from "./TeamsFilter.less";

export const TeamsFilter = ({ onChange, value, quantity }) => {
    return (
        <div className={s.searchBar}>
            <Input
                size="large"
                iconPosition="left"
                labelPosition="right"
                placeholder="Find team"
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
            >
                <input />
                <Icon name="search" />
                {quantity && <Label>{quantity}</Label>}
            </Input>
        </div>
    );
};
