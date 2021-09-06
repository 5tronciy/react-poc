import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Table, Icon } from "semantic-ui-react";

export const PlayerCrudModal = ({ open, onClose, value }) => {
    return (
        <Modal onClose={() => onClose(false)} open={open}>
            <Modal.Header>
                {`${value.firstName} ${value.lastName}`}
            </Modal.Header>
            <Modal.Content image>
                <Image
                    size="medium"
                    src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${value.id}.jpg`}
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
                            <Table.Cell>{value.firstName}</Table.Cell>
                        </Table.Row>
                        {value.middleName && (
                            <Table.Row>
                                <Table.Cell width="3">Middle Name</Table.Cell>
                                <Table.Cell>{value.middleName}</Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell width="3">Last Name</Table.Cell>
                            <Table.Cell>{value.lastName}</Table.Cell>
                        </Table.Row>
                        {value.birthDate && (
                            <Table.Row>
                                <Table.Cell width="3">Birth Date</Table.Cell>
                                <Table.Cell>{value.birthDate}</Table.Cell>
                            </Table.Row>
                        )}
                        {value.team && (
                            <Table.Row>
                                <Table.Cell width="3">Team</Table.Cell>
                                <Table.Cell>{value.team.commonName}</Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell width="3">Position</Table.Cell>
                            <Table.Cell>{value.position}</Table.Cell>
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
