import * as React from "react";
import { Input } from "semantic-ui-react";
import s from "./TeamsFilter.less";

type Props = {
    onChange: (value: string) => void;
    value: string;
};

export const TeamsFilter = (props: Props) => {
    return (
        <div className={s.container}>
            <Input
                size="small"
                icon="search"
                placeholder="Find team"
                type="text"
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.currentTarget.value);
                }}
            />
        </div>
    );
};
