import React from "react";
import { Button, Modal, Form, Header, Checkbox } from "semantic-ui-react";

import usePlayerEditor from "./usePlayerEditor";
import { PositionSelector } from "./PositionSelector";
import { PlayerEditorHeader } from "./PlayerEditorHeader";
import { PlayerImage } from "./PlayerImage";
import { TeamSelector } from "./TeamSelector";

export const PlayerEditor = ({ open, onClose, playerId }) => {
    const { values, errors, touched, loading, handlers, formik } =
        usePlayerEditor(playerId, onClose);

    return (
        <Modal onClose={handlers.close} open={open}>
            <Modal.Header>
                <Header floated="right">
                    <Checkbox
                        toggle
                        name="forceRefresh"
                        label="Force refresh"
                        checked={formik.values.forceRefresh}
                        onChange={() =>
                            handlers.toggle(
                                "forceRefresh",
                                !values.forceRefresh
                            )
                        }
                    />
                </Header>
                <PlayerEditorHeader player={values} />
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
                                error={touched.firstName && errors.firstName}
                                value={values.firstName}
                                onChange={handlers.change}
                                onBlur={handlers.blur}
                                loading={loading}
                            />
                            <Form.Input
                                name="middleName"
                                label="Middle name"
                                placeholder="Middle name"
                                type="text"
                                error={touched.middleName && errors.middleName}
                                value={values.middleName}
                                onChange={handlers.change}
                                onBlur={handlers.blur}
                                loading={loading}
                            />
                            <Form.Input
                                name="lastName"
                                label="Last name"
                                placeholder="Last name"
                                type="text"
                                error={touched.lastName && errors.lastName}
                                value={values.lastName}
                                onChange={handlers.change}
                                onBlur={handlers.blur}
                                loading={loading}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                name="birthDate"
                                label="Birth date"
                                placeholder="Birth date"
                                type="text"
                                error={touched.birthDate && errors.birthDate}
                                value={values.birthDate}
                                onChange={handlers.change}
                                onBlur={handlers.blur}
                                loading={loading}
                            />
                            <TeamSelector
                                name="team"
                                label="Team"
                                formik={formik}
                                loading={loading}
                            />
                            <PositionSelector
                                name="position"
                                label="Position"
                                formik={formik}
                                loading={loading}
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
                        onClick={handlers.delete}
                    />
                )}
                <Button
                    content="Save"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={handlers.submit}
                    positive
                />
                <Button
                    content="Cancel"
                    color="orange"
                    labelPosition="right"
                    icon={{ name: "cancel", color: "yellow" }}
                    onClick={onClose}
                />
            </Modal.Actions>
        </Modal>
    );
};
