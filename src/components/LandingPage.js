import React, { Component } from "react";
import firebase from "./firebase";

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            signUpButtonClicked: false,
            auth: firebase.auth(),
            signInEmail: React.createRef(),
            signInPassword: React.createRef(),
            signUpEmail: React.createRef(),
            signUpPassword: React.createRef(),
            testMode: false,
            testModeEmail: null,
            testModePassword: null,
        };
    }

    signIn = (e) => {
        let email;
        let password;

        if(this.state.testMode) {
            email = 'hirechangmo@gmail.com';
            password = 'hirechangmo';
        } else {
            e.preventDefault();

            email = this.state.signInEmail.current.value;
            password = this.state.signInPassword.current.value;
        }

        const promise = this.state.auth.signInWithEmailAndPassword(email, password);

        promise.catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    signUp = (e) => {
        e.preventDefault();
        
        const email = this.state.signUpEmail.current.value;
        const password = this.state.signUpPassword.current.value;

        this.state.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            const errorMessage = error.message;

            alert(errorMessage)
        });

        this.state.auth.onAuthStateChanged(user => {
            this.setState({
                user,
                signUpButtonClicked: !this.state.signUpButtonClicked,
            })
        })
    }

    signUpPopUp = () => {
        this.setState({
            signUpButtonClicked: !this.state.signUpButtonClicked,
        })
    }

    testMode = () => {
        this.setState({ 
            testMode: true,
            testModeEmail: 'hirechangmo0914@gmail.com',
            testModePassword: 'hirechangmo',
         }, () => { this.signIn() })
    }


    render() {
        return (
            <div className='landingPage'>
                <div className='testMode'>
                    <h2>try this test mode!</h2>

                    <button className='testModeButton' onClick={this.testMode}>test mode</button>
                </div>

                {this.state.signUpButtonClicked
                ? 
                    <form className='signUpForm' onSubmit={this.signUp}>
                        <label htmlFor='signUpEmail'>email</label>
                        <input ref={this.state.signUpEmail} id='signUpEmail' type='email' placeholder='email' required></input>

                        <label htmlFor='signUpPassword'>password</label>
                        <input ref={this.state.signUpPassword} id='signUpPassword' type='password' placeholder='password' required></input>

                        <button className='signUpPageButton'>sign up</button>

                        <span onClick={this.signUpPopUp}>X</span>
                    </form>
                : 
                    <form className='signInForm' onSubmit={this.signIn}>
                        <label htmlFor='signInEmail'>email</label>
                        <input ref={this.state.signInEmail} id='signInEmail' type='email' placeholder='email' required></input>

                        <label htmlFor='signInPassword'>password</label>
                        <input ref={this.state.signInPassword} id='signInPassword' type='password' placeholder='password' required></input>


                        <div className='signInAndUpButtons'>
                            {this.state.signUpButtonClicked ? null : <button>sign in</button>}

                            {!this.state.signUpButtonClicked ? <button onClick={this.signUpPopUp}>sign up</button> : null}
                        </div>
                    </form>}
            </div>
        );
    }
}

export default LandingPage;
