import React, { useEffect, useState } from "react";
import {
    Button,
    Image,
    Modal,
    Form,
    Icon,
    Placeholder,
    Header,
    Checkbox,
    Label,
} from "semantic-ui-react";
import { useFormik } from "formik";

import { myFetch } from "../../../../utils/myFetch";
import { getDifference } from "../../../../utils/getDifference";
import { positions } from "../../../../utils/constants";

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
        loading: true,
        error: false,
        teams: undefined,
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: playerFrame.player,
        validate,
        onSubmit: async (values) => {
            if (value) {
                const difference = getDifference(values, playerFrame.player);
                fetch(`rest/player/${value}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(difference),
                });
            } else {
                const response = await fetch(
                    "rest/player?sort=id&dir=DESC&limit=1"
                );
                const lastPlayer = await response.json();
                const maxId = lastPlayer.data[0].id;
                fetch("rest/player", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        ...Object.entries(values).reduce(
                            (acc, [key, value]) =>
                                value !== "" ? { ...acc, [key]: value } : acc,
                            {}
                        ),
                        id: maxId + 1,
                    }),
                });
            }

            setPlayerFrame((state) => {
                return { ...state, loading: true, error: false };
            });
            onClose(false);
        },
    });

    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    useEffect(async () => {
        const response = await fetch("rest/team?sort=fullName");
        const data = await response.json();
        setPlayerFrame({ ...playerFrame, teams: data.data });
    }, []);

    useEffect(async () => {
        console.log("fetch player, id=" + value);
        if (value) {
            const data = await myFetch(`player/${value}`, {
                include: ["team"],
            });
            setPlayerFrame((state) => {
                return {
                    ...state,
                    player: {
                        firstName: data.data[0].firstName || "",
                        middleName: data.data[0].middleName || "",
                        lastName: data.data[0].lastName || "",
                        birthDate: data.data[0].birthDate || "",
                        team: data.data[0].team.id || "",
                        position: data.data[0].position || "",
                        id: data.data[0].id || "",
                        forceRefresh: data.data[0].forceRefresh || false,
                    },
                };
            });
        }
    }, [value, playerFrame.player.id]);

    const deleteHandler = () => {
        fetch(`rest/player/${value}`, {
            method: "DELETE",
        });
        closeHandler();
    };

    const closeHandler = () => {
        onClose(false);
        setPlayerFrame({ player: initial, loading: true, error: false });
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
                {playerFrame.loading && (
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
                        setPlayerFrame({ ...playerFrame, loading: false })
                    }
                    onError={() =>
                        setPlayerFrame({ ...playerFrame, error: true })
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
