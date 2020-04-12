import React, { Component } from "react";
import "./App.css";
import firebase from "./components/firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import LandingPage from "./components/landingPage/LandingPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      database: firebase.firestore(),
      storage: firebase.storage(),
      auth: firebase.auth(),
      user: '',
      userImages: [],
      userVideos: [],
      profileImage: null,
      journals: [],
    };
  }


  componentDidMount() {
    this.state.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user }, () => {
          this.state.storage
            .ref()
            .child(`${this.state.user.uid}`)
            .listAll()
            .then(res => {
              Promise.all(
                res.items.map(item => {
                  return item.getDownloadURL();
                })
              ).then(urls => {
                urls.forEach(url => {
                  if (url.includes('galleryImage')) {
                    const userImages = [...this.state.userImages];
                    userImages.unshift(url);
                    this.setState({ userImages });

                  } else if (url.includes('galleryVideo')) {
                    const userVideos = [...this.state.userVideos];
                    userVideos.unshift(url);
                    this.setState({ userVideos });

                  } else {
                    const profileImage = url;
                    this.setState({ profileImage });
                  };
                });
              });
            });
        });
      };
    });
  };


  userUploadedFile = (url, type) => {
    if (type) {
      const userImages = [...this.state.userImages];

      userImages.unshift(url);

      this.setState({ userImages });

    } else {
      const userVideos = [...this.state.userVideos];

      userVideos.unshift(url);

      this.setState({ userVideos });
    };
  };


  deleteItem = e => {
    e.stopPropagation();
    
    if (e.keyCode === 13 || typeof e.keyCode !== 'number') {
      const confirm = window.confirm("Are you sure you want to delete the image?");
      const deletedItem = e.target.parentNode.childNodes[0].getAttribute('src');
      const userItems = deletedItem.includes('galleryImage') ? [...this.state.userImages] : [...this.state.userVideos];

      if (confirm) {
        this.state.storage.refFromURL(deletedItem).delete();

        if (deletedItem.includes('galleryImage')) {
          const filteredUserImages = userItems.filter(image => image !== deletedItem);
          this.setState({ userImages: filteredUserImages });

        } else {
          const filteredUserVideos = userItems.filter(video => video !== deletedItem);
          this.setState({ userVideos: filteredUserVideos });
        }
      }
    }
  };


  render() {
    return (
      <Router>
        <Switch>
          <Route path={`/changmoSungReactProjectFive/${this.state.user.uid}`}>
            <Header
              user={this.state.user}
              profileImage={this.state.profileImage}
              userUploadedFile={this.userUploadedFile}
            />

            <Main
              uid={this.state.user.uid}
              userImages={this.state.userImages}
              userVideos={this.state.userVideos}
              deleteItem={this.deleteItem}
            />
          </Route>

          <Route path="/changmoSungReactProjectFive/" component={LandingPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;