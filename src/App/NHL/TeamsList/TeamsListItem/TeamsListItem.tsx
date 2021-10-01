import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { List, Image } from "semantic-ui-react";

type Item = {
    id: number;
    commonName: string;
};

type Props = {
    item: Item;
    selected: number | null;
    select: Dispatch<SetStateAction<number | null>>;
};

export const TeamsListItem = (props: Props) => {
    return (
        <List.Item
            active={Boolean(props.selected && props.item.id === props.selected)}
            onClick={() => {
                props.select(props.item.id);
            }}
        >
            <Image avatar src={`rest/team/${props.item.id}.svg`} />
            <List.Content>{props.item.commonName}</List.Content>
        </List.Item>
    );
};
