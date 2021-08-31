import React, { useState, useEffect } from "react";
import { List, Image } from "semantic-ui-react";
import s from "./TeamsList.less";
import { SearchBar } from "../SearchBar/SearchBar";
import { myFetch } from "../../../utils/myFetch";

export const TeamsList = ({ selectedTeam, setSelectedTeam }) => {
    const [teams, setTeams] = useState([]);
    const [searchTeam, setSearchTeam] = useState("");

    useEffect(async () => {
        const filterTeam = {
            exp: "commonName like $name",
            params: {
                name: "%" + searchTeam + "%",
            },
        };
        const response = await myFetch("team", {
            filter: filterTeam,
            order: "commonName",
        });
        const data = await response.json();
        setTeams(data.data);
        setSelectedTeam("");
    }, [searchTeam]);

    return (
        <div className={s.teams}>
            <SearchBar
                onChange={setSearchTeam}
                value={{ search: searchTeam, name: "team" }}
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
