import React, { Component } from "react";
import firebase from "./firebase";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            storage: firebase.storage(),
            database: firebase.firestore(),
            progress: 0,
            upload: false,
            profileImage: null,
            profileVideo: null,
            galleryImage: null,
            galleryVideo: null,
            profileImageUploaded: false,
            profileVideoUploaded: false,
            galleryImageUploaded: false,
            galleryVideoUploaded: false,
        };
    }

    uploadProfileImage = e => {
        if (e.target.files[0].type.includes('video')) {
            this.setState({
                profileVideoUploaded: true,
                profileVideo: e.target.files[0],
            }, () => this.upload(this.state.profileVideo))
        } else {
            this.setState({
                profileImageUploaded: true,
                profileImage: e.target.files[0],
            }, () => this.upload(this.state.profileImage))
        }
    }

    uploadGallery = e => {
        this.setState({
            upload: true,
        })
        if (e.target.files[0].type.includes('video')) {
            this.setState({
                galleryVideoUploaded: true,
                galleryVideo: e.target.files[0],
            }, () => this.upload(this.state.galleryVideo))
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
        
        uploadTask = this.state.storage
            .ref(this.state.upload 
                ? this.state.galleryImageUploaded
                    ? `${this.props.user.uid}-galleryImages/${uniqueId}`
                    : `${this.props.user.uid}-galleryVideos/${uniqueId}`

                : this.state.profileImageUploaded
                    ? `${this.props.user.uid}-profileImage/profileImage`
                    : `${this.props.user.uid}-profileVideo/profileVideo`
                )
            .put(imageToUpload)

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
                    .ref(this.state.upload
                        ? this.state.galleryImageUploaded
                            ? `${this.props.user.uid}-galleryImages`
                            : `${this.props.user.uid}-galleryVideos`
                        : this.state.profileImageUploaded
                            ? `${this.props.user.uid}-profileImage`
                            : `${this.props.user.uid}-profileVideo`
                        )
                    .child(this.state.upload
                        ? this.state.galleryImageUploaded
                            ? `${uniqueId}`
                            : `${uniqueId}`
                        : this.state.profileImageUploaded
                            ? 'profileImage'
                            : 'profileVideo'
                        )
                    .getDownloadURL()
                    .then(url => {
                        if(this.state.profileImageUploaded || this.state.profileVideoUploaded) {
                            this.setState({
                                profileImage: this.state.profileImageUploaded ? url : null,
                                profileImageUploaded: false,

                                profileVideo: this.state.profileVideoUploaded ? url : null,
                                profileVideoUploaded: false,
                            })
                        } else {
                            if(this.state.galleryImageUploaded) {
                                this.props.userUploadedImageToDisplay(url);
                                this.setState({ galleryImageUploaded: false })
                            } else {
                                this.props.userUploadedVideoToDisplay(url);
                                this.setState({ galleryVideoUploaded: false })
                            }
                        }
                    })
            }
        );
    };


    render() {
        return (
            <header>
                <div className="wrapper headerFlexContainer">
                    <div className="profileImage">
                        <img src={this.state.profileImage ? this.state.profileImage : this.props.profileImage} alt='profile'></img>

                        <video src={this.state.profileVideo ? this.state.profileVideo : this.props.profileVideo} alt='profile'></video>

                        

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