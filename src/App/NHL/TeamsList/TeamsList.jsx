import React, { useState, useEffect } from "react";
import { List, Image, Loader } from "semantic-ui-react";
import s from "./TeamsList.less";
import { SearchBar } from "../SearchBar/SearchBar";
import { myFetch } from "../../../utils/myFetch";

export const TeamsList = ({ selected, setSelected }) => {
    const [teams, setTeams] = useState(undefined);
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
        setSelected(null);
    }, [searchTeam]);

    return (
        <div className={s.teams}>
            <div>
                <SearchBar
                    onChange={setSearchTeam}
                    value={{ search: searchTeam, name: "team" }}
                />
            </div>
            <div>
                <Loader active={teams === undefined} />
                <List selection verticalAlign="middle">
                    {(teams || []).map((team) => (
                        <List.Item
                            active={team.id === selected.id}
                            key={team.id}
                            onClick={() => {
                                setSelected(team);
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
        </div>
    );
};
