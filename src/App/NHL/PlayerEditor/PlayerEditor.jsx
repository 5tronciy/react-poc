import React from "react";
import { Button, Modal, Form, Header, Checkbox } from "semantic-ui-react";

import usePlayerEditor from "./usePlayerEditor";
import { PositionSelector } from "./PositionSelector/PositionSelector";
import { PlayerEditorHeader } from "./PlayerEditorHeader/PlayerEditorHeader";
import { PlayerImage } from "./PlayerImage/PlayerImage";
import { TeamSelector } from "./TeamSelector/TeamSelector";

export const PlayerEditor = ({ open, onClose, playerId }) => {
    const { values, errors, touched, loading, handlers } = usePlayerEditor(
        playerId,
        onClose
    );

    return (
        <Modal onClose={handlers.close} open={open}>
            <Modal.Header>
                <Header floated="right">
                    <Checkbox
                        toggle
                        name="forceRefresh"
                        label="Force refresh"
                        checked={values.forceRefresh}
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
                                error={touched.team && errors.team}
                                value={values.team}
                                onChange={(_, { value }) =>
                                    handlers.toggle("team", value)
                                }
                                loading={loading}
                            />
                            <PositionSelector
                                name="position"
                                label="Position"
                                error={touched.position && errors.position}
                                value={values.position}
                                onChange={(_, { value }) =>
                                    handlers.toggle("position", value)
                                }
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
