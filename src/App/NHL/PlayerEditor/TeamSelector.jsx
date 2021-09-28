import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { myFetch } from "../../../utils/myFetch";

export const TeamSelector = ({ name, label, formik }) => {
    const [options, setOptions] = useState({ teams: [] });

    useEffect(() => {
        const loadPlayer = async () => {
            const fetchedObject = await myFetch("team", { order: "fullName" });
            const data = fetchedObject.parsedBody.data;
            setOptions(() => {
                return { teams: data };
            });
        };

        loadPlayer();
    }, []);

    return (
        <Form.Dropdown
            name={name}
            label={label}
            placeholder="Team"
            options={(options.teams || []).map((team) => {
                return {
                    key: team.id,
                    value: team.id,
                    text: team.commonName,
                    image: {
                        avatar: true,
                        src: `rest/team/${team.id}.svg`,
                    },
                };
            })}
            selection
            error={formik.touched.team && formik.errors.team}
            value={formik.values.team}
            onChange={(_, { value }) => formik.setFieldValue("team", value)}
        />
    );
};
