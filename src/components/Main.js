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
                            <div key={i} className="galleryImage" onClick={this.enlargeImage} tabIndex='0'>
                                <img src={image}></img>
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
