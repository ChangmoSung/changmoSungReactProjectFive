import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "./firebase";


class Bio extends Component {
    constructor() {
        super();
        this.state = {
            database: firebase.firestore(),
            title: React.createRef(),
            bio: React.createRef(),
            userBios: [],
            bioIds: [],
        }
    }

    setBio = e => {
        e.preventDefault();
        const title = this.state.title.current.value;

        const bio = this.state.bio.current.value;

        this.state.database.collection(this.props.user.uid).add({
            title: title,
            bio: bio
        });

        this.state.title.current.value = '';
        this.state.bio.current.value = '';
    }

    deleteBio = () => {
        // this.state.database.collection(this.props.user.uid).doc(id).delete();
    }

    render() { 
        return (
            <div className='bioSection'>
                <form onSubmit={this.setBio} className='bioForm'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' ref={this.state.title}></input>

                    <label htmlFor='bio'>Bio</label>
                    <input type='textarea' id='bio' ref={this.state.bio}></input>

                    <button>add to bio</button>
                </form>

                <div className='bioContainer'>
                    {this.props.userBios.map((bio, i) => {
                        return (
                            <div key={i} className='bio'>
                                <h3>{bio.title}</h3>

                                <p>{bio.bio}</p>

                                <button onClick={this.deleteBio}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
         );
    }
}
 
export default Bio;