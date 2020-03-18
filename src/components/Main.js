import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Journal from "./Journal";

class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  enlargeImage = e => {
    const image = e.target;
    
    if(e.keyCode === 13) {
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
                <li key={i} className="galleryImage" tabIndex='0' onClick={this.enlargeImage}>
                  <img
                    src={image}
                    alt="user uploaded item"
                  ></img>

                  <button onClick={this.props.deleteImage}>delete</button>
                </li>
              );
            })}
          </Route>

          <Route path="/changmoSungReactProjectFive/video/" exact>
            {this.props.userVideos.map((video, i) => {
              return (
                <li key={i} className="galleryImage">
                  <video
                    src={video}
                    alt="user uploaded item"
                    controls="controls"
                    tabIndex='0'
                    onClick={this.enlargeImage}
                  ></video>

                  <button onClick={this.props.deleteVideo}>delete</button>
                </li>
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
