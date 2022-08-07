import { useState } from 'react';
import FormInput from '../form-input/form-input-component';
import Button from '../button/button.component';
import { 
  signInWithGooglePopup, 
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect email and/or password.');
          break;
        case 'auth/user-not-found':
          alert('Incorrect email and/or password.');
          break;
        default: 
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <p>Sign in with your email and password.</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          inputOptions= {{
            type: 'email', 
            required: true,
            name: 'email',
            onChange: handleChange,
            value: email
          }} >  
        </FormInput>
        <FormInput
          label='Password'
          inputOptions= {{
            type: 'password', 
            required: true,
            name: 'password',
            onChange: handleChange,
            value: password
          }} >  
        </FormInput>
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
        </div> 
      </form>
    </div>
  )
}

export default SignInForm;