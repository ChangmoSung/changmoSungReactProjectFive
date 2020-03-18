import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Journal from "./Journal";

class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  enlargeImage = e => {
    const image = e.target.parentNode;

    image.classList.toggle("enlarged");

    if(e.keyCode === 13) {
      const image = e.target;

      image.classList.toggle("enlarged");
    }
  };

  render() {
    return (
      <main className="gallery">
        <div className='links'>
          <Link to="/changmoSungReactProjectFive/"><i className="far fa-image" tabIndex='0' onClick={this.props.imageIconClicked}></i></Link>

          <Link to="/changmoSungReactProjectFive/video/"><i className="fas fa-video" tabIndex='0' onClick={this.props.videoIconClicked}></i></Link>
          
          <Link to='/changmoSungReactProjectFive/journal/'><i className="fas fa-book" tabIndex='0' onClick={this.props.journalIconClicked}></i></Link>
        </div>

        <ul className="wrapper">
          <Route path="/changmoSungReactProjectFive/" exact>
            {this.props.userImages.map((image, i) => {
              return (
                <button key={i} className="galleryImage" onClick={this.enlargeImage} onKeyDown={this.enlargeImage}>
                  <img
                    src={image}
                    alt="user uploaded item"
                  ></img>

                  <div tabIndex='0' onKeyDown={this.props.deleteImage} onClick={this.props.deleteImage}>
                    <span>delete</span>
                  </div>
                </button>
              );
            })}
          </Route>

          <Route path="/changmoSungReactProjectFive/video/" exact>
            {this.props.userVideos.map((video, i) => {
              return (
                <button key={i} className="galleryImage">
                  <video
                    src={video}
                    alt="user uploaded item"
                    controls="controls"
                  ></video>

                  <div tabIndex='0' onKeyDown={this.props.deleteVideo} onClick={this.props.deleteVideo}>
                    <span>delete</span>
                  </div>
                </button>
              );
            })}
          </Route>

          <Route path="/changmoSungReactProjectFive/journal/" render={() => <Journal journalIconClicked={this.props.journalIconClicked} />} />
        </ul>
      </main>
    );
  }
}

export default Main;
