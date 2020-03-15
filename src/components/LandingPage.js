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
        };
    }

    signIn = (e) => {
        e.preventDefault();

        const email = this.state.signInEmail.current.value;
        const password = this.state.signInPassword.current.value;

        const promise = this.state.auth.signInWithEmailAndPassword(email, password);

        promise.catch(function (error) {
            const errorMessage = error.message;
            alert(errorMessage);
        });

        this.state.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user,
                }, () => {
                        this.props.userInfo(user)
                })
            }
        })
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


    render() {
        return (
            <div className='landingPage'>
                {this.state.signUpButtonClicked
                ? 
                    <form className='signUpForm' onSubmit={this.signUp}>
                        <label htmlFor='signUpEmail'>Email</label>
                        <input ref={this.state.signUpEmail} id='signUpEmail' type='email'></input>

                        <label htmlFor='signUpPassword'>Password</label>
                        <input ref={this.state.signUpPassword} id='signUpPassword' type='password'></input>

                        <button>Sign up</button>

                        <span onClick={this.signUpPopUp}>X</span>
                    </form>
                : 
                    <form className='signInForm' onSubmit={this.signIn}>
                        <label htmlFor='signInEmail'>Email</label>
                        <input ref={this.state.signInEmail} id='signInEmail' type='email'></input>

                        <label htmlFor='signInPassword'>Password</label>
                        <input ref={this.state.signInPassword} id='signInPassword' type='password'></input>

                        <button>Login</button>
                    </form>}
                
                {!this.state.signUpButtonClicked ? <button onClick={this.signUpPopUp}>Sign up</button> : null}
            </div>
        );
    }
}

export default LandingPage;
