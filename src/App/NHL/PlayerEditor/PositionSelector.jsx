import React from "react";
import { Form } from "semantic-ui-react";
import { positions } from "../../../utils/constants";

export const PositionSelector = ({ name, label, formik, loading }) => {
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
            error={formik.touched.position && formik.errors.position}
            value={formik.values.position}
            onChange={(_, { value }) => formik.setFieldValue("position", value)}
            loading={loading}
        />
    );
};
