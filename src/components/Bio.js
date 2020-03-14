import React, { Component } from 'react';
import firebase from "./firebase";


class Bio extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
            database: firebase.firestore(),
            user: null,
            userBios: [],
            title: React.createRef(),
            bio: React.createRef(),
        }
    }

    componentDidMount() {
        this.state.auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    user 
                }, () => {
                    this.state.database.collection(this.state.user.uid).onSnapshot(snapshot => {
                        const userBios = [...this.state.userBios];

                        const changes = snapshot.docChanges();

                        changes.forEach(change => {
                            userBios.unshift(change.doc.data());
                        });
                        this.setState({ userBios });
                    })
                });
            };
        });
    }

    setBio = e => {
        e.preventDefault();

        const uniqueId = this.state.database.collection(this.state.user.uid).doc().id;

        const title = this.state.title.current.value;

        const bio = this.state.bio.current.value;

        if(title && bio) {
            this.state.database.collection(this.state.user.uid).doc(uniqueId).set({
                title: title,
                bio: bio,
                id: uniqueId,
            });
        } else {
            alert('please fill in the blank')
        }

        this.state.title.current.value = '';
        this.state.bio.current.value = '';
    }

    deleteBio = (e) => {
        const confirm = window.confirm('are you sure?');

        if(confirm) {
            const uniqueId = e.target.parentNode.id;
    
            this.state.database.collection(this.state.user.uid).onSnapshot(snapshot => {
                const userBios = [...this.state.userBios];
    
                const filteredBios = userBios.filter(bio => bio.id !== uniqueId);
    
                this.setState({ userBios: filteredBios });
            })
    
            this.state.database.collection(this.state.user.uid).doc(uniqueId).delete();
        }
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
                    {this.state.userBios.map((bio, i) => {
                        return (
                            <div key={i} id={bio.id} className='bio'>
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