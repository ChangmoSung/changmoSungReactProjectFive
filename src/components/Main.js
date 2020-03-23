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
          <Link to="/changmoSungReactProjectFive/" data-type='images' onClick={this.props.iconToggle}><i className="far fa-image" data-type='images' tabIndex='0'></i></Link>

          <Link to="/changmoSungReactProjectFive/video/" data-type='videos' onClick={this.props.iconToggle}><i className="fas fa-video" data-type='videos' tabIndex='0'></i></Link>
          
          <Link to='/changmoSungReactProjectFive/journal/' data-type='journals' onClick={this.props.journalIconClicked}><i className="fas fa-book" tabIndex='0'></i></Link>
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

                  <div tabIndex='0' onKeyDown={this.props.deleteItem} onClick={this.props.deleteItem}>
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

                  <div tabIndex='0' onKeyDown={this.props.deleteItem} onClick={this.props.deleteItem}>
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
