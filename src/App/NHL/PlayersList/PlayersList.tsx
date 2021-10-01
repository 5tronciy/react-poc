import * as React from "react";
import { useState, useEffect } from "react";
import { Loader, Card, Segment } from "semantic-ui-react";
import s from "./PlayersList.less";
import { PlayersFilter } from "./PlayersFilter/PlayersFilter";
import { PlayerCard } from "./PlayerCard/PlayerCard";
import { PlayerEditor } from "../PlayerEditor/PlayerEditor";
import { myFetch } from "../../../utils/myFetch";
import { positions, delay } from "../../../utils/constants";
import { Player } from "../../../utils/form/types";

const map: { [key: string]: string } = positions.reduce(
    (acc, item) => ({ ...acc, [item.id]: item.name }),
    {}
);

type Props = {
    team: number;
};

export const PlayersList = (props: Props) => {
    const [players, setPlayers] = useState<Player[]>();
    const [query, setQuery] = useState<string>("");
    const [checked, setChecked] = useState<number[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>();

    const filter = () => {
        const filterBuilder: {
            parts: string[];
            args: { [key: string]: string };
        } = {
            parts: [],
            args: {},
        };

        filterBuilder.parts.push("team = $team");
        filterBuilder.args.team = props.team.toString();

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
            const fetchedObject = await myFetch<Player>(
                "player",
                {
                    filter: filter(),
                    order: `[{"property":"position"},{"property":"lastName"},{"property":"firstName"}]`,
                },
                signal
            );
            const data = fetchedObject.parsedBody.data;
            setPlayers(data);
        }, delay);

        return (() => controller.abort()) || clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        const getPlayers = async () => {
            const fetchedObject = await myFetch<Player>("player", {
                filter: filter(),
                order: `[{"property":"position"},{"property":"lastName"},{"property":"firstName"}]`,
            });
            const data = fetchedObject.parsedBody;

            setPlayers(data.data);
        };
        getPlayers();
    }, [props.team, checked]);

    useEffect(() => {
        setQuery("");
        setChecked([]);
    }, [props.team]);

    return (
        <div className={s.container}>
            <Segment.Group>
                <Segment>
                    <div className={s.filter}>
                        <PlayersFilter
                            onChange={setQuery}
                            value={{ query, checked, setChecked }}
                        />
                    </div>
                </Segment>
                <Segment>
                    <div className={s.players}>
                        <Loader active={players === undefined} />
                        <Card.Group>
                            {(players || []).map((player) => (
                                <div
                                    key={player.id}
                                    className={s.player}
                                    onClick={() => {
                                        setPlayer(player);
                                        setOpen(true);
                                    }}
                                >
                                    <PlayerCard player={player} />
                                </div>
                            ))}
                        </Card.Group>
                    </div>
                </Segment>
            </Segment.Group>
            {player && (
                <PlayerEditor
                    open={open}
                    onClose={() => setOpen(false)}
                    playerId={player.id}
                />
            )}
        </div>
    );
};
