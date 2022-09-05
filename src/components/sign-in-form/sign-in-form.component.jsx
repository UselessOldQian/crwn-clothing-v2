import { useState} from "react"

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name]:value
        })
    };

    const signInWithGoogleUser = async () => {
        await signInWithGooglePopup();
      };

    const handleSubmit = async (event) => {
        const {email, password} = formFields;
        event.preventDefault();
        try{
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;

                default:
                    console.log(error.message);
            }
            console.log(error.message);
        }

    }


    return (
        <div className='sign-in-container'>
            <h2>Already have an account</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
                />

                <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogleUser}>Sign In with Google</Button>
                </div>
            </form>

        </div>
    )
}

export default SignInForm