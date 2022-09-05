import { useState} from "react"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name]:value
        })
    };

    const handleSubmit = async (event) => {
        const {displayName, email, password, confirmPassword} = formFields;
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password doesn't match confirm password");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            const userDocRef = createUserDocumentFromAuth(user,{displayName});
        }catch(error){
            console.log(error.message);
        }

    }


    return (
        <div>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='DisplayName' required onChange={handleChange} name='displayName' value={displayName}/>

                <FormInput label='Email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='password' required onChange={handleChange} name='password' value={password}/>

                <FormInput label='Confirm Password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">Sign Up</Button>
            </form>

        </div>
    )
}

export default SignUpForm