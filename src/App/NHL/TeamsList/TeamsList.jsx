import React, { useState, useEffect } from "react";
import { List, Image, Loader, Label } from "semantic-ui-react";
import s from "./TeamsList.less";
import { TeamsFilter } from "./TeamsFilter/TeamsFilter";
import { myFetch } from "../../../utils/myFetch";
import { delay } from "../../../utils/constants";

export const TeamsList = ({ selected, setSelected }) => {
    const [teams, setTeams] = useState(undefined);
    const [query, setQuery] = useState("");
    const [quantity, setQuantity] = useState(undefined);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

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
                signal
            );

            setTeams(data.data);
            setQuantity(data.total);
        }, delay);

        setSelected(null);
        return () => controller.abort() || clearTimeout(timeOutId);
    }, [query]);

    return (
        <div className={s.container}>
            <div className={s.filter}>
                <TeamsFilter onChange={setQuery} value={query} />
            </div>
            <div className={s.title}>
                <Label>{quantity}</Label>
            </div>
            <div className={s.teams}>
                <Loader active={teams === undefined} inline="centered" />
                <List selection verticalAlign="middle">
                    {(teams || []).map((team) => (
                        <List.Item
                            active={selected && team.id === selected.id}
                            key={team.id}
                            onClick={() => {
                                setSelected(team.id);
                            }}
                        >
                            <Image avatar src={`rest/team/${team.id}.svg`} />
                            <List.Content>{team.commonName}</List.Content>
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    );
};
