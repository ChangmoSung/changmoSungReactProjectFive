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
                upload: true,
                profileImageUploaded: true,
                profileImage: e.target.files[0]
            }, () => this.upload(this.state.profileImage));
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
            .ref(
                this.state.upload
                    ? this.state.profileImageUploaded
                        ? `${this.props.user.uid}/profileImage`
                        : this.state.galleryImageUploaded
                            ? `${this.props.user.uid}/${uniqueId}-galleryImage`
                            : `${this.props.user.uid}/${uniqueId}-galleryVideo`
                    : null
            )
            .put(imageToUpload);

        uploadTask.on(
            "state_changed",
            snapshot => {
                //progress
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                this.setState({ progress });

                this.state.progressSpan.current.classList.add('progress')

                this.state.uploadEmoji.current.classList.add('emojiVisible')
            },
            error => {
                //error
                alert(error);
            },
            () => {
                //complete
                this.state.storage
                    .ref(
                        this.state.upload
                            ? this.state.profileImageUploaded
                                ? `${this.props.user.uid}`
                                : this.state.galleryImageUploaded
                                    ? `${this.props.user.uid}`
                                    : `${this.props.user.uid}`
                            : null
                    )
                    .child(
                        this.state.upload
                            ? this.state.profileImageUploaded
                                ? 'profileImage'
                                : this.state.galleryImageUploaded
                                    ? `${uniqueId}-galleryImage`
                                    : `${uniqueId}-galleryVideo`
                            : null
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

    signOut = () => {
        const confirm = window.confirm('Are you sure you want to sign out?');

        if (confirm) {
            this.state.auth.signOut();

            this.state.auth.onAuthStateChanged(user => {
                console.log(user)
                if (user) {
                } else {
                    this.setState({
                        user: null,
                    })
                    window.location.reload()
                }
            })
        }
    }


    render() {
        return (
            <header>
                <div className="wrapper headerFlexContainer">
                    <div className="profileImage">
                        {this.props.profileImage
                            ?
                            <div>
                                <input
                                    id="profileImageUpload"
                                    type="file"
                                    onChange={this.uploadProfileImage}
                                ></input>

                                <label htmlFor="profileImageUpload">
                                    <img
                                        src={this.state.profileImage ? this.state.profileImage : this.props.profileImage}
                                        alt="user profile"
                                    ></img>
                                </label>
                            </div>
                            :
                            <div>
                                <label htmlFor="profileImageUpload" className='uploadImageText'>
                                    {this.state.profileImage
                                        ?
                                        <img
                                            src={this.state.profileImage}
                                            alt="user profile"
                                        ></img>
                                        :
                                        <span>
                                            click here for profile image!
                                        </span>
                                    }
                                </label>
                                <input
                                    id="profileImageUpload"
                                    type="file"
                                    onChange={this.uploadProfileImage}
                                ></input>
                            </div>
                        }
                    </div>

                    <div className="userInfo">
                        <h1>{this.props.user.email}</h1>

                        <div className="progressBar">
                            <span ref={this.state.progressSpan} style={{ width: `${this.state.progress}%` }}></span>
                        </div>

                        <div className='uploadAndSignOutButtons'>
                            <p>
                                <span>
                                    {this.props.videoIconClicked
                                        ? this.props.userVideos.length > 1
                                            ? `${this.props.userVideos.length} videos`
                                            : `${this.props.userVideos.length} video`

                                    : this.props.journalIconClicked
                                        ? this.props.journals.length !== undefined
                                            ? this.props.journals.length > 1
                                                ? `${this.props.journals.length} journals`
                                                : `${this.props.journals.length} journal`
                                        : null

                                    : this.props.userImages.length > 1
                                        ? `${this.props.userImages.length} images`
                                        : `${this.props.userImages.length} image`
                                    }
                                </span>
                            </p>

                            <input
                                id="fileUpload"
                                type="file"
                                onChange={this.uploadGallery}
                            ></input>

                            <label htmlFor="fileUpload">
                                <span>upload</span>

                                <span role='img' aria-label='heart emoji' ref={this.state.uploadEmoji} className='uploadEmoji'>😍</span>
                            </label>


                            <Link to='/changmoSungReactProjectFive/' className='signOutLink' onClick={this.signOut}>
                                <span className='signOut' tabIndex='0'>sign out</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;