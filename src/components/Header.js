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
            profileImageUploaded: false,
            galleryImageUploaded: false,
        };
    }

    uploadProfileImage = e => {
        this.setState({
            profileImageUploaded: true,
            profileImage: e.target.files[0],
        }, () => this.upload(this.state.profileImage))
    }

    uploadGalleryImage = e => {
        this.setState({
            galleryImageUploaded: true,
            galleryImage: e.target.files[0],
        }, () => this.upload(this.state.galleryImage))
    }

    upload = imageToUpload => {
        const uniqueId = this.state.database.collection("uniqueId").doc().id;

        let uploadTask;
        
        if(this.state.profileImageUploaded) {
            uploadTask = this.state.storage
                .ref(`${this.props.user.uid}-profileImage/profileImage`)
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
                if(this.state.profileImageUploaded) {
                    this.state.storage
                        .ref(`${this.props.user.uid}-profileImage`)
                        .child('profileImage')
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ 
                                profileImage: url,
                                profileImageUploaded: false,
                             })
                        });
                } else {
                    this.state.storage
                        .ref(`${this.props.user.uid}-galleryImages`)
                        .child(uniqueId)
                        .getDownloadURL()
                        .then(url => {
                            this.props.userUploadedImageToDisplay(url);
                            this.setState({ galleryImageUploaded: false })
                        });
                }
            }
        );
    };

    render() {
        return (
            <header>
                <div className="wrapper headerFlexContainer">
                    <div className="profileImage">
                        <img src={this.state.profileImage ? this.state.profileImage : this.props.profileImage} alt='profile'></img>

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
