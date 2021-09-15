import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";

import { myFetch } from "../../../../utils/myFetch";
import { getDifference } from "../../../../utils/getDifference";
import s from "./PlayerCrudModal.less";
import { positions } from "../../../../utils/constants";

const validate = (values) => {
    const errors = {};
    const regExpName = /^[A-Z]{1}[a-zA-Z]{1,30}$/;
    const regExpDate = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;

    if (!values.firstName) {
        errors.firstName = "Required";
    } else if (!regExpName.test(String(values.firstName))) {
        errors.firstName = "Invalid name";
    } else if (values.firstName.length > 20) {
        errors.firstName = "Must be 20 characters or less";
    }

    if (values.middleName) {
        if (!regExpName.test(String(values.middleName))) {
            errors.middleName = "Invalid name";
        } else if (values.middleName.length > 20) {
            errors.middleName = "Must be 20 characters or less";
        }
    }

    if (!values.lastName) {
        errors.lastName = "Required";
    } else if (!regExpName.test(String(values.lastName))) {
        errors.lastName = "Invalid name";
    } else if (values.lastName.length > 20) {
        errors.lastName = "Must be 20 characters or less";
    }

    if (values.birthDate && !regExpDate.test(String(values.birthDate))) {
        errors.birthDate = "Invalid date";
    }

    return errors;
};

export const PlayerCrudModal = ({ open, onClose, value }) => {
    const [player, setPlayer] = useState({});
    const [playerData, setPlayerData] = useState({});
    const [edit, setEdit] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: playerData,
        validate,
        onSubmit: (values) => {
            const difference = getDifference(values, playerData);
            console.log(values, playerData, difference);
            fetch(`rest/player/${value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(difference),
            });
            setEdit(false);
        },
    });

    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    useEffect(async () => {
        const data = await myFetch(`player/${value}`, {
            include: ["team"],
        });
        setPlayer(data.data[0]);
        setPlayerData({
            firstName: data.data[0].firstName,
            middleName: data.data[0].middleName,
            lastName: data.data[0].lastName,
            birthDate: data.data[0].birthDate,
            team: data.data[0].team.commonName,
            position: data.data[0].position,
            id: data.data[0].id,
            forceRefresh: data.data[0].forceRefresh,
        });
    }, [value]);

    const closeHandler = async () => {
        onClose(false);
        const data = await myFetch(`player/${value}`, {
            include: ["team"],
        });
        setPlayer(data.data[0]);
        setEdit(false);
    };

    return (
        <Modal onClose={() => onClose(false)} open={open}>
            <Modal.Header>
                {`${formik.values.firstName} ${formik.values.lastName}`}
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
                            name="firstName"
                            label="First name"
                            placeholder="First name"
                            type="text"
                            error={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!edit}
                        />
                        {(formik.values.middleName || edit) && (
                            <Form.Input
                                name="middleName"
                                label="Middle name"
                                placeholder="Middle name"
                                type="text"
                                error={
                                    formik.touched.middleName &&
                                    formik.errors.middleName
                                }
                                value={formik.values.middleName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                readOnly={!edit}
                            />
                        )}
                        <Form.Input
                            name="lastName"
                            label="Last name"
                            placeholder="Last name"
                            type="text"
                            error={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!edit}
                        />
                        {(formik.values.birthDate || edit) && (
                            <Form.Input
                                name="birthDate"
                                label="Birth date"
                                placeholder="Birth date"
                                type="text"
                                error={
                                    formik.touched.birthDate &&
                                    formik.errors.birthDate
                                }
                                value={formik.values.birthDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                readOnly={!edit}
                            />
                        )}
                        <Form.Input
                            name="team"
                            label="Team"
                            placeholder="Team"
                            type="text"
                            value={formik.values.team}
                            readOnly
                        />
                        <Form.Dropdown
                            name="position"
                            label="Position"
                            placeholder="Position"
                            options={options}
                            error={
                                formik.touched.position &&
                                formik.errors.position
                            }
                            value={formik.values.position}
                            onChange={(_, { value }) =>
                                setPlayerData({
                                    ...playerData,
                                    position: value,
                                })
                            }
                            readOnly={!edit}
                        />
                    </Form.Group>
                    <Form.Group grouped className={s.techData}>
                        <Form.Input
                            name="id"
                            label="ID"
                            inline
                            type="text"
                            value={formik.values.id}
                            readOnly
                        />
                        <Form.Checkbox
                            name="forceRefresh"
                            label="Force refresh"
                            error={
                                formik.touched.forceRefresh &&
                                formik.errors.forceRefresh
                            }
                            value={formik.values.forceRefresh}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                {edit ? (
                    <Button
                        color="orange"
                        labelPosition="right"
                        icon
                        onClick={formik.submitForm}
                    >
                        Save
                        <Icon name="save" color="yellow" />
                    </Button>
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
