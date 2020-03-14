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
            galleryVideo: '',
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

    uploadGallery = e => {
        if (e.target.files[0].type.includes('video')) {
            this.setState({
                galleryVideo: e.target.files[0],
            }, () => this.uploadVideo(this.state.galleryVideo))
        } else {
            this.setState({
                galleryImageUploaded: true,
                galleryImage: e.target.files[0],
            }, () => this.upload(this.state.galleryImage))
        }
    }

    upload = imageToUpload => {
        const uniqueId = this.state.database.collection("uniqueId").doc().id;

        let uploadTask;
        
        uploadTask = this.state.storage.ref(this.state.profileImageUploaded ? `${this.props.user.uid}-profileImage/profileImage` : `${this.props.user.uid}-galleryImages/${uniqueId}`).put(imageToUpload)

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
                    .ref(this.state.profileImageUploaded ? `${this.props.user.uid}-profileImage` : `${this.props.user.uid}-galleryImages`)
                    .child(this.state.profileImageUploaded ? 'profileImage' : uniqueId)
                    .getDownloadURL()
                    .then(url => {
                        if(this.state.profileImageUploaded) {
                            this.setState({
                                profileImage: url,
                                profileImageUploaded: false,
                            })
                        } else {
                            this.props.userUploadedImageToDisplay(url);
                            this.setState({ galleryImageUploaded: false })
                        }
                    })
            }
        );
    };

    uploadVideo = videoToUpload => {
        console.log(videoToUpload)

    }

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
                        <input id='fileUpload' type="file" onChange={this.uploadGallery}></input>

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
