import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {  
  VALIDATOR_MINLENGTH 
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

 const Auth = () => {
   const auth = useContext(AuthContext);
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const [formState, inputHandler] = useForm(
     {
      username: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
   );

   const authSubmitHandler = async event => {
     event.preventDefault();
     
     try {
       const responseData = await sendRequest(
         process.env.REACT_APP_BACKEND_URL + '/users/login',
         'POST',
         JSON.stringify({
          username: formState.inputs.username.value,
          password: formState.inputs.password.value
         }),
         {
           'Content-Type': 'application/json'
         }
       );
        auth.login(responseData.userId, responseData.username, responseData.token);
      } catch (err) {}
   }
   return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input" 
            id="username" 
            type="username" 
            label="Username" 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid email username."
            onInput={inputHandler}
          />
          <Input
            element="input" 
            id="password" 
            type="password" 
            label="Password" 
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password, at least 8 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
        </form>
      </Card>
    </React.Fragment>
   );
 };

 export default Auth;