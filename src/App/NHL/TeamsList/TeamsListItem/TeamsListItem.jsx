import React from "react";
import { List, Image } from "semantic-ui-react";

export const TeamsListItem = ({ item, selected, select }) => {
    return (
        <List.Item
            active={selected && item.id === selected}
            key={item.id}
            onClick={() => {
                select(item.id);
            }}
        >
            <Image avatar src={`rest/team/${item.id}.svg`} />
            <List.Content>{item.commonName}</List.Content>
        </List.Item>
    );
};
