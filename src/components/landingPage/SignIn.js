import React, { Component } from 'react';
import firebase from "../firebase";
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
        }
    }

    signIn = e => {
        e.preventDefault();
        const email = document.querySelector('#signInEmail').value;
        const password = document.querySelector('#signInPassword').value;

        const promise = this.state.auth.signInWithEmailAndPassword(email, password);

        promise.catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);

            document.querySelector('#signInEmail').value = '';
            document.querySelector('#signInPassword').value = '';
        });

        this.props.redirectUser();
    }

    render() { 
        return ( 
            <form className='signInForm' onSubmit={this.signIn}>
                <label htmlFor='signInEmail'>email</label>
                <input id='signInEmail' type='email' placeholder='email' required></input>

                <label htmlFor='signInPassword'>password</label>
                <input id='signInPassword' type='password' placeholder='password' required></input>

                <div className='signInAndUpButtons'>
                    <button>sign in</button>

                    <button type='button' tabIndex='-1'>
                        <Link to='/changmoSungReactProjectFive/signup'>
                            <span tabIndex='0'>sign up</span>
                        </Link>
                    </button>
                </div>
            </form>
        );
    }
}
 
export default SignIn;