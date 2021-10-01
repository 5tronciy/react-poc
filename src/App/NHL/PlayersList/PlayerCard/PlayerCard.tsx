import * as React from "react";
import { useState } from "react";
import { Card, Image, Placeholder } from "semantic-ui-react";
import { Player } from "../../../../utils/form/types";
import s from "./PlayerCard.less";

type Props = {
    player: Player;
};

export const PlayerCard = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    return (
        <div className={s.card}>
            <Card>
                {loading && (
                    <Placeholder>
                        <Placeholder.Image square />
                    </Placeholder>
                )}
                <Image
                    src={
                        error
                            ? "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                            : `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${props.player.id}.jpg`
                    }
                    label={{
                        as: "a",
                        color: "orange",
                        content: props.player.position,
                        ribbon: "right",
                    }}
                    onLoad={() => setLoading(false)}
                    onError={() => setError(true)}
                />
                <Card.Content>
                    <Card.Header>{`${props.player.firstName} ${props.player.lastName}`}</Card.Header>
                    <Card.Meta>{props.player.birthDate}</Card.Meta>
                </Card.Content>
            </Card>
        </div>
    );
};
