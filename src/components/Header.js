import React, { Component } from "react";
import firebase from "./firebase";
import UserInfo from './userItems/UserInfo';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            storage: firebase.storage(),
            database: firebase.firestore(),
            auth: firebase.auth(),
            progress: 0,
            profileImage: null,
            galleryImage: null,
            galleryVideo: null,
            profileImageUploaded: false,
            galleryImageUploaded: false,
            galleryVideoUploaded: false,
            progressSpan: React.createRef(),
            uploadEmoji: React.createRef(),
        };
    }

    uploadProfileImage = e => {
        if (e.target.files[0].type.includes('video')) {
            alert('For profile, you can only upload image')
        } else {
            this.setState({
                profileImageUploaded: true,
                profileImage: e.target.files[0]
            }, () => this.upload(this.state.profileImage));
        }
    };

    uploadGallery = e => {
        if (e.target.files[0].type.includes("video")) {
            this.setState({
                galleryVideoUploaded: true,
                galleryVideo: e.target.files[0]
            }, () => this.upload(this.state.galleryVideo));
        } else {
            this.setState({
                galleryImageUploaded: true,
                galleryImage: e.target.files[0]
            }, () => this.upload(this.state.galleryImage));
        }
    };

    upload = imageToUpload => {
        const uniqueId = this.state.database.collection("uniqueId").doc().id;

        let uploadTask;

        uploadTask = this.state.storage
            .ref(this.state.profileImageUploaded
                        ? `${this.props.user.uid}/profileImage`
                        : this.state.galleryImageUploaded
                            ? `${this.props.user.uid}/${uniqueId}-galleryImage`
                            : `${this.props.user.uid}/${uniqueId}-galleryVideo`
            )
            .put(imageToUpload);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                this.setState({ progress });

                this.state.progressSpan.current.classList.add('progress')

                this.state.uploadEmoji.current.classList.add('emojiVisible')
            },
            error => {
                alert(error);
            },
            () => {
                this.state.storage
                    .ref(this.state.profileImageUploaded
                                ? `${this.props.user.uid}`
                                : this.state.galleryImageUploaded
                                    ? `${this.props.user.uid}`
                                    : `${this.props.user.uid}`
                    )
                    .child(this.state.profileImageUploaded
                                ? 'profileImage'
                                : this.state.galleryImageUploaded
                                    ? `${uniqueId}-galleryImage`
                                    : `${uniqueId}-galleryVideo`
                    )
                    .getDownloadURL()
                    .then(url => {
                        if (this.state.profileImageUploaded) {
                            this.setState({
                                profileImage: this.state.profileImageUploaded ? url : null,
                                profileImageUploaded: false,
                            });
                        } else {
                            this.props.userUploadedFile(url, this.state.galleryImageUploaded);
                            this.setState({
                                galleryImageUploaded: false,
                                galleryVideoUploaded: false,
                            });
                        }
                    });

                setTimeout(() => {
                    this.state.uploadEmoji.current.classList.remove('emojiVisible')

                    this.state.progressSpan.current.classList.remove('progress')
                    this.setState({ progress: 0 })
                }, 4000)
            }
        );
    };

    render() {
        return (
            <header>
                <div className="wrapper headerFlexContainer">
                    <div className="profileImage">
                        <input
                            id="profileImageUpload"
                            type="file"
                            onChange={this.uploadProfileImage}
                        ></input>

                        <label htmlFor="profileImageUpload" 
                        className='uploadImageText'>
                            {this.state.profileImage || this.props.profileImage
                            ?
                                <img
                                    src={this.state.profileImage
                                        ?
                                        this.state.profileImage
                                        :
                                        this.props.profileImage}
                                    alt='user profile'
                                />
                            :null}

                            {!this.state.profileImage && !this.props.profileImage
                            ? 
                                <span>click here for profile image!</span>
                            :null}
                        </label>
                    </div>

                    <UserInfo 
                        userEmail={this.props.user.email}
                        progressSpan={this.state.progressSpan}
                        progress={this.state.progress}
                        uploadGallery={this.uploadGallery}
                        uploadEmoji={this.state.uploadEmoji}
                        auth={this.state.auth}
                    />
                </div>
            </header>
        );
    }
}

export default Header;