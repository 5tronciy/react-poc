import React, { useState, useEffect } from "react";
import { Loader, Card } from "semantic-ui-react";
import s from "./PlayersList.less";
import { PlayersFilter } from "./PlayersFilter/PlayersFilter";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import { myFetch } from "../../../utils/myFetch";
import { positions, delay } from "../../../utils/constants";

const map = positions.reduce(
    (acc, item) => ({ ...acc, [item.id]: item.name }),
    {}
);

export const PlayersList = ({ team }) => {
    const [players, setPlayers] = useState(undefined);
    const [query, setQuery] = useState("");
    const [checked, setChecked] = useState([]);

    const filter = () => {
        const filterBuilder = {
            parts: [],
            args: {},
        };

        filterBuilder.parts.push("team = $team");
        filterBuilder.args.team = team;

        filterBuilder.parts.push("lastName like $name");
        filterBuilder.args.name = `%${query}%`;

        checked.length &&
            filterBuilder.parts.push(
                checked
                    .map((id, index) => `position = $position_${index}`)
                    .join(" or ")
            );

        checked.reduce((acc, id, index) => {
            acc.args["position_" + index] = map[id];
            return acc;
        }, filterBuilder);

        const filterPlayer = {
            exp: filterBuilder.parts.map((p) => `(${p})`).join(" and "),
            params: filterBuilder.args,
        };
        return filterPlayer;
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const timeOutId = setTimeout(async () => {
            const data = await myFetch(
                "player",
                {
                    filter: filter(),
                    order: `[{"property":"position"},{"property":"lastName"},{"property":"firstName"}]`,
                },
                signal
            );

            setPlayers(data.data);
        }, delay);

        return () => controller.abort() || clearTimeout(timeOutId);
    }, [query]);

    useEffect(async () => {
        const data = await myFetch("player", {
            filter: filter(),
            order: `[{"property":"position"},{"property":"lastName"},{"property":"firstName"}]`,
        });

        setPlayers(data.data);
    }, [team, checked]);

    useEffect(() => {
        setQuery("");
        setChecked([]);
    }, [team]);

    return (
        <div className={s.container}>
            <div className={s.filter}>
                <PlayersFilter
                    onChange={setQuery}
                    value={{ query, checked, setChecked }}
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
