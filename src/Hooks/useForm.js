import { useState, useCallback } from 'react'
import axios from '../axios-orders'
import { useHistory } from "react-router-dom"


const useForm = (authContext, formObj) => {
    const [form, setForm] = useState(formObj)
    const [auth, setAuth] = useState(authContext)
    const renderFormInputs = () => {
        return Object.values(form).map((inputObj) => {
            const { value, label, errorMessage, valid, renderInput } = inputObj
            return renderInput(onInputChange, value, valid, errorMessage, label)
        })
    }

    let history = useHistory()

    const isInputFieldValid = useCallback(
        (inputField) => {
            for (const rule of inputField.validationRules) {
                if (!rule.validate(inputField.value, form)) {
                    inputField.errorMessage = rule.message
                    return false
                }
            }

            return true
        },
        [form]
    )

    const onInputChange = useCallback(
        (event) => {
            const { name, value } = event.target
            // copy input object whose value was changed
            const inputObj = { ...form[name] }
            // update value
            inputObj.value = value

            // update input field's validity
            const isValidInput = isInputFieldValid(inputObj)
            // if input is valid and it was previously set to invalid
            // set its valid status to true
            if (isValidInput && !inputObj.valid) {
                inputObj.valid = true
            } else if (!isValidInput && inputObj.valid) {
                // if input is not valid and it was previously valid
                // set its valid status to false
                inputObj.valid = false
            }

            // mark input field as touched
            inputObj.touched = true
            setForm({ ...form, [name]: inputObj })
        },
        [form, isInputFieldValid]
    )

    /**
     * returns boolean value indicating whether overall form is valid
     *
     * @param {object} formObj - object representation of a form
     */
    const isFormValid = useCallback(() => {
        let isValid = true
        const arr = Object.values(form)

        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].valid) {
                isValid = false
                break
            }
        }

        return isValid
    }, [form])

    const signupFormHandler = (event) => {
        console.log(form)
        axios.post('/accounts.json', { name: form.name, email: form.email, password: form.password })
            .then((response) => {
                document.getElementById("signupStatus").innerHTML = "عضویت موفق"
                // return < Redirect to="/sign-in" />



            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signinFormHandler = (event) => {

        axios.get('https://functional-shop-default-rtdb.firebaseio.com/accounts.json')
            .then((response) => {
                for (let item in response.data) {
                    console.log(response.data[item])
                    if (response.data[item].email.value === form.email.value) {
                        if (response.data[item].password.value === form.password.value) {
                            auth.login()
                            document.getElementById("signinStatus").innerHTML = "ورود موفق"
                            history.push("/")
                        }
                        else document.getElementById("signinStatus").innerHTML = "ورود ناموفق"
                    }
                    else document.getElementById("signinStatus").innerHTML = "ورود ناموفق"
                }
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }

    return { renderFormInputs, isFormValid, signupFormHandler, signinFormHandler }
}

export default useForm