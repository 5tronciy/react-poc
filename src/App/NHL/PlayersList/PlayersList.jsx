import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { Loader } from "semantic-ui-react";
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

    const debouncedFetch = useRef(
        debounce(async (query) => {
            const positionChecked =
                checked.length > 0
                    ? "and (" +
                      checked
                          .map(
                              (id) =>
                                  "position = '" +
                                  positions.find((pos) => pos.id === id).name +
                                  "'"
                          )
                          .join(" or ") +
                      ")"
                    : "";
            const filterPlayer = {
                exp: `team.commonName = $team and lastName like $name ${positionChecked}`,
                params: {
                    team: team.commonName,
                    name: "%" + query + "%",
                },
            };
            const data = await myFetch("player", {
                filter: filterPlayer,
                include: ["team"],
                order: `[{"property":"position"},{"property":"lastName"},{"property":"firstName"}]`,
            });
            setPlayers(data.data);
        }, 200)
    ).current;

    useEffect(() => {
        debouncedFetch(query);
    }, [debouncedFetch, team, query, checked]);

    useEffect(() => {
        setQuery("");
    }, [team]);

    return (
        <div>
            <div>
                <PlayersFilter
                    onChange={setQuery}
                    value={query}
                    checked={checked}
                    setChecked={setChecked}
                />
            </div>
            <div className={s.players}>
                <Loader active={players === undefined} />
                {(players || []).map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
};
