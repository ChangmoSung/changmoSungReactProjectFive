import React, { Component } from "react";
import firebase from "../firebase";
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
            testModeEmail: 'changmosung0914@gmail.com',
            testModePassword: 'hirechangmo',
        };
    }

    redirectUser = () => {
        this.state.auth.onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(`/${user.uid}`)
            }
        })
    }

    testMode = () => {
        const email = this.state.testModeEmail;
        const password = this.state.testModePassword;

        const promise = this.state.auth.signInWithEmailAndPassword(email, password);

        promise.catch(function (error) {
            const errorMessage = error.message;

            alert(errorMessage);
        });

        this.redirectUser();
    }

    render() {
        return (
            <div className='landingPage'>
                <div className='testMode'>
                    <h2>try this test mode!</h2>

                    <button className='testModeButton' onClick={this.testMode}>test mode</button>
                </div>

                <Switch>
                    <Route 
                        path='/signup' 
                        component={() => <SignUp redirectUser={this.redirectUser}/>} 
                    />

                    <Route 
                        path='/' 
                        component={() => <SignIn signIn={this.signIn} redirectUser={this.redirectUser}/>}
                    />
                </Switch>

            </div>
        );
    }
}

export default LandingPage;