import React, { Component } from "react";
import "./App.css";
import firebase from "./components/firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import LandingPage from "./components/LandingPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      database: firebase.firestore(),
      storage: firebase.storage(),
      auth: firebase.auth(),
      user: null,
      userImages: [],
      userVideos: [],
      profileImage: null,
      videoIconClicked: false,
      journalIconClicked: false,
      journalLength: 0,
    };
  }

  componentDidMount() {
    this.state.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user }, () => {
          const userImages = [...this.state.userImages];

          const userVideos = [...this.state.userVideos];

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

          this.state.storage
            .ref()
            .child(`${this.state.user.uid}-galleryVideos`)
            .listAll()
            .then(res => {
              res.items.map(item => {
                item.getDownloadURL().then(url => {
                  userVideos.push(url);

                  this.setState({ userVideos });
                });
              });
            });

          this.state.storage
            .ref()
            .child(`${this.state.user.uid}-profileImage`)
            .listAll()
            .then(res => {
              res.items.map(item => {
                item.getDownloadURL().then(url => {
                  this.setState({ profileImage: url });
                });
              });
            });
        });
      }
    });
  }

  userUploadedImageToDisplay = url => {
    const userImages = [...this.state.userImages];

    userImages.unshift(url);

    this.setState({ userImages });
  };

  userUploadedVideoToDisplay = url => {
    const userVideos = [...this.state.userVideos];

    userVideos.unshift(url);

    this.setState({ userVideos });
  };

  deleteImage = e => {
    const confirm = window.confirm("Are you sure you want to delete the image?");

    if (confirm) {
      const userImages = [...this.state.userImages];

      const userDeletedImage = e.target.parentNode.childNodes[0].currentSrc;

      const filteredUserImages = userImages.filter(
        image => image !== userDeletedImage
      );

      this.setState({ userImages: filteredUserImages });

      this.state.storage.refFromURL(userDeletedImage).delete();
    }
  };

  deleteVideo = e => {
    const confirm = window.confirm("are you sure?");

    if (confirm) {
      const userVideos = [...this.state.userVideos];

      const userDeletedVideo = e.target.parentNode.childNodes[0].currentSrc;

      const filteredUserVideos = userVideos.filter(
        video => video !== userDeletedVideo
      );

      this.setState({ userVideos: filteredUserVideos });

      this.state.storage.refFromURL(userDeletedVideo).delete();
    }
  };

  imageIconClicked = () => {
    this.setState({
      videoIconClicked: false,
      journalIconClicked: false,
    })
  }

  videoIconClicked = () => {
    this.setState({
      videoIconClicked: true,
      journalIconClicked: false,
    })
  }

  journalIconClicked = (length) => {
    this.setState({
      videoIconClicked: false,
      journalIconClicked: true,
      journalLength: length
    })
  }


  render() {
    return (
      <Router>
        <div>
          <Route path="/changmoSungReactProjectFive/">
            {this.state.user ? (
              <div className='root'>
                <Header
                  user={this.state.user}
                  userImages={this.state.userImages}
                  userVideos={this.state.userVideos}
                  profileImage={this.state.profileImage}
                  userUploadedImageToDisplay={this.userUploadedImageToDisplay}
                  userUploadedVideoToDisplay={this.userUploadedVideoToDisplay}
                  videoIconClicked={this.state.videoIconClicked}
                  journalIconClicked={this.state.journalIconClicked}
                  journalLength={this.state.journalLength}
                />

                <Main
                  userImages={this.state.userImages}
                  userVideos={this.state.userVideos}
                  deleteImage={this.deleteImage}
                  deleteVideo={this.deleteVideo}
                  imageIconClicked={this.imageIconClicked}
                  videoIconClicked={this.videoIconClicked}
                  journalIconClicked={this.journalIconClicked}
                />
              </div>
            ) : (
              <LandingPage />
            )}
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;