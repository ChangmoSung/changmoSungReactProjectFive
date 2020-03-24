import React, { Component } from 'react';
import firebase from "./firebase";

class Journal extends Component {
    constructor() {
        super();
        this.state = {
            auth: firebase.auth(),
            database: firebase.firestore(),
            user: null,
            userJournals: [],
        }

        this.title = React.createRef();
        this.journal = React.createRef();
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
                            this.props.journalIconClicked(this.state.userJournals);
                        });
                    })
                });
            };
        });
    }

    setJournal = e => {
        e.preventDefault();

        const uniqueId = this.state.database.collection(this.state.user.uid).doc().id;

        const title = this.title.current.value;

        const journal = this.journal.current.value;

        this.state.database.collection(this.state.user.uid).doc(uniqueId).set({
            title: title,
            journal: journal,
            id: uniqueId,
        });

        this.title.current.value = '';
        this.journal.current.value = '';
    }

    deleteJournal = e => {
        const confirm = window.confirm('Are you sure you want to delete the bio?');

        if (confirm) {
            const uniqueId = e.target.parentNode.id;

            this.state.database.collection(this.state.user.uid).doc(uniqueId).delete().then(() => {
                const userJournals = [...this.state.userJournals];

                const filteredJournals = userJournals.filter(journal => journal.id !== uniqueId);
                this.setState({ userJournals: filteredJournals });

                this.props.journalIconClicked(filteredJournals);
            })
        }
    }

    render() {
        return (
            <div className='journalSection'>
                <form onSubmit={this.setJournal} className='journalForm'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' ref={this.title} required></input>

                    <label htmlFor='journal'>Journal</label>
                    <textarea id='journal' ref={this.journal} rows='5' required></textarea>

                    <button>add</button>
                </form>

                <div className='journalContainer'>
                    {this.state.userJournals.map((journal, i) => {
                        return (
                            <div key={i} id={journal.id} className='journal'>
                                <h3>{journal.title}</h3>

                                <p>{journal.journal}</p>

                                <button onClick={this.deleteJournal}>delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Journal;