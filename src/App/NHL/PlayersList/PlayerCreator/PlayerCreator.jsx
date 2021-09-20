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
} from "semantic-ui-react";
import { useFormik } from "formik";

import { positions } from "../../../../utils/constants";

const initial = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    position: "",
    forceRefresh: false,
    team: "",
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

export const PlayerCreator = ({ open, onClose }) => {
    const [playerFrame, setPlayerFrame] = useState({
        player: initial,
        loading: true,
        error: false,
        teams: undefined,
    });

    useEffect(async () => {
        const response = await fetch("rest/team?sort=fullName");
        const data = await response.json();
        setPlayerFrame({ ...playerFrame, teams: data.data });
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: playerFrame.player,
        validate,
        onSubmit: (values) => {
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
                    id: Math.round(Math.random() * 1000000000),
                }),
            });
            setPlayerFrame({ ...playerFrame, loading: true, error: false });
            onClose(false);
        },
    });

    const options = positions.map((position) => {
        return { key: position.id, value: position.name, text: position.name };
    });

    const closeHandler = async () => {
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
                Create new player
            </Modal.Header>
            <Modal.Content image>
                {playerFrame.loading && (
                    <Placeholder style={{ height: 168, width: 168 }}>
                        <Placeholder.Image square />
                    </Placeholder>
                )}
                <Image
                    src={
                        "https://react.semantic-ui.com/images/avatar/small/matthew.png"
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
                    content="Save"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={formik.submitForm}
                    positive
                />
                <Button
                    color="orange"
                    labelPosition="right"
                    icon
                    onClick={closeHandler}
                >
                    Cancel
                    <Icon name="cancel" color="yellow" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
};
