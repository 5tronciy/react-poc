import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Header, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";

import { loadData } from "../../../utils/form/loadData";
import { extractFormValuesFromPlayer } from "../../../utils/form/extractFormValuesFromPlayer";
import { extractPlayerFromFormValues } from "../../../utils/form/extractPlayerFromFormValues";
import { updatePlayerById } from "../../../utils/form/updatePlayerById";
import { createPlayer } from "../../../utils/form/createPlayer";
import { PositionSelector } from "./PositionSelector";
import { PlayerEditorHeader } from "./PlayerEditorHeader";
import { PlayerImage } from "./PlayerImage";
import { TeamSelector } from "./TeamSelector";

const initial = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    team: "",
    position: "",
    id: "",
    forceRefresh: false,
};

const validate = (values) => {
    const errors = {};
    const regExpDate = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;

    if (!values.firstName) {
        errors.firstName = "Required";
    } else if (values.firstName.length > 20) {
        errors.firstName = "Must be 20 characters or less";
    }

    if (values.middleName && values.middleName.length > 20) {
        errors.middleName = "Must be 20 characters or less";
    }

    if (!values.lastName) {
        errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
        errors.lastName = "Must be 20 characters or less";
    }

    if (values.birthDate && !regExpDate.test(String(values.birthDate))) {
        errors.birthDate = "Invalid date";
    }

    return errors;
};

export const PlayerEditor = ({ open, onClose, playerId }) => {
    const [state, setState] = useState({
        player: initial,
        loading: { player: true, avatar: true },
        error: false,
        teams: undefined,
    });

    useEffect(() => {
        if (!playerId) {
            return;
        }

        const loadPlayer = async (playerId) => {
            setState((state) => {
                return {
                    ...state,
                    loading: { ...state.loading, player: true },
                };
            });

            const player = await loadData(`player/${playerId}`, {
                include: ["team"],
            });

            const values = extractFormValuesFromPlayer(player);

            setState((state) => {
                return {
                    ...state,
                    player: values,
                    loading: { ...state.loading, player: false },
                };
            });
        };

        loadPlayer(playerId);
    }, [playerId]);

    const submitHandler = async (values) => {
        const player = extractPlayerFromFormValues(values);

        if (playerId) {
            await updatePlayerById(player);
        } else {
            await createPlayer(player);
        }

        onClose();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: state.player,
        validate,
        onSubmit: submitHandler,
    });

    const deleteHandler = () => {
        fetch(`rest/player/${playerId}`, {
            method: "DELETE",
        });

        onClose(false);
    };

    return (
        <Modal onClose={onClose} open={open}>
            <Modal.Header>
                <Header floated="right">
                    <Checkbox
                        toggle
                        name="forceRefresh"
                        label="Force refresh"
                        checked={formik.values.forceRefresh}
                        onChange={() =>
                            formik.setFieldValue(
                                "forceRefresh",
                                !formik.values.forceRefresh
                            )
                        }
                    />
                </Header>
                <PlayerEditorHeader player={state.player} />
            </Modal.Header>
            <Modal.Content image>
                <PlayerImage playerId={playerId} />
                <Modal.Description>
                    <Form>
                        <Form.Group widths="equal">
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
                            />
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
                            />
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
                            />
                        </Form.Group>
                        <Form.Group>
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
                            />
                            <TeamSelector
                                name="team"
                                label="Team"
                                formik={formik}
                            />
                            <PositionSelector
                                name="position"
                                label="Position"
                                formik={formik}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                {playerId && (
                    <Button
                        content="Delete"
                        color="red"
                        labelPosition="right"
                        icon={{ name: "user delete", color: "grey" }}
                        onClick={deleteHandler}
                    />
                )}
                <Button
                    content="Save"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={formik.submitForm}
                    positive
                />
                <Button
                    content="Cancel"
                    color="orange"
                    labelPosition="right"
                    icon={{ name: "cancel", color: "yellow" }}
                    onClick={() => onClose(false)}
                />
            </Modal.Actions>
        </Modal>
    );
};
