import React, { Component } from "react";
import firebase from "./firebase";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            storage: firebase.storage(),
            database: firebase.firestore(),
            progress: 0,
            profileImage: '',
            galleryImage: '',
        };
    }

    uploadProfileImage = e => {
        this.setState({
            profileImage: e.target.files[0],
        }, () => this.upload(this.state.profileImage))
    }

    uploadGalleryImage = e => {
        this.setState({
            galleryImage: e.target.files[0],
        }, () => this.upload(this.state.galleryImage))
    }

    upload = imageToUpload => {
        const uniqueId = this.state.database.collection("uniqueId").doc().id;

        let uploadTask;
        
        if(this.state.profileImage) {
            uploadTask = this.state.storage
                .ref(`${this.props.user.uid}-profileImage/${uniqueId}`)
                .put(imageToUpload);
        } else {
            uploadTask = this.state.storage
                .ref(`${this.props.user.uid}-galleryImages/${uniqueId}`)
                .put(imageToUpload);
        }

        uploadTask.on(
            "state_changed",
            snapshot => {
                //progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                
                this.setState({ progress });
            },
            error => {
                //error
                console.log(error)
            },
            () => {
                //complete
                this.state.storage
                    .ref(`${this.props.user.uid}-galleryImages`)
                    .child(uniqueId)
                    .getDownloadURL()
                    .then(url => {
                        this.props.userUploadedImageToDisplay(url);
                    });
            }
        );

        this.setState({
            profileImage: '',
            galleryImage: '',
        })
    };

    render() {
        return (
            <header>
                <div className="wrapper headerFlexContainer">
                    <div className="profileImage">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-five-97681.appspot.com/o/Z6fwRPBHhyVDwn8eFKzGX0eUQk13-favourite-images%2FJRr5JCPzDzVRYx1OPeUl?alt=media&token=72dacc8e-57dc-40f5-ba10-2249c4e15244" alt='profile'></img>

                        <label htmlFor='profileImageUpload'>profile</label>
                        <input id='profileImageUpload' type='file' onChange={this.uploadProfileImage}></input>
                    </div>

                    <div className="userInfo">
                        <h1>{this.props.user.email}</h1>

                        <p>{this.props.userImages.length} posts</p>

                        <label htmlFor='fileUpload'>UPLOAD</label>
                        <input id='fileUpload' type="file" onChange={this.uploadGalleryImage}></input>

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
