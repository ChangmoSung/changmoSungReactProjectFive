import React from 'react';

const UserImage = props => {
    const enlargeImage = e => {
        const image = e.target.parentNode;

        image.classList.toggle("enlarged");

        if (e.keyCode === 13) {
            const image = e.target;

            image.classList.toggle("enlarged");
        }
    };

    return (
        props.userImages.map((image, i) => {
            return (
                <li key={i} className="galleryImage" onClick={enlargeImage} onKeyDown={enlargeImage} tabIndex='0'>
                    <img
                        src={image}
                        alt="user uploaded item"
                    ></img>

                    <span tabIndex='0' onKeyDown={props.deleteItem} onClick={props.deleteItem}>delete</span>
                </li>
            );
        })
    )
}

export default UserImage;