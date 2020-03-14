import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
        };
    }

    signOut = () => {
        this.state.auth.signOut();

        this.state.auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) {
            } else {
                this.setState({
                    user: null,
                })
                window.location.reload(false)
            }
        })
    }

    render() {
        return (
            <nav>
                <div className="wrapper">
                    <div className="navLogo">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-five-97681.appspot.com/o/Z6fwRPBHhyVDwn8eFKzGX0eUQk13-favourite-images%2FJRr5JCPzDzVRYx1OPeUl?alt=media&token=72dacc8e-57dc-40f5-ba10-2249c4e15244" alt='logo'></img>
                    </div>

                    <Link to='/changmoSungReactProjectFive/'>Go back home</Link>
                    
                    <button onClick={this.signOut} className="signOut">sign out</button>
                </div>
            </nav>
        );
    }
}

export default Nav;
