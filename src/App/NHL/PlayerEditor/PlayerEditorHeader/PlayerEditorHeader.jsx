import React from "react";
import { Header, Label } from "semantic-ui-react";

export const PlayerEditorHeader = ({ player }) => {
    if (player.id) {
        const { firstName, lastName, id } = player;

        return (
            <>
                <Header
                    floated="left"
                    as="h2"
                >{`${firstName} ${lastName}`}</Header>
                <Label color="grey">{id}</Label>
            </>
        );
    } else {
        return "Create new player";
    }
};
