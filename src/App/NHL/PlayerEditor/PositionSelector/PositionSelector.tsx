import * as React from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { positions } from "../../../../utils/constants";

type Props = {
    name: string;
    label: string;
    loading: boolean;
    error: unknown;
    value?: string;
    onChange: (
        event: React.SyntheticEvent<HTMLElement>,
        data: DropdownProps
    ) => void;
};

export const PositionSelector = (props: Props) => {
    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    return (
        <Form.Dropdown
            name={props.name}
            label={props.label}
            placeholder="Position"
            options={options}
            selection
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            loading={props.loading}
        />
    );
};
