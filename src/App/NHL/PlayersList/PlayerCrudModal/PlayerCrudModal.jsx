import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form, Icon, Input } from "semantic-ui-react";
import { myFetch } from "../../../../utils/myFetch";
import s from "./PlayerCrudModal.less";
import { positions } from "../../../../utils/constants";

export const PlayerCrudModal = ({ open, onClose, value }) => {
    const [player, setPlayer] = useState({});
    const [edit, setEdit] = useState(false);
    const [difference, setDifference] = useState({});
    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
    });
    const [dirties, setDirties] = useState({
        firstName: false,
        middleName: false,
        lastName: false,
    });

    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    useEffect(async () => {
        const data = await myFetch(`player/${value}`, {
            include: ["team"],
        });
        setPlayer(data.data[0]);
    }, [value]);

    useEffect(() => {
        if (errors.firstName || errors.middleName || errors.lastName) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [errors.firstName, errors.middleName, errors.lastName]);

    const onSubmit = (e) => {
        fetch(`rest/player/${value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(difference),
        });
        setEdit(false);
        setDirties({
            firstName: false,
            middleName: false,
            lastName: false,
        });
        setDifference({});
        setErrors({
            firstName: "",
            middleName: "",
            lastName: "",
        });
        e.preventDefault();
    };

    const inputHandler = (e) => {
        setDifference({ ...difference, [e.target.name]: e.target.value });

        setPlayer({
            ...player,
            [e.target.name]: e.target.value,
        });

        const re = /^[A-Z]{1}[a-zA-Z]{1,30}$/gm;

        if (
            (e.target.value && re.test(String(e.target.value))) ||
            (!e.target.value && e.target.name === "middleName")
        ) {
            setErrors({ ...errors, [e.target.name]: "" });
        } else {
            if (
                !e.target.value &&
                (e.target.name === "firstName" || e.target.name === "lastName")
            ) {
                setErrors({
                    ...errors,
                    [e.target.name]: "The field can not be empty!",
                });
            } else {
                setErrors({ ...errors, [e.target.name]: "Invalid value!" });
            }
        }
    };

    const selectHandler = (e) => {
        setDifference({ ...difference, position: e.target.innerText });

        setPlayer({
            ...player,
            position: e.target.innerText,
        });
    };

    const focusHandler = (e) => {
        setDirties({ ...dirties, [e.target.name]: false });
    };

    const blurHandler = (e) => {
        setDirties({ ...dirties, [e.target.name]: true });
    };

    const closeHandler = async () => {
        onClose(false);
        const data = await myFetch(`player/${value}`, {
            include: ["team"],
        });
        setPlayer(data.data[0]);
        setEdit(false);
        setDirties({
            firstName: false,
            middleName: false,
            lastName: false,
        });
        setDifference({});
        setErrors({
            firstName: "",
            middleName: "",
            lastName: "",
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
                            onChange={inputHandler}
                            readOnly={!edit}
                            onBlur={blurHandler}
                            onFocus={focusHandler}
                            error={
                                edit &&
                                dirties.firstName &&
                                !!errors.firstName && {
                                    content: errors.firstName,
                                    pointing: "below",
                                }
                            }
                        />
                        {(player.middleName || edit) && (
                            <Form.Input
                                name="middleName"
                                label="Middle name"
                                placeholder="Middle name"
                                type="text"
                                value={player.middleName}
                                onChange={inputHandler}
                                readOnly={!edit}
                                onBlur={blurHandler}
                                onFocus={focusHandler}
                                error={
                                    edit &&
                                    dirties.middleName &&
                                    !!errors.middleName && {
                                        content: errors.middleName,
                                        pointing: "below",
                                    }
                                }
                            />
                        )}
                        <Form.Input
                            name="lastName"
                            label="Last name"
                            placeholder="Last name"
                            type="text"
                            value={player.lastName}
                            onChange={inputHandler}
                            readOnly={!edit}
                            onBlur={blurHandler}
                            onFocus={focusHandler}
                            error={
                                edit &&
                                dirties.lastName &&
                                !!errors.lastName && {
                                    content: errors.lastName,
                                    pointing: "below",
                                }
                            }
                        />
                        {(player.birthDate || edit) && (
                            <Form.Input
                                name="birthDate"
                                label="Birth date"
                                placeholder="Birth date"
                                type="date"
                                value={player.birthDate}
                                onChange={inputHandler}
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
                            onChange={selectHandler}
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
                    <Input
                        disabled={!formValid}
                        type="submit"
                        form="player-form"
                        value="Save"
                    />
                ) : (
                    <Button
                        color="grey"
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
                    onClick={closeHandler}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};
