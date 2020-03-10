import React, { Component } from "react";
import firebase from "./firebase";

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
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
        console.log(email, password)

        this.state.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorMessage = error.message;

            alert(errorMessage)
        });

        this.state.auth.onAuthStateChanged(user => {
            this.setState({
                user
            })
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.signIn}>
                    <label htmlFor='signInEmail'>email</label>
                    <input ref={this.state.signInEmail} id='signInEmail' type='signInEmail'></input>

                    <label htmlFor='signInPassword'>password</label>
                    <input ref={this.state.signInPassword} id='signInPassword' type='signInPassword'></input>

                    <button>login</button>
                </form>

                <form onSubmit={this.signUp}>
                    <label htmlFor='signUpEmail'>email</label>
                    <input ref={this.state.signUpEmail} id='signUpEmail' type='signUpEmail'></input>

                    <label htmlFor='signUpPassword'>password</label>
                    <input ref={this.state.signUpPassword} id='signUpPassword' type='signUpPassword'></input>

                    <button>sign up</button>
                </form>
            </div>
        );
    }
}

export default LandingPage;
