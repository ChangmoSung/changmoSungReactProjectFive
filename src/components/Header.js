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
                this.state.progressSpan.current.classList.add('progress')
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

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

                this.state.uploadEmoji.current.classList.add('emojiVisible')

                setTimeout(() => {
                    this.state.progressSpan.current.classList.remove('progress')
                    this.setState({ progress: 0 })

                    this.state.uploadEmoji.current.classList.remove('emojiVisible')
                },4000)
            }
        );
    };

    signOut = () => {
        const confirm = window.confirm('Are you sure you want to sign out?');

        if(confirm) {
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
                        : 
                            <div>
                                <label htmlFor="profileImageUpload" className='uploadImageText'>
                                {this.state.profileImage 
                                    ? 
                                        <img
                                            src={this.state.profileImage}
                                            alt="profile"
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
                            <span>{this.props.userImages.length} posts</span>
                        </p>

                        <label htmlFor="fileUpload"><span>upload</span><span ref ={this.state.uploadEmoji}className='uploadEmoji'>😍</span></label>
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
