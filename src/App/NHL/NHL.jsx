import React, { useState, useEffect } from "react";
import { Input, Button, Card, Icon, Image } from "semantic-ui-react";
import "./NHL.less";

const NHL = () => {
  const [teams, setTeams] = useState([]);
  const [tempSearch, setTempSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState([]);

  const filter = {
    exp: "commonName like $name",
    params: {
      name: "%" + search + "%",
    },
  };

  useEffect(() => {
    fetch(
      `${process.env.SERVER_REST}/team?cayenneExp=${encodeURIComponent(
        JSON.stringify(filter)
      )}&sort=commonName`
    )
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.data);
      });
  }, [search]);

  useEffect(() => {
    if (!!selectedTeam) {
      fetch(
        `${process.env.SERVER_REST}/player?include=team&cayenneExp=team.commonName="${selectedTeam}"&sort=lastName`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setPlayers(data.data);
        });
    }
  }, [selectedTeam]);

  return (
    <div className="wrapper">
      <div className="teams">
        <Input
          placeholder="Find team "
          type="text"
          value={tempSearch}
          onChange={(e) => {
            setTempSearch(e.currentTarget.value);
          }}
        />
        <Button
          onClick={() => {
            setSearch(tempSearch);
          }}
        >
          Find
        </Button>
        <ul>
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => {
                setSelectedTeam(team.commonName);
              }}
            >
              {team.commonName}
            </li>
          ))}
        </ul>
      </div>
      <div className="players">
        {players.map((player) => (
          <Card key={player.id} style={{ margin: "1em" }}>
            <Card.Content>
              <Image
                src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`}
                label={{
                  as: "a",
                  color: "orange",
                  content: player.position,
                  ribbon: "right",
                }}
              />
              <Card.Header>
                {`${player.firstName} ${player.lastName}`}
              </Card.Header>
              <Card.Meta>{player.birthDate}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NHL;
