import * as React from "react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { List, Loader, Label, Segment } from "semantic-ui-react";
import s from "./TeamsList.less";
import { TeamsFilter } from "./TeamsFilter/TeamsFilter";
import { myFetch } from "../../../utils/myFetch";
import { delay } from "../../../utils/constants";
import { TeamsListItem } from "./TeamsListItem/TeamsListItem";
import { Team } from "../../../utils/form/types";

type Props = {
    selected: number | null;
    setSelected: Dispatch<SetStateAction<number | null>>;
};

export const TeamsList = (props: Props) => {
    const [teams, setTeams] = useState<Team[]>();
    const [query, setQuery] = useState<string>("");
    const [quantity, setQuantity] = useState<number>();

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

            const fetchedObject = await myFetch<Team>(
                "team",
                {
                    filter: filterTeam,
                    order: "commonName",
                },
                signal
            );
            const data = fetchedObject.parsedBody;
            setTeams(data.data);
            setQuantity(data.total);
        }, delay);

        props.setSelected(null);
        return (() => controller.abort()) || clearTimeout(timeOutId);
    }, [query]);

    return (
        <div className={s.container}>
            <Segment.Group>
                <Segment>
                    <div className={s.filter}>
                        <div className="input">
                            <TeamsFilter onChange={setQuery} value={query} />
                        </div>
                        <div className={s.title}>
                            <Label>{quantity}</Label>
                        </div>
                    </div>
                </Segment>
                <Segment>
                    <div className={s.teams}>
                        <div className="loader">
                            <Loader
                                active={teams === undefined}
                                inline="centered"
                            />
                        </div>
                        <div className="list">
                            <List selection verticalAlign="middle">
                                {(teams || []).map((team) => (
                                    <TeamsListItem
                                        key={team.id}
                                        item={team}
                                        selected={props.selected}
                                        select={props.setSelected}
                                    />
                                ))}
                            </List>
                        </div>
                    </div>
                </Segment>
            </Segment.Group>
        </div>
    );
};
