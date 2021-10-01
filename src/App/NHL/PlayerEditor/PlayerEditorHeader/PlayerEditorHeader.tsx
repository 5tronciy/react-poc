import * as React from "react";
import { Header, Label } from "semantic-ui-react";

type Player = {
    firstName?: string;
    lastName?: string;
    id?: string;
};

type Props = {
    player: Player;
};

export const PlayerEditorHeader = (props: Props) => {
    if (props.player.id) {
        const { firstName, lastName, id } = props.player;

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
        return <>Create new player</>;
    }
};
