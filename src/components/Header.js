import React, { Component } from "react";
import firebase from "./firebase";
import { Link } from "react-router-dom";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            storage: firebase.storage(),
            database: firebase.firestore(),
            auth: firebase.auth(),
            progress: 0,
            upload: false,
            profileImage: null,
            galleryImage: null,
            galleryVideo: null,
            profileImageUploaded: false,
            galleryImageUploaded: false,
            galleryVideoUploaded: false
        };
    }

    uploadProfileImage = e => {
        if(e.target.files[0].type.includes('video')) {
            alert('For profile, you can only upload image')
        } else {
            this.setState({
                profileImageUploaded: true,
                profileImage: e.target.files[0]
            },() => this.upload(this.state.profileImage));
        }
    };

    uploadGallery = e => {
        this.setState({
            upload: true
        });
        if (e.target.files[0].type.includes("video")) {
        this.setState({
            galleryVideoUploaded: true,
            galleryVideo: e.target.files[0]
            },() => this.upload(this.state.galleryVideo));
        } else {
        this.setState({
            galleryImageUploaded: true,
            galleryImage: e.target.files[0]
            },() => this.upload(this.state.galleryImage));
        }
    };

    upload = imageToUpload => {
        const uniqueId = this.state.database.collection("uniqueId").doc().id;

        let uploadTask;

        uploadTask = this.state.storage
        .ref(
            this.state.upload
                ? this.state.galleryImageUploaded
                    ? `${this.props.user.uid}-galleryImages/${uniqueId}`
                    : `${this.props.user.uid}-galleryVideos/${uniqueId}`

                : `${this.props.user.uid}-profileImage/profileImage`
        )
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
                console.log(error);
            },
            () => {
                //complete
                this.state.storage
                .ref(
                    this.state.upload
                    ? this.state.galleryImageUploaded
                        ? `${this.props.user.uid}-galleryImages`
                        : `${this.props.user.uid}-galleryVideos`

                    : `${this.props.user.uid}-profileImage`
                )
                .child(
                    this.state.upload
                    ? this.state.galleryImageUploaded
                        ? `${uniqueId}`
                        : `${uniqueId}`
                    : 'profileImage'
                )
                .getDownloadURL()
                .then(url => {
                    if (this.state.profileImageUploaded) {
                    this.setState({
                        profileImage: this.state.profileImageUploaded ? url : null,
                        profileImageUploaded: false,
                    });
                    } else {
                        if (this.state.galleryImageUploaded) {
                            this.props.userUploadedImageToDisplay(url);
                            this.setState({ galleryImageUploaded: false });
                        } else {
                            this.props.userUploadedVideoToDisplay(url);
                            this.setState({ galleryVideoUploaded: false });
                        }
                    }
                });
            }
        );
    };

    signOut = () => {
        this.state.auth.signOut();

        this.state.auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) {
            } else {
                this.setState({
                    user: null,
                })
                window.location.reload(false)
            }
        })
    }

  render() {
    return (
        <header>
            <div className="wrapper headerFlexContainer">
                <div className="profileImage">
                    <label htmlFor="profileImageUpload">
                        <img
                            src={this.state.profileImage ? this.state.profileImage : this.props.profileImage}
                            alt="profile"
                        ></img>
                    </label>
                    <input
                        id="profileImageUpload"
                        type="file"
                        onChange={this.uploadProfileImage}
                    ></input> 
                </div>

                <div className="userInfo">
                    <h1>{this.props.user.email}</h1>

                    <div className="progressBar">
                        <span style={{ width: `${this.state.progress}%` }}></span>
                    </div>

                    <div className='uploadAndSignOutButtons'>
                        <p>{this.props.userImages.length} posts</p>

                        <label htmlFor="fileUpload"><span>upload</span></label>
                        <input
                            id="fileUpload"
                            type="file"
                            onChange={this.uploadGallery}
                        ></input>

                        <Link to='/changmoSungReactProjectFive/' onClick={this.signOut} className='signOut' ><span>sign out</span></Link>
                    </div>
                </div>
            </div>
        </header>
    );
  }
}

export default Header;
