import React, { useState } from "react";
import { Card, Image, Placeholder } from "semantic-ui-react";
import s from "./PlayerCard.less";

export const PlayerCard = ({ player }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
                            : `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`
                    }
                    label={{
                        as: "a",
                        color: "orange",
                        content: player.position,
                        ribbon: "right",
                    }}
                    onLoad={() => setLoading(false)}
                    onError={() => setError(true)}
                />
                <Card.Content>
                    <Card.Header>{`${player.firstName} ${player.lastName}`}</Card.Header>
                    <Card.Meta>{player.birthDate}</Card.Meta>
                </Card.Content>
            </Card>
        </div>
    );
};
