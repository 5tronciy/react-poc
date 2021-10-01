import * as React from "react";
import { useState } from "react";
import { Image, Placeholder } from "semantic-ui-react";

type Props = {
    playerId?: number;
};

export const PlayerImage = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    return (
        <>
            {loading && (
                <Placeholder style={{ height: 168, width: 168 }}>
                    <Placeholder.Image square />
                </Placeholder>
            )}
            <Image
                src={
                    error || !props.playerId
                        ? "https://react.semantic-ui.com/images/avatar/small/matthew.png"
                        : `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${props.playerId}.jpg`
                }
                wrapped
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
            />
        </>
    );
};
