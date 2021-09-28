import React, { useState } from "react";
import { Image, Placeholder } from "semantic-ui-react";

export const PlayerImage = ({ playerId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <>
            {loading && (
                <Placeholder style={{ height: 168, width: 168 }}>
                    <Placeholder.Image square />
                </Placeholder>
            )}
            <Image
                src={
                    error || !playerId
                        ? "https://react.semantic-ui.com/images/avatar/small/matthew.png"
                        : `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`
                }
                wrapped
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
            />
        </>
    );
};
