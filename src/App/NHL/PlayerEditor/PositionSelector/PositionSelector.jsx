import React from "react";
import { Form } from "semantic-ui-react";
import { positions } from "../../../../utils/constants";

export const PositionSelector = ({
    name,
    label,
    loading,
    error,
    value,
    onChange,
}) => {
    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    return (
        <Form.Dropdown
            name={name}
            label={label}
            placeholder="Position"
            options={options}
            selection
            error={error}
            value={value}
            onChange={onChange}
            loading={loading}
        />
    );
};
