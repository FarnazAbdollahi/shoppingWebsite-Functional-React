/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
const createValidationRule = (ruleName, errorMessage, validateFunc) => {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc
    }
}

export const requiredRule = (inputName) => {
    return createValidationRule(
        "required",
        `${inputName} required`,
        (inputValue, formObj) => inputValue.length !== 0
    )
}

export const minLengthRule = (inputName, minCharacters) => {
    return createValidationRule(
        "minLength",
        `${inputName} should contain atleast ${minCharacters} characters`,
        (inputValue, formObj) => inputValue.length >= minCharacters
    )
}

export const maxLengthRule = (inputName, maxCharacters) => {
    return createValidationRule(
        "minLength",
        `${inputName} cannot contain more than ${maxCharacters} characters`,
        (inputValue, formObj) => inputValue.length <= maxCharacters
    )
}

export const passwordMatchRule = () => {
    return createValidationRule(
        "passwordMatch",
        `passwords do not match`,
        (inputValue, formObj) => inputValue === formObj.password.value
    )
}
