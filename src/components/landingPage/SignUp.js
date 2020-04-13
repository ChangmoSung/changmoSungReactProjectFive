import React, { Component } from 'react';
import firebase from "../firebase";
import { Link } from 'react-router-dom';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
        }
    }

    signUp = e => {
        e.preventDefault();

        const email = document.querySelector('#signUpEmail').value;
        const password = document.querySelector('#signUpPassword').value;

        this.state.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);

            document.querySelector('#signUpEmail').value = '';
            document.querySelector('#signUpPassword').value = '';
        });

        this.props.redirectUser();
    }

    render() { 
        return ( 
            <form className='signUpForm' onSubmit={this.signUp}>
                <label htmlFor='signUpEmail'>email</label>
                <input id='signUpEmail' type='email' placeholder='email' required></input>

                <label htmlFor='signUpPassword'>password</label>
                <input id='signUpPassword' type='password' placeholder='password' required></input>

                <button className='signUpPageButton'>sign up</button>

                <Link to='/'>X</Link>
            </form>
         );
    }
}
 
export default SignUp;