import React, { useEffect, useState } from "react";

import { useFormik } from "formik";

import { loadData } from "../../../utils/form/loadData";
import { extractFormValuesFromPlayer } from "../../../utils/form/extractFormValuesFromPlayer";
import { extractPlayerFromFormValues } from "../../../utils/form/extractPlayerFromFormValues";
import { updatePlayerById } from "../../../utils/form/updatePlayerById";
import { createPlayer } from "../../../utils/form/createPlayer";

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

export const usePlayerEditor = (playerId, onClose) => {
    const [state, setState] = useState({
        player: initial,
        loading: false,
    });

    useEffect(() => {
        if (!playerId) {
            return;
        }

        const loadPlayer = async (playerId) => {
            setState((state) => {
                return {
                    ...state,
                    loading: true,
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
                    loading: false,
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

        onClose();
    };

    return {
        values: formik.values,
        errors: formik.errors,
        touched: formik.touched,
        loading: state.loading,
        handlers: {
            submit: formik.submitForm,
            delete: deleteHandler,
            close: onClose,
            toggle: formik.setFieldValue,
            change: formik.handleChange,
            blur: formik.handleBlur,
        },
        formik: formik,
    };
};

export default usePlayerEditor;
