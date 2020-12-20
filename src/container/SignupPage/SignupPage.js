import React, { useContext } from 'react'
import useForm from '../../Hooks/useForm'
import { signupForm } from '../../components/FormConfig/formConfig'
import "./SignupPage.css"
import Wrapper from '../../hoc/Wrapper'
import { AuthContext } from '../../context/auth-context'

const SignupForm = () => {
    const auth = useContext(AuthContext)

    const { renderFormInputs, isFormValid, signupFormHandler } = useForm(auth, signupForm)




    return (
        <Wrapper>
            <form className="signupForm">
                <h1>عضویت</h1>
                {renderFormInputs()}
                <button className="signup-button" type="submit" disabled={!isFormValid()} onClick={signupFormHandler}>
                    عضویت
            </button>
                <p id="signupStatus"></p>
            </form >
        </Wrapper>
    )
}

export default SignupForm