import React, { Component } from "react";
import firebase from "./firebase";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            storage: firebase.storage(),
            database: firebase.firestore(),
            progress: 0
        };
    }

    uploadImage = e => {
        const imageToUpload = e.target.files[0];

        const uniqueKey = this.state.database.collection("uniqueKey").doc().id;

        const uploadTask = this.state.storage
            .ref(`${this.props.user.uid}-images/${uniqueKey}`)
            .put(imageToUpload);

        uploadTask.on(
            "state_changed",
            snapshot => {
                //progress
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                //error
            },
            () => {
                //complete
                this.state.storage
                    .ref(`${this.props.user.uid}-images`)
                    .child(uniqueKey)
                    .getDownloadURL()
                    .then(url => {
                        this.props.userUploadedImageToDisplay(url);
                    });
            }
        );
    };

    render() {
        return (
            <header>
                <div className="wrapper headerFlexContainer">
                    <button className="profileImage">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-five-97681.appspot.com/o/Z6fwRPBHhyVDwn8eFKzGX0eUQk13-favourite-images%2FJRr5JCPzDzVRYx1OPeUl?alt=media&token=72dacc8e-57dc-40f5-ba10-2249c4e15244"></img>
                    </button>

                    <div className="userInfo">
                        <h1>{this.props.user.displayName}</h1>

                        <p>{this.props.userImages.length} posts</p>

                        <label htmlFor='fileUpload'>UPLOAD</label>
                        <input type="file" id='fileUpload' onChange={this.uploadImage}></input>

                        <div className="progressBar">
                            <span style={{ width: `${this.state.progress}%` }}></span>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
