import React, { useState, useEffect } from "react";
import s from "./PlayersList.less";
import { SearchBar } from "../SearchBar/SearchBar";
import { PlayerCard } from "../PlayerCard/PlayerCard";

export const PlayersList = ({ team }) => {
  const [players, setPlayers] = useState([]);
  const [tempSearchPlayer, setTempSearchPlayer] = useState("");
  const [searchPlayer, setSearchPlayer] = useState("");

  useEffect(async () => {
    const filterPlayer = {
      exp: "team.commonName = $team and lastName like $name",
      params: {
        team: team,
        name: "%" + searchPlayer + "%",
      },
    };
    const response = await fetch(
      `${
        process.env.SERVER_REST
      }/player?include=team&cayenneExp=${encodeURIComponent(
        JSON.stringify(filterPlayer)
      )}&sort=lastName`
    );
    const data = await response.json();
    setPlayers(data.data);
  }, [team, searchPlayer]);

  useEffect(() => {
    setTempSearchPlayer("");
    setSearchPlayer("");
  }, [team]);

  return (
    <div>
      <div>
        <SearchBar
          tempSearch={tempSearchPlayer}
          setTempSearch={setTempSearchPlayer}
          setSearch={setSearchPlayer}
          name="player"
        />
      </div>
      <div className={s.players}>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};
