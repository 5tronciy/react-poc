import React, { useEffect, useState } from "react";
import {
    Button,
    Image,
    Modal,
    Form,
    Placeholder,
    Header,
    Checkbox,
    Label,
} from "semantic-ui-react";
import { useFormik } from "formik";

import { myFetch } from "../../../../utils/myFetch";
import { loadData } from "../../../../utils/form/loadData";
import { transformDataToForm } from "../../../../utils/form/transformDataToForm";
import { transformDataToDB } from "../../../../utils/form/transformDataToDB";
import { positions } from "../../../../utils/constants";
import { saveData } from "../../../../utils/form/saveData";

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

export const PlayerEditor = ({ open, onClose, value }) => {
    const [playerFrame, setPlayerFrame] = useState({
        player: initial,
        loading: { player: true, avatar: true },
        error: false,
        teams: undefined,
    });

    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    useEffect(async () => {
        if (value) {
            // --- Data Loading ---
            setPlayerFrame((state) => {
                return {
                    ...state,
                    loading: { ...state.loading, player: true },
                };
            });
            const player = await loadData(`player/${value}`, {
                include: ["team"],
            });
            // --- /Data Loading ---

            // --- Transform Data To Form Format---
            const formData = transformDataToForm(player);
            setPlayerFrame((state) => {
                return {
                    ...state,
                    player: formData,
                    loading: { ...state.loading, player: false },
                };
            });
            // --- /Transform Data To Form ---
        }
    }, [value]);

    const submitHandler = async (values) => {
        // --- Transform Data To DB Format ---
        const dbData = transformDataToDB(values);
        // --- /Transform Data To DB Format ---

        // --- Data Saving ---
        saveData(dbData, !!value);
        // --- /Data Saving ---
        setPlayerFrame((state) => {
            return {
                ...state,
                loading: { ...state.loading, avatar: true },
                error: false,
            };
        });
        onClose(false);
    };

    // --- Use Data In Form ---
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: playerFrame.player,
        validate,
        onSubmit: submitHandler,
    });
    // --- /Use Data In Form ---

    useEffect(async () => {
        const fetchedObject = await myFetch("team", { order: "fullName" });
        const data = fetchedObject.parsedBody;
        setPlayerFrame((state) => {
            return { ...state, teams: data.data };
        });
    }, []);

    const deleteHandler = () => {
        fetch(`rest/player/${value}`, {
            method: "DELETE",
        });
        closeHandler();
    };

    const closeHandler = () => {
        onClose(false);
        setPlayerFrame((state) => {
            return {
                player: initial,
                loading: { ...state.loading, avatar: true },
                error: false,
            };
        });
    };

    return (
        <Modal onClose={() => onClose(false)} open={open}>
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
                {value ? (
                    <>
                        <Header
                            floated="left"
                            as="h2"
                        >{`${playerFrame.player.firstName} ${playerFrame.player.lastName}`}</Header>
                        <Label color="grey">{playerFrame.player.id}</Label>
                    </>
                ) : (
                    "Create new player"
                )}
            </Modal.Header>
            <Modal.Content image>
                {playerFrame.loading.avatar && (
                    <Placeholder style={{ height: 168, width: 168 }}>
                        <Placeholder.Image square />
                    </Placeholder>
                )}
                <Image
                    src={
                        playerFrame.error || !value
                            ? "https://react.semantic-ui.com/images/avatar/small/matthew.png"
                            : `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerFrame.player.id}.jpg`
                    }
                    wrapped
                    onLoad={() =>
                        setPlayerFrame({
                            ...playerFrame,
                            loading: { ...playerFrame.loading, avatar: false },
                        })
                    }
                    onError={() =>
                        setPlayerFrame((state) => {
                            return { ...state, error: true };
                        })
                    }
                />
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
                            <Form.Dropdown
                                name="team"
                                label="Team"
                                placeholder="Team"
                                options={(playerFrame.teams || []).map(
                                    (team) => {
                                        return {
                                            key: team.id,
                                            value: team.id,
                                            text: team.commonName,
                                            image: {
                                                avatar: true,
                                                src: `rest/team/${team.id}.svg`,
                                            },
                                        };
                                    }
                                )}
                                selection
                                error={
                                    formik.touched.team && formik.errors.team
                                }
                                value={formik.values.team}
                                onChange={(_, { value }) =>
                                    formik.setFieldValue("team", value)
                                }
                            />
                            <Form.Dropdown
                                name="position"
                                label="Position"
                                placeholder="Position"
                                options={options}
                                selection
                                error={
                                    formik.touched.position &&
                                    formik.errors.position
                                }
                                value={formik.values.position}
                                onChange={(_, { value }) =>
                                    formik.setFieldValue("position", value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Delete"
                    color="red"
                    labelPosition="right"
                    icon={{ name: "user delete", color: "grey" }}
                    onClick={deleteHandler}
                />
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
                    onClick={closeHandler}
                />
            </Modal.Actions>
        </Modal>
    );
};
