import React from 'react'
import Input from '../../components/Input/Input'

import {
    requiredRule,
    minLengthRule,
    maxLengthRule,
    passwordMatchRule
} from "./inputValidationRules"

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
const createFormFieldConfig = (label, name, type, defaultValue = "") => {
    return {
        renderInput: (handleChange, value, isValid, error, key) => {
            return (
                <Input
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    value={value}
                    handleChange={handleChange}
                    errorMessage={error}
                />
            )
        },
        label,
        value: defaultValue,
        valid: false,
        errorMessage: "",
        touched: false
    }
}

// object representation of signup form
export const signupForm = {
    name: {
        ...createFormFieldConfig("نام و نام خانوادگی", "name", "text"),
        validationRules: [
            requiredRule("name"),
            minLengthRule("name", 3),
            maxLengthRule("name", 40)
        ]
    },
    email: {
        ...createFormFieldConfig("ایمیل", "email", "email"),
        validationRules: [
            requiredRule("email"),
            minLengthRule("email", 8),
            maxLengthRule("email", 40)
        ]
    },
    password: {
        ...createFormFieldConfig("رمز عبور", "password", "password"),
        validationRules: [
            requiredRule("password"),
            minLengthRule("password", 8),
            maxLengthRule("password", 20)
        ]
    },
    confirmPassword: {
        ...createFormFieldConfig("تکرار رمز عبور", "confirmPassword", "password"),
        validationRules: [passwordMatchRule()]
    }
}

export const signinForm = {

    email: {
        ...createFormFieldConfig("ایمیل", "email", "email"),
        validationRules: [
            requiredRule("email"),
            minLengthRule("email", 8),
            maxLengthRule("email", 40)
        ]
    },
    password: {
        ...createFormFieldConfig("رمز عبور", "password", "password"),
        validationRules: [
            requiredRule("password"),
            minLengthRule("password", 8),
            maxLengthRule("password", 20)
        ]
    }
}