import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Table, Icon } from "semantic-ui-react";
import { myFetch } from "../../../../utils/myFetch";

export const PlayerCrudModal = ({ open, onClose, value }) => {
    const [player, setPlayer] = useState({});

    useEffect(async () => {
        const data = await myFetch(`player/${value}`, {
            include: ["team"],
        });
        setPlayer(data.data[0]);
    }, [value]);

    return (
        <Modal onClose={() => onClose(false)} open={open}>
            <Modal.Header>
                {`${player.firstName} ${player.lastName}`}
            </Modal.Header>
            <Modal.Content image>
                <Image
                    size="medium"
                    src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`}
                    wrapped
                />
                <Table definition celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">
                                Detailed Info
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width="3">First Name</Table.Cell>
                            <Table.Cell>{player.firstName}</Table.Cell>
                        </Table.Row>
                        {player.middleName && (
                            <Table.Row>
                                <Table.Cell width="3">Middle Name</Table.Cell>
                                <Table.Cell>{player.middleName}</Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell width="3">Last Name</Table.Cell>
                            <Table.Cell>{player.lastName}</Table.Cell>
                        </Table.Row>
                        {player.birthDate && (
                            <Table.Row>
                                <Table.Cell width="3">Birth Date</Table.Cell>
                                <Table.Cell>{player.birthDate}</Table.Cell>
                            </Table.Row>
                        )}
                        {player.team && (
                            <Table.Row>
                                <Table.Cell width="3">Team</Table.Cell>
                                <Table.Cell>
                                    {player.team.commonName}
                                </Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell width="3">Position</Table.Cell>
                            <Table.Cell>{player.position}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="grey"
                    onClick={() => onClose(false)}
                    labelPosition="right"
                    icon
                >
                    Edit
                    <Icon name="edit" color="grey" />
                </Button>
                <Button
                    content="Close"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => onClose(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};
