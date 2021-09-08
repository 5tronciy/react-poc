import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form, Icon, Input } from "semantic-ui-react";
import { myFetch } from "../../../../utils/myFetch";
import s from "./PlayerCrudModal.less";
import { positions } from "../../../../utils/constants";

export const PlayerCrudModal = ({ open, onClose, value }) => {
    const [player, setPlayer] = useState({});
    const [edit, setEdit] = useState(false);
    const [difference, setDifference] = useState({});

    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    useEffect(async () => {
        const data = await myFetch(`player/${value}`, {
            include: ["team"],
        });
        setPlayer(data.data[0]);
    }, [value]);

    const onSubmit = (e) => {
        fetch(`rest/player/${value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(difference),
        });
        setEdit(false);
        e.preventDefault();
    };

    const onChangeHandler = (e) => {
        setDifference({ ...difference, [e.target.name]: e.target.value });
        setPlayer({
            ...player,
            [e.target.name]: e.target.value,
        });
    };

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
                <Form id="player-form" className={s.form} onSubmit={onSubmit}>
                    <Form.Group grouped>
                        <Form.Input
                            name="firstName"
                            label="First name"
                            placeholder="First name"
                            type="text"
                            value={player.firstName}
                            onChange={onChangeHandler}
                            readOnly={!edit}
                        />
                        {(player.middleName || edit) && (
                            <Form.Input
                                name="middleName"
                                label="Middle name"
                                placeholder="Middle name"
                                type="text"
                                value={player.middleName}
                                onChange={onChangeHandler}
                                readOnly={!edit}
                            />
                        )}
                        <Form.Input
                            name="lastName"
                            label="Last name"
                            placeholder="Last name"
                            type="text"
                            value={player.lastName}
                            onChange={onChangeHandler}
                            readOnly={!edit}
                        />
                        {(player.birthDate || edit) && (
                            <Form.Input
                                name="birthDate"
                                label="Birth date"
                                placeholder="Birth date"
                                type="date"
                                value={player.birthDate}
                                onChange={onChangeHandler}
                                readOnly={!edit}
                            />
                        )}
                        {player.team && (
                            <Form.Input
                                label="Team"
                                placeholder="Team"
                                type="text"
                                value={player.team.commonName}
                                readOnly
                            />
                        )}
                        <Form.Select
                            name="position"
                            label="Position"
                            placeholder="Position"
                            value={player.position}
                            options={options}
                            onChange={onChangeHandler}
                            readOnly={!edit}
                        />
                    </Form.Group>
                    <Form.Group grouped className={s.techData}>
                        <Form.Input
                            label="ID"
                            inline
                            type="text"
                            value={player.id}
                            readOnly={!edit}
                        />
                        <Form.Checkbox
                            label="Force refresh"
                            checked={player.forceRefresh}
                        />
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                {edit ? (
                    <Input type="submit" form="player-form" value="Save" />
                ) : (
                    <Button
                        color="grey"
                        onClick={() => onClose(false)}
                        labelPosition="right"
                        icon
                        onClick={() => setEdit(true)}
                    >
                        Edit
                        <Icon name="edit" color="grey" />
                    </Button>
                )}
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
