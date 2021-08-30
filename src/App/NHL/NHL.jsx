import React, { useState, useEffect } from "react";
import { Input, Button, Card, Icon, Image } from "semantic-ui-react";
import "./NHL.less";

const NHL = () => {
  const [teams, setTeams] = useState([]);
  const [tempSearchTeam, setTempSearchTeam] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [tempSearchPlayer, setTempSearchPlayer] = useState("");
  const [searchPlayer, setSearchPlayer] = useState("");

  const filterTeam = {
    exp: "commonName like $name",
    params: {
      name: "%" + searchTeam + "%",
    },
  };

  const filterPlayer = {
    exp: "team.commonName = $team and lastName like $name",
    params: {
      team: selectedTeam,
      name: "%" + searchPlayer + "%",
    },
  };

  useEffect(() => {
    fetch(
      `${process.env.SERVER_REST}/team?cayenneExp=${encodeURIComponent(
        JSON.stringify(filterTeam)
      )}&sort=commonName`
    )
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.data);
      });
    setSelectedTeam("");
  }, [searchTeam]);

  useEffect(() => {
    if (selectedTeam) {
      fetch(
        `${
          process.env.SERVER_REST
        }/player?include=team&cayenneExp=${encodeURIComponent(
          JSON.stringify(filterPlayer)
        )}&sort=lastName`
      )
        .then((res) => res.json())
        .then((data) => {
          setPlayers(data.data);
        });
    } else {
      setPlayers([]);
    }
  }, [selectedTeam, searchPlayer]);

  useEffect(() => {
    setTempSearchPlayer("");
    setSearchPlayer("");
  }, [selectedTeam]);

  return (
    <div className="wrapper">
      <div className="teams">
        <Input
          placeholder="Find team"
          type="text"
          value={tempSearchTeam}
          onChange={(e) => {
            setTempSearchTeam(e.currentTarget.value);
          }}
        />
        <Button
          onClick={() => {
            setSearchTeam(tempSearchTeam);
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

      <div className="players-wrapper">
        <div className="players-searchBar">
          <Input
            placeholder="Find player"
            type="text"
            value={tempSearchPlayer}
            onChange={(e) => {
              setTempSearchPlayer(e.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              setSearchPlayer(tempSearchPlayer);
            }}
          >
            Find
          </Button>
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
    </div>
  );
};

export default NHL;
