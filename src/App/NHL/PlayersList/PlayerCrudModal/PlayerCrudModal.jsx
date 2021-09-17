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

export const PlayerCrudModal = ({ open, onClose, value }) => {
    const [player, setPlayer] = useState({});
    const [playerData, setPlayerData] = useState(initial);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: playerData,
        validate,
        onSubmit: (values) => {
            const difference = getDifference(values, playerData);
            fetch(`rest/player/${value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(difference),
            });
            setLoading(true);
            setError(false);
            onClose(false);
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
            firstName: data.data[0].firstName || "",
            middleName: data.data[0].middleName || "",
            lastName: data.data[0].lastName || "",
            birthDate: data.data[0].birthDate || "",
            team: data.data[0].team.commonName || "",
            position: data.data[0].position || "",
            id: data.data[0].id || "",
            forceRefresh: data.data[0].forceRefresh || false,
        });
    }, [value]);

    const closeHandler = async () => {
        onClose(false);
        setPlayerData(initial);
        setLoading(true);
        setError(false);
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
                <Header
                    floated="left"
                    as="h2"
                >{`${player.firstName} ${player.lastName}`}</Header>
                <Label color="grey">{player.id}</Label>
            </Modal.Header>
            <Modal.Content image>
                {loading && (
                    <Placeholder style={{ height: 168, width: 168 }}>
                        <Placeholder.Image square />
                    </Placeholder>
                )}
                <Image
                    src={
                        error
                            ? "https://react.semantic-ui.com/images/avatar/small/matthew.png"
                            : `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`
                    }
                    wrapped
                    onLoad={() => setLoading(false)}
                    onError={() => setError(true)}
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
                            <Form.Input
                                name="team"
                                label="Team"
                                placeholder="Team"
                                type="text"
                                value={formik.values.team}
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
                    content="Submit"
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
