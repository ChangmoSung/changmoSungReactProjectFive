import React from 'react';

const UserVideos = props => {
    return (
        props.userVideos.map((video, i) => {
            return (
                <li key={i} className="galleryImage" tabIndex='0'>
                    <video
                        src={video}
                        alt="user uploaded item"
                        controls="controls"
                    ></video>

                    <span tabIndex='0' onKeyDown={props.deleteItem} onClick={props.deleteItem}>delete</span>
                </li>
            );
        })
    )
}

export default UserVideos;