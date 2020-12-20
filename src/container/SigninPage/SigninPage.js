
import React, { useContext } from 'react'
import './SigninPage.css'
import useForm from '../../Hooks/useForm'
import { signinForm } from '../../components/FormConfig/formConfig'
import { AuthContext } from '../../context/auth-context'

const SigninPage = () => {
    const auth = useContext(AuthContext)

    const { renderFormInputs, isFormValid, signinFormHandler } = useForm(auth, signinForm)

    return (
        <div className="signin-form">
            <h1>ورود</h1>
            {renderFormInputs()}
            <button className="signin-button" type="submit" disabled={!isFormValid()} onClick={signinFormHandler}>
                ورود
            </button>
            <p id="signinStatus"></p>
        </div>
    )
}

export default SigninPage
