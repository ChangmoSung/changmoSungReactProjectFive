import React, { Component } from 'react';
import firebase from "./firebase";

class Bio extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
            database: firebase.firestore(),
            user: null,
            userJournals: [],
            title: React.createRef(),
            journal: React.createRef(),
        }
    }

    componentDidMount() {
        this.state.auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    user 
                }, () => {
                    this.state.database.collection(this.state.user.uid).onSnapshot(snapshot => {
                        const userJournals = [...this.state.userJournals];

                        const changes = snapshot.docChanges();

                        changes.forEach(change => {
                            userJournals.unshift(change.doc.data());
                        });
                        this.setState({ userJournals }, () => {
                            const userJournalsLength = this.state.userJournals.length;

                            this.props.numOfUserJournals(userJournalsLength);
                        });
                    })
                });
            };
        });
    }

    setJournal = e => {
        e.preventDefault();

        const uniqueId = this.state.database.collection(this.state.user.uid).doc().id;

        const title = this.state.title.current.value;

        const journal = this.state.journal.current.value;

        this.state.database.collection(this.state.user.uid).doc(uniqueId).set({
            title: title,
            journal: journal,
            id: uniqueId,
        } ,() => {
            const userJournalsLength = this.state.userJournals + 1;

            this.props.numOfUserJournals(userJournalsLength);
        });

        this.state.title.current.value = '';
        this.state.journal.current.value = '';
    }

    deleteJournal = (e) => {
        const confirm = window.confirm('Are you sure you want to delete the bio?');

        if(confirm) {
            const uniqueId = e.target.parentNode.id;

    
            this.state.database.collection(this.state.user.uid).onSnapshot(snapshot => {
                const userJournals = [...this.state.userJournals];
    
                const filteredJournals = userJournals.filter(journal => journal.id !== uniqueId);
    
                this.setState({ userJournals: filteredJournals });

                const userJournalsLength = filteredJournals.length;

                this.props.numOfUserJournals(userJournalsLength);
            })

            this.state.database.collection(this.state.user.uid).doc(uniqueId).delete();
        }
    }

    render() { 
        return (
            <div className='journalSection'>
                <form onSubmit={this.setJournal} className='journalForm'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' ref={this.state.title} required></input>

                    <label htmlFor='journal'>Journal</label>
                    <textarea id='journal' ref={this.state.journal} rows='5' required></textarea>

                    <button>add</button>
                </form>

                <div className='journalContainer'>
                    {this.state.userJournals.map((journal, i) => {
                        return (
                            <div key={i} id={journal.id} className='journal'>
                                <h3>{journal.title}</h3>

                                <p>{journal.journal}</p>

                                <button onClick={this.deleteJournal}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
         );
    }
}
 
export default Bio;