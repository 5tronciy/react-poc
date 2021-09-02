import React, { useState, useEffect } from "react";
import { List, Image, Loader } from "semantic-ui-react";
import s from "./TeamsList.less";
import { TeamsFilter } from "./TeamsFilter/TeamsFilter";
import { myFetch } from "../../../utils/myFetch";

export const TeamsList = ({ selected, setSelected }) => {
    const [teams, setTeams] = useState(undefined);
    const [query, setQuery] = useState("");
    const [quantity, setQuantity] = useState(undefined);

    useEffect(() => {
        const controller = new AbortController();
        const cancelToken = controller.signal;

        const timeOutId = setTimeout(async () => {
            const filterTeam = {
                exp: "commonName like $name",
                params: {
                    name: "%" + query + "%",
                },
            };

            const data = await myFetch(
                "team",
                {
                    filter: filterTeam,
                    order: "commonName",
                },
                cancelToken
            );

            setTeams(data.data);
            setQuantity(data.total);
        }, 200);

        setSelected(null);
        return () => controller.abort() || clearTimeout(timeOutId);
    }, [query]);

    return (
        <div className={s.teams}>
            <div>
                <TeamsFilter
                    onChange={setQuery}
                    value={query}
                    quantity={quantity}
                />
            </div>
            <div>
                <Loader active={teams === undefined} inline="centered" />
                <List selection verticalAlign="middle">
                    {(teams || []).map((team) => (
                        <List.Item
                            active={selected && team.id === selected.id}
                            key={team.id}
                            onClick={() => {
                                setSelected(team);
                            }}
                        >
                            <Image
                                avatar
                                src={`${process.env.SERVER_REST}/team/${team.id}.svg`}
                            />
                            <List.Content>{team.commonName}</List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    );
};
