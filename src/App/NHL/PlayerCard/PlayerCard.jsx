import React from "react";
import { Card, Image } from "semantic-ui-react";

export const PlayerCard = ({ player }) => {
  return (
    <Card key={player.id} style={{ margin: "1em" }}>
      <Image
        src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`}
        label={{
          as: "a",
          color: "orange",
          content: player.position,
          ribbon: "right",
        }}
      />
      <Card.Content>
        <Card.Header>{`${player.firstName} ${player.lastName}`}</Card.Header>
        <Card.Meta>{player.birthDate}</Card.Meta>
      </Card.Content>
    </Card>
  );
};
