import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  enlargeImage = e => {
    const image = e.target.parentNode;

    image.classList.toggle("enlarged");
  };

  render() {
    return (
      <main className="gallery">
        <div className="wrapper">
          <div>
            <Link to="/changmoSungReactProjectFive/">image</Link>
            <Link to="/changmoSungReactProjectFive/video">video</Link>
          </div>

          <Route path="/changmoSungReactProjectFive/" exact>
            {this.props.userImages.map((image, i) => {
              return (
                <div key={i} className="galleryImage" tabIndex="0">
                  <img
                    src={image}
                    alt="user uploaded"
                    onClick={this.enlargeImage}
                  ></img>

                  <button onClick={this.props.deleteImage}>delete</button>
                </div>
              );
            })}
          </Route>

          {/* fix deleting video functionality */}
          <Route path="/changmoSungReactProjectFive/video" exact>
            {this.props.userVideos.map((video, i) => {
              return (
                <div key={i} className="galleryImage" tabIndex="0">
                  <video
                    src={video}
                    alt="user uploaded"
                    controls="controls"
                    onClick={this.enlargeImage}
                  ></video>

                  <button onClick={this.props.deleteVideo}>delete</button>
                </div>
              );
            })}
          </Route>
        </div>
      </main>
    );
  }
}

export default Main;
