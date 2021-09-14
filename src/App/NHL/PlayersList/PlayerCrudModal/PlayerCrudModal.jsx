import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Form, Icon, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { myFetch } from "../../../../utils/myFetch";
import { getDifference } from "../../../../utils/getDifference";
import s from "./PlayerCrudModal.less";
import { positions } from "../../../../utils/constants";

export const PlayerCrudModal = ({ open, onClose, value }) => {
    const [player, setPlayer] = useState({ team: { commonName: "" } });
    const [edit, setEdit] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: player,
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 20 characters or less")
                .required("Required"),
            middleName: Yup.string()
                .max(15, "Must be 20 characters or less")
                .nullable(),
            lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
            id: Yup.number(),
            forceRefresh: Yup.boolean(),
        }),
        onSubmit: (values) => {
            const difference = getDifference(values, player);
            console.log(values, player, difference);
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
                <Form
                    id="player-form"
                    className={s.form}
                    onSubmit={formik.handleSubmit}
                >
                    <Form.Group grouped>
                        <Form.Input
                            id="firstName"
                            label="First name"
                            placeholder="First name"
                            type="text"
                            error={
                                edit &&
                                formik.touched.firstName &&
                                formik.errors.firstName && {
                                    content: formik.errors.firstName,
                                    pointing: "below",
                                }
                            }
                            {...formik.getFieldProps("firstName")}
                            readOnly={!edit}
                        />
                        {(formik.values.middleName || edit) && (
                            <Form.Input
                                id="middleName"
                                label="Middle name"
                                placeholder="Middle name"
                                type="text"
                                error={
                                    edit &&
                                    formik.touched.middleName &&
                                    formik.errors.middleName && {
                                        content: formik.errors.middleName,
                                        pointing: "below",
                                    }
                                }
                                {...formik.getFieldProps("middleName")}
                                readOnly={!edit}
                            />
                        )}
                        <Form.Input
                            id="lastName"
                            label="Last name"
                            placeholder="Last name"
                            type="text"
                            error={
                                edit &&
                                formik.touched.lastName &&
                                formik.errors.lastName && {
                                    content: formik.errors.lastName,
                                    pointing: "below",
                                }
                            }
                            {...formik.getFieldProps("lastName")}
                            readOnly={!edit}
                        />
                        {(formik.values.birthDate || edit) && (
                            <Form.Input
                                id="birthDate"
                                label="Birth date"
                                placeholder="Birth date"
                                type="date"
                                error={
                                    edit &&
                                    formik.touched.birthDate &&
                                    formik.errors.birthDate && {
                                        content: formik.errors.birthDate,
                                        pointing: "below",
                                    }
                                }
                                {...formik.getFieldProps("birthDate")}
                                readOnly={!edit}
                            />
                        )}
                        <Form.Input
                            id="team"
                            label="Team"
                            placeholder="Team"
                            type="text"
                            value={formik.values.team.commonName}
                            readOnly
                        />
                        <Form.Select
                            id="position"
                            label="Position"
                            placeholder="Position"
                            options={options}
                            error={
                                edit &&
                                formik.touched.position &&
                                formik.errors.position && {
                                    content: formik.errors.position,
                                    pointing: "below",
                                }
                            }
                            {...formik.getFieldProps("position")}
                            readOnly={!edit}
                        />
                    </Form.Group>
                    <Form.Group grouped className={s.techData}>
                        <Form.Input
                            id="id"
                            label="ID"
                            inline
                            type="text"
                            {...formik.getFieldProps("id")}
                            readOnly
                        />
                        <Form.Checkbox
                            id="forceRefresh"
                            label="Force refresh"
                            error={
                                edit &&
                                formik.touched.forceRefresh &&
                                formik.errors.forceRefresh && {
                                    content: formik.errors.forceRefresh,
                                    pointing: "below",
                                }
                            }
                            {...formik.getFieldProps("forceRefresh")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                {edit ? (
                    <Input
                        disabled={formik.isSubmitting}
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
