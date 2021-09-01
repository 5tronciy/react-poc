import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import s from "./PlayersList.less";
import { SearchBar } from "../SearchBar/SearchBar";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import { myFetch } from "../../../utils/myFetch";

export const PlayersList = ({ team }) => {
    const [players, setPlayers] = useState(undefined);
    const [search, setSearch] = useState("");

    useEffect(async () => {
        const filterPlayer = {
            exp: "team.commonName = $team and lastName like $name",
            params: {
                team: team.commonName,
                name: "%" + search + "%",
            },
        };
        const response = await myFetch("player", {
            filter: filterPlayer,
            include: ["team"],
            order: "lastName",
        });
        const data = await response.json();
        setPlayers(data.data);
    }, [team, search]);

    useEffect(() => {
        setSearch("");
    }, [team]);

    return (
        <div>
            <div>
                <SearchBar
                    onChange={setSearch}
                    value={{ search: search, name: "player" }}
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
