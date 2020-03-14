import React, { Component } from "react";

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
                    {this.props.userImages.map((image, i) => {
                        return (
                            <div key={i} className="galleryImage" tabIndex='0'>
                                <img src={image} alt='user uploaded' onClick={this.enlargeImage}></img>
                                <button onClick={this.props.deleteImage}>delete</button>
                            </div>
                        );
                    })}
                </div>
            </main>
        );
    }
}

export default Main;
