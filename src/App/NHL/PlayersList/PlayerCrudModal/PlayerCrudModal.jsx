import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form, Icon } from "semantic-ui-react";
import { myFetch } from "../../../../utils/myFetch";
import s from "./PlayerCrudModal.less";

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
                    className={s.image}
                    size="medium"
                    src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`}
                    wrapped
                />
                <Form className={s.form}>
                    <Form.Group grouped>
                        <Form.Input
                            label="First name"
                            placeholder="First name"
                            value={player.firstName}
                            readOnly
                        />
                        {player.middleName && (
                            <Form.Input
                                label="Middle name"
                                placeholder="Middle name"
                                value={player.middleName}
                                readOnly
                            />
                        )}
                        <Form.Input
                            label="Last name"
                            placeholder="Last name"
                            value={player.lastName}
                            readOnly
                        />
                        {player.birthDate && (
                            <Form.Input
                                label="Birth date"
                                placeholder="Birth date"
                                value={player.birthDate}
                                readOnly
                            />
                        )}
                        {player.team && (
                            <Form.Input
                                label="Team"
                                placeholder="Team"
                                value={player.team.commonName}
                                readOnly
                            />
                        )}
                        <Form.Input
                            label="Position"
                            placeholder="Position"
                            value={player.position}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group grouped className={s.techData}>
                        <Form.Input
                            label="ID"
                            inline
                            value={player.id}
                            readOnly
                        />
                        <Form.Checkbox
                            label="Force refresh"
                            checked={player.forceRefresh}
                        />
                    </Form.Group>
                </Form>
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
