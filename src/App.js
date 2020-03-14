import React, { Component } from "react";
import "./App.css";
import firebase from "./components/firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      userVideos: [],
      profileImage: null,
      profileVideo: null,
    };
  }

  componentDidMount() {
    this.state.auth.onAuthStateChanged((user) => {
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

          this.state.storage
            .ref()
            .child(`${this.state.user.uid}-profileVideo`)
            .listAll()
            .then(res => {
              res.items.map(item => {
                item.getDownloadURL().then(url => {

                  this.setState({ profileVideo: url });
                });
              });
            });
        });
      };
    });
  };

  userUploadedImageToDisplay = url => {
    const userImages = [...this.state.userImages];

    userImages.unshift(url);

    this.setState({ userImages });
  };

  userUploadedVideoToDisplay = url => {
    console.log(url)
    const userVideos = [...this.state.userVideos];

    userVideos.unshift(url);

    this.setState({ userVideos });
  }

  deleteImage = e => {
    const confirm = window.confirm('are you sure?');

    if(confirm) {
      const userImages = [...this.state.userImages];
  
      const userDeletedImage = e.target.parentNode.childNodes[0].currentSrc;
  
      const filteredUserImages = userImages.filter(image =>
        image !== userDeletedImage);
  
      this.setState({ userImages: filteredUserImages });
  
      this.state.storage.refFromURL(userDeletedImage).delete();
    }
  };

  deleteVideo = e => {
    const confirm = window.confirm('are you sure?');

    if (confirm) {
      const userVideos = [...this.state.userVideos];

      const userDeletedVideo = e.target.parentNode.childNodes[0].currentSrc;

      const filteredUserVideos = userVideos.filter(video =>
        video !== userDeletedVideo);

      this.setState({ userVideos: filteredUserVideos });

      this.state.storage.refFromURL(userDeletedVideo).delete();
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />

          <Route path='/changmoSungReactProjectFive/' >
            {this.state.user 
            ? 
              <div>
                <Header
                  user={this.state.user}
                  userImages={this.state.userImages}
                  profileImage={this.state.profileImage}
                  profileVideo={this.state.profileVideo}
                  userUploadedImageToDisplay={this.userUploadedImageToDisplay}
                  userUploadedVideoToDisplay={this.userUploadedVideoToDisplay}
                />
                
                <Main
                  userImages={this.state.userImages}
                  userVideos={this.state.userVideos}
                  deleteImage={this.deleteImage}
                  deleteVideo={this.deleteVideo}
                />
              </div>
            :
            <LandingPage userInfo={this.userInfo} /> }
          </Route>

          <Route path='/changmoSungReactProjectFive/bio' component={Bio} />
        </div>
      </Router>
    );
  }
}

export default App;