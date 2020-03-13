import React, { Component } from "react";
import "./App.css";
import firebase from "./components/firebase";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Main from "./components/Main";
import LandingPage from "./components/LandingPage";
import Bio from './components/Bio';

class App extends Component {
  constructor() {
    super();
    this.state = {
      database: firebase.firestore(),
      storage: firebase.storage(),
      auth: firebase.auth(),
      user: null,
      userImages: [],
      userUploadedImagesToDisplay: null,
      userBios: [],
    };
  }

  componentDidMount() {
    this.state.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user }, () => {
          this.userInfo(user);
        });

        this.state.database.collection(this.state.user.uid).onSnapshot(snapshot => {
          const userBios = [...this.state.userBios];

          const changes = snapshot.docChanges();

          changes.forEach(change => {
            userBios.unshift(change.doc.data());
          })

          this.setState({ userBios })
        })
      };
    });
  };

  userInfo = user => {
    this.setState({
      user
    }, () => {
    const userImages = [...this.state.userImages];

    this.state.storage
      .ref()
      .child(`${this.state.user.uid}-galleryImages`)
      .listAll()
      .then(res => {
        res.items.map(item => {
          item.getDownloadURL().then(url => {
            userImages.push(url);

            this.setState({ userImages });
          });
        });
      });
    })
  }

  userUploadedImageToDisplay = url => {
    const userImages = [...this.state.userImages];

    userImages.unshift(url);

    this.setState({ userImages });
  };

  deleteImage = e => {
    const userImages = [...this.state.userImages];

    const userDeletedImage = e.target.parentNode.childNodes[0].currentSrc;

    const filteredUserImages = userImages.filter(image =>
      image !== userDeletedImage);

    this.setState({ userImages: filteredUserImages });

    this.state.storage.refFromURL(userDeletedImage).delete();
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path='/changmoSungReactProjectFive' exact>
            {this.state.user 
            ? 
              <div>
                <Header
                  user={this.state.user}
                  userImages={this.state.userImages}
                  userUploadedImageToDisplay={this.userUploadedImageToDisplay}
                />

                <Main
                  userImages={this.state.userImages}
                  deleteImage={this.deleteImage}
                />
              </div>
            : 
              <LandingPage userInfo={this.userInfo} /> }
          </Route>

          <Route path='/changmoSungReactProjectFive/bio' render={() => <Bio user={this.state.user} userBios={this.state.userBios} ></Bio>} />
        </div>
      </Router>
    );
  }
}

export default App;





// add bio section that users can change

// add personal info section e.g. email and phone number