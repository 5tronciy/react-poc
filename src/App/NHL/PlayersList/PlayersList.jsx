import React, { useState, useEffect } from "react";
import { Loader, Card } from "semantic-ui-react";
import s from "./PlayersList.less";
import { PlayersFilter } from "./PlayersFilter/PlayersFilter";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import { myFetch } from "../../../utils/myFetch";

export const positions = [
    { id: 1, name: "L" },
    { id: 2, name: "C" },
    { id: 3, name: "G" },
    { id: 4, name: "D" },
    { id: 5, name: "R" },
];

export const PlayersList = ({ team }) => {
    const [players, setPlayers] = useState(undefined);
    const [query, setQuery] = useState("");
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const cancelToken = controller.signal;

        const timeOutId = setTimeout(async () => {
            const filterBuilder = {
                parts: ["team = $team", "lastName like $name"],
                args: {},
            };

            if (checked.length > 0) {
                filterBuilder.parts.push(
                    "(" +
                        checked
                            .map(
                                (id) =>
                                    "position = '" +
                                    positions.find((pos) => pos.id === id)
                                        .name +
                                    "'"
                            )
                            .join(" or ") +
                        ")"
                );
            }

            const filterPlayer = {
                exp: filterBuilder.parts.join(" and "),
                params: {
                    team: team,
                    name: "%" + query + "%",
                    position: checked.map(
                        (id) => positions.find((pos) => pos.id === id).name
                    ),
                },
            };

            const data = await myFetch(
                "player",
                {
                    filter: filterPlayer,
                    order: `[{"property":"position"},{"property":"lastName"},{"property":"firstName"}]`,
                },
                cancelToken
            );

            setPlayers(data.data);
        }, 200);

        return () => controller.abort() || clearTimeout(timeOutId);
    }, [team, query, checked]);

    useEffect(() => {
        setQuery("");
    }, [team]);

    return (
        <div className={s.container}>
            <div className={s.filter}>
                <PlayersFilter
                    onChange={setQuery}
                    value={query}
                    checked={checked}
                    setChecked={setChecked}
                />
            </div>
            <div className={s.players}>
                <Loader active={players === undefined} />
                <Card.Group>
                    {(players || []).map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </Card.Group>
            </div>
        </div>
    );
};
