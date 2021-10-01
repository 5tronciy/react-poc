import * as React from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { Team } from "../../../../utils/form/types";
import { myFetch } from "../../../../utils/myFetch";

type Teams = {
    teams?: Team[];
};

type Props = {
    name: string;
    label: string;
    loading: boolean;
    error: unknown;
    value?: string;
    onChange: (event: SyntheticEvent<HTMLElement>, data: DropdownProps) => void;
};

export const TeamSelector = (props: Props) => {
    const [options, setOptions] = useState<Teams>({ teams: [] });

    useEffect(() => {
        const loadPlayer = async () => {
            const fetchedObject = await myFetch<Team>("team", {
                order: "fullName",
            });
            const data = fetchedObject.parsedBody.data;
            setOptions({ teams: data });
        };

        loadPlayer();
    }, []);

    return (
        <Form.Dropdown
            name={props.name}
            label={props.label}
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
            error={props.error}
            value={props.value}
            onChange={props.onChange}
            loading={props.loading}
        />
    );
};
