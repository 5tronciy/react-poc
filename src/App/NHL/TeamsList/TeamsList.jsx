import React, { useState, useEffect } from "react";
import { List, Image } from "semantic-ui-react";
import "./TeamsList.less";
import { SearchBar } from "../SearchBar/SearchBar";

export const TeamsList = ({ selectedTeam, setSelectedTeam }) => {
  const [teams, setTeams] = useState([]);
  const [tempSearchTeam, setTempSearchTeam] = useState("");
  const [searchTeam, setSearchTeam] = useState("");

  useEffect(async () => {
    const filterTeam = {
      exp: "commonName like $name",
      params: {
        name: "%" + searchTeam + "%",
      },
    };
    const response = await fetch(
      `${process.env.SERVER_REST}/team?cayenneExp=${encodeURIComponent(
        JSON.stringify(filterTeam)
      )}&sort=commonName`
    );
    const data = await response.json();
    setTeams(data.data);
    setSelectedTeam("");
  }, [searchTeam]);

  return (
    <div className="teams">
      <SearchBar
        tempSearch={tempSearchTeam}
        setTempSearch={setTempSearchTeam}
        setSearch={setSearchTeam}
        name="team"
      />
      <List selection verticalAlign="middle">
        {teams.map((team) => (
          <List.Item
            active={team.commonName === selectedTeam}
            key={team.id}
            onClick={() => {
              setSelectedTeam(team.commonName);
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
  );
};
